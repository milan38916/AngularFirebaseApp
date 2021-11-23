import { Injectable } from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import 'firebase/auth';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  isLoggin: Subject<boolean> = new Subject<boolean>();
  logginStatus: boolean;
  email: Subject<string> = new Subject<string>();
  name: Subject<string> = new Subject<string>();
  role: Subject<string> = new Subject<string>();
  constructor(private auth: AngularFireAuth, private route: Router) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoggin.next(true);
        this.email.next(user.email);
        this.name.next(user.displayName);
        this.role.next(user.displayName);
        console.log('start loggin');
        this.logginStatus = true;
      } else {
        localStorage.setItem('user', null);
        this.isLoggin.next(false);
        console.log('start loggout');
        this.logginStatus = false;
      }
    });
  }

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password).then(value => {
      console.log('Prihlaseny: ', value);
      this.isLoggin.next(true);
      this.logginStatus = true;
      this.email.next(email);
      this.route.navigate(['/enter']);
    }).catch(error => {
      console.log('Nastala chyba: ', error);
      this.isLoggin.next(false);
      this.logginStatus = false;
    });
  }

  async register(email: string, password: string) {
    await  this.auth.createUserWithEmailAndPassword(email, password).then(value => {
      console.log('Uspesne zaregistrovany: ', value);
    }).catch(error => {
      console.log('Nastala chyba: ', error);
    });
  }

  async logout() {
    await this.auth.signOut().then(value => {
      console.log('odhlasujem:', value);
      this.isLoggin.next(false);
      this.logginStatus = false;
      this.route.navigate(['enter']);
    }).catch(error => {
      console.log('neodhlasujem:', error);
      this.isLoggin.next(true);
      this.logginStatus = true;
    });
    localStorage.removeItem('user');
  }
}

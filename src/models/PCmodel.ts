export class PCmodel {
  // Basic data
  id: number;
  category: string;
  brand: string;
  model: string;
  about: string;
  price: string;
  // Parameters
  use: string;
  os: string;
  // Components
  // Procesor
  rad: string;
  modelProc: string;
  frekvencia: string;
  pocetJadier: number;
  cache: string;
  boost: number;
  TDP: string;
  // Graphis Card
  modelGraphis: string;
  streamProc: number;
  memory: number;
  // Motherbard
  modelOfBoard: string;
  socket: string;
  // Disk
  brandofdisk: string;
  diskSize: string;
  diskType: string;
  // Size of PC
  sizeOfPC: string;
  // Weight of PC
  weight: string;
  // Images
  images: Array<string>;
}

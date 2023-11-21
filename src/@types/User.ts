// interfaces.ts
export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    person: Person[];
  }
  
  export interface Person {
    id: string;
    name: string;
    phone: string;
    cpfCnpj: string;
    sex: string;
    birthDate: Date;
    uf: string;
    city: string;
    cep: string;
    timeInMarket: string;
    collector: Collector[];
    userId: string;
    user: User;
  }
  
  export interface Collector {
    id: string;
    collectionServiceDescription: string;
    kgCollected: number;
    marketTime: string;
    organization: string;
    cpfCnpj: string;
    isoCertification: boolean;
    purchases: string;
    biography: string;
    personId: string;
    person: Person;
  }
  
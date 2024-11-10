export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ClientType = {
  id: number | null;
  nit: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  active: boolean;
  opportunities?: Opportunity[];
  contacts: ContactType[]; 
};

  export type Opportunity = { 
    id: number;
    name: string;
  }
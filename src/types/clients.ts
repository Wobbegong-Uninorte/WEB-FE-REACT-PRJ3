import { Opportunities } from "./opportunities";

export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ClientType = {
  id: number;
  nit: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  active: boolean;
  opportunities?: Opportunities[];
  contacts: ContactType[];
};

export type Opportunity = {
  id: number;
  name: string;
};
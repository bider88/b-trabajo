import { Address } from './Adress';

export interface Bio {
  titleProfessional: string;
  professionalObjective: string;
  birthday?: Date;
  gender?: string;
  phone?: string;
  address?: Address;
  skills?: Array<string>;
  webSite?: string;
  twitter?: string;
  facebook?: string;
}

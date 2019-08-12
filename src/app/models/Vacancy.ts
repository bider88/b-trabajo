import { User } from '../components/commons/signup/User';
import { Salary } from './Salary';

export interface Vacancy {

  title: string;
  enterprise: string;
  city: string;
  salary: Array<Salary>;
  salaryPeriod: string;
  description: string;
  experience: string[];
  email: string;
  phone?: string;
  expire?: Date;
  status?: { open: boolean, description?: string, another?: string };
  user?: User;
  postulate?: any[];
  views?: number;
  _id?: string;
  createdAt?: Date;
}

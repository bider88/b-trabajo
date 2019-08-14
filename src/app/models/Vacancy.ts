
import { Salary } from './Salary';
import { UserClass } from './user.class';

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
  user?: UserClass;
  postulate?: any[];
  views?: number;
  _id?: string;
  createdAt?: Date;
}

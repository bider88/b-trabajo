export class UserClass {
  constructor(
    public firstName: string,
    public lastName: string,
    public createdAt: Date,
    public email?: string,
    public password?: string,
    public img?: string,
    public role?: string,
    // tslint:disable-next-line:variable-name
    public _id?: string
  ) {}
}

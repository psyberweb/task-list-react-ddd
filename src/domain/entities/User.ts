import { UserId } from '../value-objects/UserId';

export class User {
  constructor(
    private readonly _id: UserId,
    private _name: string,
    private _username: string,
    private _email: string,
    private _password: string,
    private _phone: string,
    private _roles: number[]
  ) {}

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }

  get password() {
    return this._password;
  }

  get roles() {
    return this._roles;
  }

  updateName(name: string): void {
    this._name = name;
  }

  updatePhone(phone: string): void {
    this._phone = phone;
  }

  updatePassword(password: string): void {
    this._password = password;
  }

  addRole(role: number): void {
    this._roles.push(role);
  }

  removeRole(role: number): void {
    this._roles = this._roles.filter((r) => r !== role);
  }
}

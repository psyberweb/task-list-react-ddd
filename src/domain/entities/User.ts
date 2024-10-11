import { UserId } from '../value-objects/UserId';

export class User {
  constructor(
    public readonly id: UserId,
    public name: string,
    public email: string,
    public password: string,
    public phone: string
  ) {}

  // Método para atualizar o nome do usuário
  updateName(name: string): void {
    this.name = name;
  }

  // Método para atualizar o telefone
  updatePhone(phone: string): void {
    this.phone = phone;
  }

  // Método para atualizar a senha
  updatePassword(password: string): void {
    this.password = password;
  }
}

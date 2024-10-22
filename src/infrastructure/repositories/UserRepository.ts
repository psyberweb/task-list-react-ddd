import api from '../api/api';
import { IUserRepository } from '../../domain/irepositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';

export class UserRepository implements IUserRepository {
  private readonly apiUrl = '/users'; // Base para a rota de usuários

  async getAllUsers(): Promise<User[]> {
    const response = await api.get(this.apiUrl);
    return response.data.map(
      (userData: any) =>
        new User(
          new UserId(userData.id),
          userData.name,
          userData.username,
          userData.email,
          userData.password,
          userData.phone,
          userData.roles
        )
    );
  }

  async createUser(user: User): Promise<void> {
    await api.post(this.apiUrl, {
      id: user.id.value,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      roles: user.roles
    });
  }

  async updateUser(user: User): Promise<void> {
    await api.put(`${this.apiUrl}/${user.id.value}`, {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      roles: user.roles
    });
  }

  async deleteUser(id: UserId): Promise<void> {
    await api.delete(`${this.apiUrl}/${id.value}`);
  }
}

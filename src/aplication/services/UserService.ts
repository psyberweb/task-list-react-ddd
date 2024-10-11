import { IUserRepository } from '../../domain/irepositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { UserId } from '../../domain/value-objects/UserId';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async createUser(name: string, email: string, password: string, phone: string): Promise<void> {
    const user = new User(new UserId(''), name, email, password, phone);
    return this.userRepository.createUser(user);
  }

  async updateUser(user: User): Promise<void> {
    return this.userRepository.updateUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    const userId = new UserId(id);
    return this.userRepository.deleteUser(userId);
  }
}

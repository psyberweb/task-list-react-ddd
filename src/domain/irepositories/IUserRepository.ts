import { User } from '../entities/User';
import { UserId } from '../value-objects/UserId';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
  deleteUser(id: UserId): Promise<void>;
}

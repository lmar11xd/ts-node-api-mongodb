import { Document } from "mongoose";
import { Query, Repository } from './RepositoryTypes';
import { Role } from './RolesTypes';

export interface User extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  roles?: Role[];
  permissions?: string[];
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserRepository extends Repository<User> {
  findOne(query: Query): Promise<User | null>;
}

export interface IUserService {
  createUser(user: User): Promise<User>;
  findUsers(query?: Query): Promise<User[]>;
  findUserById(id: string): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  updateUser(id: string, user: Partial<User>): Promise<User | null>
  deleteUser(id: string): Promise<boolean>
}
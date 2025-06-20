import { Document } from 'mongoose';
import { Query, Repository } from './RepositoryTypes';

export interface Role extends Document{
  name: string;
  permissions: string[];
}

export interface IRoleRepository extends Repository<Role> { }

export interface IRoleService {
  createRole(role: Role): Promise<Role>;
  findRoles(query?: Query): Promise<Role[]>;
  findRolById(id: string): Promise<Role | null>
  updateRole(id: string, rol: Partial<Role>): Promise<Role | null>
  deleteRole(id: string): Promise<boolean>
}
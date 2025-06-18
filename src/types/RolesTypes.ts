import { Repository } from './RepositoryTypes';

export interface Rol {
  name: string;
}

export interface IRolRepository extends Repository<Rol> { }

export interface IRolService {
  createRol(rol: Rol): Promise<Rol>;
  findRoles(): Promise<Rol[]>;
  findRolById(id: string): Promise<Rol | null>
  updateRol(id: string, rol: Partial<Rol>): Promise<Rol | null>
  deleteRol(id: string): Promise<boolean>
}
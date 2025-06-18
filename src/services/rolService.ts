import { IRolRepository, IRolService, Rol } from 'types/RolesTypes';

export class RolService implements IRolService {

  private rolRepository: IRolRepository;

  constructor(rolRepository: IRolRepository) {
    this.rolRepository = rolRepository;
  }

  async createRol(rol: Rol): Promise<Rol> {
    return this.rolRepository.create(rol);
  }

  async findRoles(): Promise<Rol[]> {
    return this.rolRepository.find();
  }
  
  async findRolById(id: string): Promise<Rol | null> {
    return this.rolRepository.findById(id);
  }

  async updateRol(id: string, rol: Partial<Rol>): Promise<Rol | null> {
    return this.rolRepository.update(id, rol);
  }

  async deleteRol(id: string): Promise<boolean> {
    return this.rolRepository.delete(id);
  }
}
import { RolModel } from '@models/Roles';
import { IRolRepository, Rol } from 'types/RolesTypes';

export class RolRepository implements IRolRepository {

  async create(data: Rol): Promise<Rol> {
    const newRol = new RolModel(data);
    return await newRol.save();
  }

  async find(): Promise<Rol[]> {
    return await RolModel.find().exec();
  }

  async findById(id: string): Promise<Rol | null> {
    return await RolModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Rol>): Promise<Rol | null> {
    console.log(id);
    return await RolModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await RolModel.findByIdAndDelete(id).exec();
    return deleted != null;
  }
}
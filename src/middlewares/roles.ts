import { NextFunction, Request, Response } from 'express';
import { RoleRepository } from '@repositories/roleRepository';
import { RoleService } from '@services/roleService';
import { IRoleRepository, IRoleService } from 'types/RolesTypes';

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository);

export const checkRoles = async (req: Request, res: Response, next: NextFunction) => {
  const roles: string[] = req.body && req.body?.roles ? req.body.roles : [];
  const role = Array.isArray(roles) && roles.length > 0 ? roles : ['user'];

  try {
    const foundRoles = await roleService.findRoles({ name: { $in: role } });
    
    if (foundRoles.length == 0) res.status(404).send('Role not found');

    req.body.roles = foundRoles.map(x => x._id);

    next();
  } catch (error) {
    console.log('Error :>> ', error);
    res.status(500).json(error);
  }
}
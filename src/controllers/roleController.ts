import { Request, Response } from "express";
import { RoleRepository } from '@repositories/roleRepository';
import { RoleService } from '@services/roleService';
import { IRoleRepository, IRoleService, Role } from 'types/RolesTypes';

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository);

export const findRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.findRoles();
    if (roles.length === 0) {
      res.status(404).json({ message: "no roles Found." });
      return;
    }

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findRolById = async (req: Request, res: Response) => {
  try {
    const rol = await roleService.findRolById(req.params.id);
    if (!rol) {
      res.status(404).json({ message: "Not role Found" });
      return;
    }

    res.json(rol);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createRol = async (req: Request, res: Response) => {
  try {
    const newrole: Role = req.body;
    const result = await roleService.createRole(newrole);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateRol = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.updateRole(req.params.id, req.body);
    if (!roles) {
      res.status(404).json({ message: "Not role Found" });
      return;
    }

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteRol = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.deleteRole(req.params.id);
    if (!roles) {
      res.status(404).json({ message: "Not role Found" });
      return;
    }

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
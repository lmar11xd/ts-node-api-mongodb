import { Request, Response } from "express";
import { RolRepository } from '@repositories/rolRepository';
import { RolService } from '@services/rolService';
import { IRolRepository, IRolService, Rol } from 'types/RolesTypes';

const rolRepository: IRolRepository = new RolRepository();
const rolService: IRolService = new RolService(rolRepository);

export const findRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolService.findRoles();
    if (roles.length === 0) res.status(404).json({ message: "no roles Found." });

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findRolById = async (req: Request, res: Response) => {
  try {
    const rol = await rolService.findRolById(req.params.id);
    if (!rol) res.status(404).json({ message: "Not role Found" });

    res.json(rol);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createRol = async (req: Request, res: Response) => {
  try {
    const newrole: Rol = req.body;
    const result = await rolService.createRol(newrole);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateRol = async (req: Request, res: Response) => {
  try {
    const roles = await rolService.updateRol(req.params.id, req.body);
    if (!roles) res.status(404).json({ message: "Not role Found" });

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteRol = async (req: Request, res: Response) => {
  try {
    const roles = await rolService.deleteRol(req.params.id);
    if (!roles) res.status(404).json({ message: "Not user Found" });

    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
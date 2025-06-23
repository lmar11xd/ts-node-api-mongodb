import { UserRepository } from '@repositories/userRepository';
import { UserService } from '@services/userService';
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { IUserRepository, IUserService, User } from 'types/UsersTypes';
import { permissions, Method } from '../types/PermissionsTypes';

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers.authorization?.replace(/^Bearer\s+/, "") as string;

  try {
    const userVerified = jwt.verify(token, jwtSecret) as User;

    const user = await userService.findUserById(userVerified.id);
    
    if (!user) {
      res.status(400);
      return;
    }
    
    req.currentUser = user;
    next();
  } catch (error: any) {
    console.log('Error :>> ', error);
    res.status(401).send(error.message);
  }
}

export const getPermissions = async (req: Request, res: Response, next: NextFunction) => {
  const { currentUser, method, path } = req;
  const { roles } = currentUser;

  const currentModule = path.replace(/^\/([^\/]+).*/, "$1");
  console.log("currentModule :>> ", currentModule);
  
  const findMethod = permissions.find(x => x.method === Method[method as keyof typeof Method]);

  const permission = `${currentModule}_${findMethod?.scope}`;

  if (!findMethod?.permissions.includes(permission)) {
    findMethod?.permissions.push(permission);
  }

  console.log("findMethod :>> ", findMethod);
  
  /*const rolesPermissions = roles?.map(role => role.permissions);
  const flatPermissions = rolesPermissions?.flat();
  const mergedPermissions = [new Set(flatPermissions)];*/
  const mergedPermissions = [... new Set(roles?.flatMap(x => x.permissions))];
  console.log("rolesPermissions :>> ", mergedPermissions);

  let userPermissions: string[] = [];
  if (currentUser.permissions?.length !== 0) {
    userPermissions = currentUser.permissions!;
  } else {
    userPermissions = mergedPermissions;
  }

  const permissionsGranted = findMethod?.permissions.find(x => userPermissions.includes(x));
  console.log("permissionsGranted :>> ", permissionsGranted);

  if (!permissionsGranted) {
    res.status(401).send("Unauthorized!!!")
    return;
  }

  next();
}
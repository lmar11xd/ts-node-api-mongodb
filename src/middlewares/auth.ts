import { UserRepository } from '@repositories/userRepository';
import { UserService } from '@services/userService';
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import { IUserRepository, IUserService, User } from 'types/UsersTypes';

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
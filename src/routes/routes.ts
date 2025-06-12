import { UserService } from '@services/userService';
import { Router } from 'express';
import { UserRepository } from 'respositories/userRepository';
import { IUserRepository, IUserService, User } from 'types/UsersTypes';

const router = Router();

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export default () => {
  router.get('/healthy', (req, res) => {
    res.send('API is Healthy!')
  });

  // Get
  router.get('/users', async (req, res) => {
    const users = await userService.findUsers();
    res.json(users);
  });

  router.get('/users/:id', async (req, res) => {
    const user = await userService.findUserById(req.params.id);
    res.json(user);
  });

  // Create
  router.post('/users', async (req, res) => {
    const newUser: User = req.body;
    const result = await userService.createUser(newUser);
    res.json(result);
  });

  router.put('/users/:id', async (req, res) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.json(result);
  });

  router.delete('/users/:id', async (req, res) => {
    const result = await userService.deleteUser(req.params.id);
    res.json(result);
  });

  return router;
}
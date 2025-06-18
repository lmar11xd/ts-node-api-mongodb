import { Router } from 'express';
import { createUser, deleteUser, findUsers, findUserById, updateUser } from "@controllers/userController";
import { createRol, deleteRol, findRolById, findRoles, updateRol } from '@controllers/roleController';

const router = Router();

export default () => {
  router.get('/healthy', (req, res) => {
    res.send('API is Healthy!')
  });

  // Users Routes
  router.get('/users', findUsers);
  router.get('/users/:id', findUserById);
  router.post('/users', createUser);
  router.put('/users/:id', updateUser);
  router.delete('/users/:id', deleteUser);

  // Roles Routes
  router.get('/roles', findRoles);
  router.get('/roles/:id', findRolById);
  router.post('/roles', createRol);
  router.put('/roles/:id', updateRol);
  router.delete('/roles/:id', deleteRol);

  return router;
}
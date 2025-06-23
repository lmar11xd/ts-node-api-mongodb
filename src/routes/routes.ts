import { Router } from 'express';
import { createUser, deleteUser, findUsers, findUserById, updateUser } from "@controllers/userController";
import { createRol, deleteRol, findRolById, findRoles, updateRol } from '@controllers/roleController';
import { loginUser, registerUser } from '@controllers/auth/authController';
import { createPost, deletePost, findPostById, findPosts, updatePost } from '@controllers/postController';
import { getPermissions, verifyToken } from '@middlewares/auth';
import { checkRoles } from '@middlewares/roles';

const router = Router();

export default () => {
  router.get('/healthy', (req, res) => {
    res.send('API is Healthy!')
  });

  // Auth Routes
  router.post('/auth/register', checkRoles, registerUser);
  router.post('/auth/login', loginUser);

  // Users Routes
  router.get('/users', verifyToken, getPermissions, findUsers);
  router.get('/users/:id', verifyToken, getPermissions, findUserById);
  router.post('/users', verifyToken, getPermissions, checkRoles, createUser);
  router.put('/users/:id', verifyToken, getPermissions, updateUser);
  router.delete('/users/:id', verifyToken, getPermissions, deleteUser);

  // Roles Routes
  router.get('/roles', verifyToken, getPermissions, findRoles);
  router.get('/roles/:id', verifyToken, getPermissions, findRolById);
  router.post('/roles', verifyToken, getPermissions, createRol);
  router.put('/roles/:id', verifyToken, getPermissions, updateRol);
  router.delete('/roles/:id', verifyToken, getPermissions, deleteRol);

  // Posts Routes
  router.get('/posts', findPosts);
  router.get('/posts/:id', findPostById);
  router.post('/posts', verifyToken, getPermissions, createPost);
  router.put('/posts/:id', verifyToken, getPermissions, updatePost);
  router.delete('/posts/:id', verifyToken, getPermissions, deletePost);

  return router;
}
import { Router } from 'express';
import { createUser, deleteUser, findUsers, findUserById, updateUser } from "@controllers/userController";
import { createRol, deleteRol, findRolById, findRoles, updateRol } from '@controllers/roleController';
import { loginUser, registerUser } from '@controllers/auth/authController';
import { createPost, deletePost, findPostById, findPosts, updatePost } from '@controllers/postController';
import { verifyToken } from 'middlewares/auth';
import { checkRoles } from 'middlewares/roles';

const router = Router();

export default () => {
  router.get('/healthy', (req, res) => {
    res.send('API is Healthy!')
  });

  // Auth Routes
  router.post('/auth/register', checkRoles, registerUser);
  router.post('/auth/login', loginUser);

  // Users Routes
  router.get('/users', verifyToken, findUsers);
  router.get('/users/:id', verifyToken, findUserById);
  router.post('/users', verifyToken, checkRoles, createUser);
  router.put('/users/:id', verifyToken, updateUser);
  router.delete('/users/:id', verifyToken, deleteUser);

  // Roles Routes
  router.get('/roles', verifyToken, findRoles);
  router.get('/roles/:id', verifyToken, findRolById);
  router.post('/roles', verifyToken, createRol);
  router.put('/roles/:id', verifyToken, updateRol);
  router.delete('/roles/:id', verifyToken, deleteRol);

  // Roles Routes
  router.get('/posts', findPosts);
  router.get('/posts/:id', findPostById);
  router.post('/posts', verifyToken, createPost);
  router.put('/posts/:id', verifyToken, updatePost);
  router.delete('/posts/:id', verifyToken, deletePost);

  return router;
}
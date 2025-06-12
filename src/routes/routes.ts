import { Router } from 'express';

const router = Router();

export default () => {
  router.get('/healthy', (req, res) => {
    res.send('API is Healthy!')
  });

  return router;
}
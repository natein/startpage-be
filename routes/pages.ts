import { v4 as uuid } from 'uuid';
import { Router } from 'express';
import * as storage from '../storage/postgre';
import { authMw } from '../middleware/authMw';

const router = Router();

router.get('/', authMw, async (req, res) => {
  const list = await storage.getAllPages(req.app.get('userId'));

  res.json(list);
});

router.get('/:id', authMw, async (req, res) => {
  const item = await storage.getPageById(
    req.app.get('userId'),
    req.params['id'],
  );

  res
    .status(item ? 200 : 404)
    .json(item ?? {
      statusCode: 404,
    });
});

router.post('/', authMw, async (req, res) => {
  const id = uuid();

  const { body } = req;

  body.id = id;

  const newBody = await storage.createPage(req.app.get('userId'), body);

  res.json(newBody);
});

router.put('/:id', authMw, async (req, res) => {
  const { body } = req;

  const newBody = await storage.updatePage(
    req.app.get('userId'),
    {
      ...body,
      id: req.params.id,
    },
  );

  res.json(newBody);
});

router.delete('/:id', authMw, async (req, res) => {
  await storage.removePage(
    req.app.get('userId'),
    req.params['id'],
  );

  res
    .status(204)
    .json(null);
});

export default router;

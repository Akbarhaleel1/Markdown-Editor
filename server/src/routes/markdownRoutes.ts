import { Router } from 'express';
import MarkdownController from '../controllers/markdownController';

const router = Router();

router.post('/convert', MarkdownController.convertMarkdown);

export default router;

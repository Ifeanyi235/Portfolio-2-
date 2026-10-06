import { Router } from 'express';
import { countFolders, getFolder, getFolders, getImage, getVideo } from '../controllers/driveController.js';

const router = Router();
const asyncHandler = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
router.get('/count', asyncHandler(countFolders));
router.get('/', asyncHandler(getFolders));
router.get('/:folderId', asyncHandler(getFolder));
router.get('/:folderId/image', asyncHandler(getImage));
router.get('/:folderId/video', asyncHandler(getVideo));
export default router;

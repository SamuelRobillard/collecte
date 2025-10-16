import { Router } from 'express';

import { SerieControllerV2 } from '../../controllers/v2/SerieControllerV2';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';


const router = Router();
const serieControllerV2 = new SerieControllerV2()

router.get('/serie', serieControllerV2.getAllSerie);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/serie', authMiddleware, adminMiddleware, serieControllerV2.createSerie)



export default router;
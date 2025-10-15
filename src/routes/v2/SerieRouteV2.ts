import { Router } from 'express';

import { SerieControllerV2 } from '../../controllers/v2/SerieControllerV2';


const router = Router();
const serieControllerV2 = new SerieControllerV2()

router.get('/serie', serieControllerV2.getAllSerie);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/serie',  serieControllerV2.createSerie)



export default router;
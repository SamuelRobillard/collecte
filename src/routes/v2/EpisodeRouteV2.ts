import { Router } from 'express';

import { EpisodeControllerV2 } from '../../controllers/v2/EpisodeControllerV2';
import { authMiddleware } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';



const router = Router();
const episodeControllerV2 = new EpisodeControllerV2()

router.get('/episode', episodeControllerV2.getAllEpisode);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/episode', authMiddleware, adminMiddleware,  episodeControllerV2.createEpisode)



export default router;
import { Router } from 'express';
import { SeasonControllerV2 } from '../../controllers/v2/SeasonControllerV2';



const router = Router();
const seasonControllerV2 = new SeasonControllerV2()

router.get('/season', seasonControllerV2.getAllSeason);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/season',  seasonControllerV2.createSeason)



export default router;
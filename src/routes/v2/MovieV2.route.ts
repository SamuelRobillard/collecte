import { Router } from 'express';
import { UserControllerV2 } from '../../controllers/v2/user.controller.V2';
import { MovieControllerV2 } from '../../controllers/v2/MovieControllerV2';


const router = Router();
const movieControllerV2 = new MovieControllerV2()

router.get('/Movie', movieControllerV2.getAllMovie);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/Movie',  movieControllerV2.createMovie)



export default router;
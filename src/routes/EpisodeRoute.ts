import { Router } from 'express';
import  { Request, Response } from 'express';
import Episode from '../models/Episode';
import EpisodeController from '../controllers/EpisodeController';
import { EpisodeService } from '../services/EpisodeService';
const router = Router();

router.get('/episodes', EpisodeController.getAllEpisode)

router.post('/episodes', async (req: Request, res: Response) => {

    const title = req.body.title
    const duration = req.body.duration
    const episodeNumber = req.body.episodeNumber
    const watched = req.body.watched

    const id = (EpisodeService.getMaxId() + 1).toString()


    const episode = new Episode(id, title, duration, episodeNumber, watched);
    EpisodeController.createEpisode(episode)
    res.status(201).send('episode enregistré');




});

router.delete('/episode/:id', async (req, res) => {

    if (await EpisodeController.deleteEpisode(req.params.id)) {
        res.status(201).send("Episode deleted")
    }
    else {
        res.status(403).send('id non valide');
    }



});

router.put('/episodes/:id', async (req: Request, res: Response) => {





    const id = req.params.id
    if (typeof (id) == "string") {


        EpisodeService.updateEpiosde(id, req.body)
        res.status(201).send('Episode  modifier');
    }





    else {
        res.status(400).send('id non valide');
    }

});



export default router;
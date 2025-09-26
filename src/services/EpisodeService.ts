import { readData, writeData } from "../utils/jsonHandler";

export default class EpisodeService {
  static getAll() {
    const data = readData();
    return data.episodes;
  }

  static add(episode: any) {
    const data = readData();
    data.episodes.push(episode);
    writeData(data);
  }

  
}

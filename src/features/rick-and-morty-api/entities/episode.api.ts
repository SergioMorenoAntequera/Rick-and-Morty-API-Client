import Episode from "@/features/rick-and-morty-api/entities/episodes.type"
import constructClientConsumer from "../client.api"
import { extractId } from "../utils/url-data-collection"
import CHARACTER_ENTITY from "./character.api"

const EPISODE_ENTITY = {
  ...constructClientConsumer<Episode>('episode'),
  getCharacters: (charactersUrl: string[]) => CHARACTER_ENTITY.getManyById(charactersUrl.map(extractId)),
  getEverything: (charaterId: number) => EPISODE_ENTITY.getById(charaterId)
    .then(episode => Promise.all([
      new Promise<Episode>(resolve => resolve(episode)),
      EPISODE_ENTITY.getCharacters(episode.characters)
    ]))
}

export default EPISODE_ENTITY
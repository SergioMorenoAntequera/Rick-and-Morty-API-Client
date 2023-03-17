import Episode from "@/types/Episodes"
import characterAPI from "./character.api"
import constructClientConsumer from "./client.api"
import { extractId } from "./utils"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'episode'

const episodeAPI = {
    generic: constructClientConsumer<Episode>(entityName),
    specific: {
        getCharacters: (charactersUrl: string[]) => characterAPI.generic.getManyById(charactersUrl.map(extractId)),
        getEverything: (charaterId: number) => {
            return episodeAPI.generic.getById(charaterId)
            .then(episode => Promise.all([
                new Promise<Episode>(resolve => resolve(episode)),
                episodeAPI.specific.getCharacters(episode.characters)
            ]))
        }
    }
}

export default episodeAPI
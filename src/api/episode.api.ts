import Episode from "@/types/Episodes"
import characterAPI from "./character.api"
import constructClientConsumer from "./client.api"
import { extractId } from "./utils"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'episode'

const episodeAPI = {
    ...constructClientConsumer<Episode>(entityName),
    getCharacters: (charactersUrl: string[]) => characterAPI.getManyById(charactersUrl.map(extractId)),
    getEverything: (charaterId: number) => {
        return episodeAPI.getById(charaterId)
        .then(episode => Promise.all([
            new Promise<Episode>(resolve => resolve(episode)),
            episodeAPI.getCharacters(episode.characters)
        ]))
    }
}

export default episodeAPI
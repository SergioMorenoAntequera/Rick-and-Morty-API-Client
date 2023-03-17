import Character from "@/types/Character"
import constructClientConsumer from "./client.api"
import episodeAPI from "./episode.api"
import locationAPI from "./location.api"
import { extractId } from "./utils"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'character'

const characterAPI = {
    generic: constructClientConsumer<Character>(entityName),
    specific: {
        getEpisodes: (episodesUrls: string[]) => episodeAPI.generic.getManyById(episodesUrls.map(extractId)),
        getLocation: (locationUrl: string) => locationUrl ? locationAPI.generic.getById(extractId(locationUrl)) : null,
        getOrigin: (originUrl: string) => originUrl ? locationAPI.generic.getById(extractId(originUrl)) : null,
        getEverything: (charaterId: number) => {
            return characterAPI.generic.getById(charaterId)
            .then(character => Promise.all([
                new Promise<Character>(resolve => resolve(character)),
                characterAPI.specific.getOrigin(character.origin.url),
                characterAPI.specific.getLocation(character.location.url),
                characterAPI.specific.getEpisodes(character.episode)
            ]))
        }
    }
}


export default characterAPI
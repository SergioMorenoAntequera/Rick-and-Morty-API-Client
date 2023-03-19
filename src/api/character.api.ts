import Character from "@/types/Character"
import constructClientConsumer from "./client.api"
import episodeAPI from "./episode.api"
import locationAPI from "./location.api"
import { extractId } from "./utils"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'character'

const characterAPI = {
    ...constructClientConsumer<Character>(entityName),
    getEpisodes: (episodesUrls: string[]) => episodeAPI.getManyById(episodesUrls.map(extractId)),
    getLocation: (locationUrl: string) => locationUrl ? locationAPI.getById(extractId(locationUrl)) : null,
    getOrigin: (originUrl: string) => originUrl ? locationAPI.getById(extractId(originUrl)) : null,
    getEverything: (charaterId: number) => {
        return characterAPI.getById(charaterId)
        .then(character => Promise.all([
            new Promise<Character>(resolve => resolve(character)),
            characterAPI.getOrigin(character.origin.url),
            characterAPI.getLocation(character.location.url),
            characterAPI.getEpisodes(character.episode)
        ]))
    }
}

export default characterAPI
import Character from "@/types/Character"
import constructClientConsumer from "./client.api"
import episodeAPI from "./episode.api"
import { extractId } from "./utils"

// PROXYS  //////////////////////////////////////////////////////////////////// 


// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'character'

const characterAPI = {
    generic: constructClientConsumer<Character>(entityName),
    specific: {
        getEpisodes: (episodesUrls: string[]) => {
            return episodeAPI.generic.getManyById(episodesUrls.map(extractId))
        }
    }
}

export default characterAPI
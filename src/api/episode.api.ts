import Episode from "@/types/Episodes"
import constructClientConsumer from "./client.api"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'episode'

const episodeAPI = {
    generic: constructClientConsumer<Episode>(entityName),
    specific: {
        
    }
}

export default episodeAPI
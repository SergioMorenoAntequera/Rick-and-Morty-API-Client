import Episode from "@/types/Episodes"
import constructClientConsumer from "./client.api"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'episode'
const episodeAPI = constructClientConsumer<Episode>(entityName)
export default episodeAPI
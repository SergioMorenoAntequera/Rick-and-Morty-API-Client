import Character from "@/types/Character"
import constructClientConsumer from "./client.api"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'character'
const characterAPI = constructClientConsumer<Character>(entityName)
export default characterAPI
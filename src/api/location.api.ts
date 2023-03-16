import constructClientConsumer from "./client.api"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'location'
const locationAPI = constructClientConsumer<Location>(entityName)
export default locationAPI
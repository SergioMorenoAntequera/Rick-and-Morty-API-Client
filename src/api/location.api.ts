import Location from "@/types/Location"
import constructClientConsumer from "./client.api"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'location'

const locationAPI = {
    generic: constructClientConsumer<Location>(entityName),
    specific: {
        
    }
}

export default locationAPI
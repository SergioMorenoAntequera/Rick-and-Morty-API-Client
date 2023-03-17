import Location from "@/types/Location"
import characterAPI from "./character.api"
import constructClientConsumer from "./client.api"
import { extractId } from "./utils"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'location'

const locationAPI = {
    generic: constructClientConsumer<Location>(entityName),
    specific: {
        getResidents: (residentsUrl: string[]) => characterAPI.generic.getManyById(residentsUrl.map(extractId)),
        getEverything: (charaterId: number) => {
            return locationAPI.generic.getById(charaterId)
            .then(location => Promise.all([
                new Promise<Location>(resolve => resolve(location)),
                locationAPI.specific.getResidents(location.residents)
            ]))
        }
    }
}

export default locationAPI
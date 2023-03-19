import Location from "@/types/Location"
import characterAPI from "./character.api"
import constructClientConsumer from "./client.api"
import { extractId } from "./utils"

// CALLS  //////////////////////////////////////////////////////////////////// 

const entityName = 'location'

const locationAPI = {
    ...constructClientConsumer<Location>(entityName),
    getResidents: (residentsUrl: string[]) => characterAPI.getManyById(residentsUrl.map(extractId)),
    getEverything: (charaterId: number) => {
        return locationAPI.getById(charaterId)
        .then(location => Promise.all([
            new Promise<Location>(resolve => resolve(location)),
            locationAPI.getResidents(location.residents)
        ]))
    }
}

export default locationAPI
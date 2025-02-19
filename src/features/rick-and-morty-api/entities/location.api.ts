import Location from "@/features/rick-and-morty-api/entities/location.type"
import CHARACTER_ENTITY from "./character.api"
import constructClientConsumer from "../client.api"
import { extractId } from "../utils/url-data-collection"

const LOCATION_ENTITY = {
    ...constructClientConsumer<Location>('location'),
    getResidents: (residentsUrl: string[]) => CHARACTER_ENTITY.getManyById(residentsUrl.map(extractId)),
    getEverything: (charaterId: number) => LOCATION_ENTITY.getById(charaterId)
        .then(location => Promise.all([
            new Promise<Location>(resolve => resolve(location)),
            LOCATION_ENTITY.getResidents(location.residents)
        ]))
}

export default LOCATION_ENTITY
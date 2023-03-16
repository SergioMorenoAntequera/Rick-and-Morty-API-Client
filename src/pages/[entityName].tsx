import characterAPI from "@/api/character.api"
import episodeAPI from "@/api/episode.api"
import locationAPI from "@/api/location.api"
import GeneralAPI from "@/types/GeneralAPI"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

const entityAPIs = {
    [characterAPI.entityName]: characterAPI,
    [episodeAPI.entityName]: episodeAPI,
    [locationAPI.entityName]: locationAPI
}

function AllEntityPage() {
    const router = useRouter()
    const entityInUrl = router.query?.entityName?.toString() ?? ''
    const [selectedAPI, setSelectedAPI] = useState<GeneralAPI<any>>()

    const { isLoading, error, data, refetch } = useQuery('selectedAPI', () => selectedAPI?.all())

    useEffect(() => {
        if(!entityInUrl) return
        if(!Object.keys(entityAPIs).includes(entityInUrl)) { router.push("/") }
        
        setSelectedAPI(entityAPIs[entityInUrl])
    }, [entityInUrl])
    
    useEffect(() => {
        if(!selectedAPI) return
        refetch()
    }, [selectedAPI])
    

    return (<div>
        <div onClick={async ()=> {
            const t = await selectedAPI?.all()
            console.log(t)
            if(t?.info.next){
                const a = await t?.info.next()
                if(a?.info.prev){
                    const b = await a?.info.prev()
                    console.log(b.results)
                }
            }
            }}>
            pra
        </div>
    </div>)
}

export default AllEntityPage
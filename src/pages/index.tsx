import characterAPI from "@/api/character.api"
import episodeAPI from "@/api/episode.api"
import locationAPI from "@/api/location.api"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  function redirectTo(entity:string) {
    router.push(`/${entity}`)
  }

  return (<>
    What do you want to drowse?

    <button onClick={()=>{redirectTo('character')}}> characters </button>
    <button onClick={()=>{redirectTo('episode')}}> episodes </button>
    <button onClick={()=>{redirectTo('location')}}> locations </button>
    
  </>)
}

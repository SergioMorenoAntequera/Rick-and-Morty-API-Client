import { useRouter } from "next/router"
import { useQuery } from "react-query"
import characterAPI from "@/api/character.api"
import getRandomNumbers from "@/utils/numberUtils"
import Link from "next/link"
import Image from "next/image"
import StatusIndicator from "@/components/StatusIndicator"

const NUMBER_OF_RANDOM_CHARACTERS = 8

export default function Home() {
  const router = useRouter()

  const { isLoading, error, data: randomCharacters, refetch } = useQuery('all', () => {
    return Promise.all(getRandomNumbers(NUMBER_OF_RANDOM_CHARACTERS).map(number => characterAPI.getById(number)))
  })


  return (<div className="text-center">
    <h1 className="text-9xl font-bold mb-6"> Try one of this ones out </h1>
    <h2 className="text-4xl mb-10"> 
      <button className="p-2 bg-gray-300 rounded mr-4 hover:bg-gray-400 transition" onClick={()=>refetch()}> Click here </button>
       If you dont like any of this characters 
    </h2>
    <div className="grid grid-cols-4 gap-10 mb-20">
      {randomCharacters?.map(character => <Link className="block" href={`/character/${character.id}`} key={character.id}>
        
        <div className="flex relative items-center justify-center">
          <div className="relative rounded overflow-hidden">
            <Image width={300} height={300} src={character.image} alt={character.image}></Image>
            
            <div className="text-white text-left absolute bottom-0 p-4 bg-gray-800 w-full">
              <p className="font-bold"> {character.name} </p>
              <StatusIndicator status={character.status}/>
            </div>

          </div>
        </div>

      </Link>)}
    </div>
    
  </div>)
}



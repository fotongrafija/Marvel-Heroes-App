import { generateHash } from "../utils/generateHash"
import { publicKey } from "../utils/generateHash"

interface Props {
    characterName: string
    offsetParam: number
}

const API_URL = process.env.VITE_API_URL ?? 'http://gateway.marvel.com/'
const CHARACTERS_PATH = 'v1/public/characters'

if (!API_URL) {
    throw new Error('VITE_API_URL is not defined in the environment');
  }


export const getApiUrl = ({ characterName, offsetParam }: Props) => {

    const ts = new Date().getTime()
    const hash = generateHash(ts)
    // const url = `${API_URL}${publicKey}&hash=${hash}&ts=${ts}&nameStartsWith=${characterName}&offset=${offsetParam}&limit=20`

    const url = new URL(API_URL)
    url.pathname = CHARACTERS_PATH
    url.searchParams.append('apikey', publicKey)
    url.searchParams.append('nameStartsWith', characterName)
    url.searchParams.append('hash', hash)
    url.searchParams.append('ts', ts.toString())
    url.searchParams.append('offset', offsetParam.toString())
    url.searchParams.append('limit', '20')

    console.log('url', url.toString())

    return url
    
}

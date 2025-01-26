import { useState, useCallback } from "react"
import { getApiUrl } from "../utils/getApiUrl"
import { useCharacterFilter } from "./useCharacterFilter";

export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
}

export interface Response {
    results: Character[];
    total: number;
    offset: number;
    limit: number;

}

interface Error {
    event: unknown
    error: unknown
}


/**
 * Custom hook for fetching character data based on a character name.
 * It manages loading state, error handling, and pagination offset.
 * 
 * @param characterName - The name of the character to fetch data for.
 * @returns An object containing character data, loading state, error, 
 *          fetch function, offset parameter, and a function to set the offset.
 * 
 * @throws Error if no data is found for the given character name.
 */
export const useCharacterData = () => {
    const [characterData, setCharacterData] = useState<Response>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error>()
    const { offsetPage, setCustomFilter } = useCharacterFilter()
    const [offsetParam, setOffsetParam] = useState(parseInt(offsetPage.toString()))
    const [totalPages, setTotalPages] = useState(0)

    const fetchCharacterData = useCallback(async (characterName: string) => {
        setLoading(true)

        try {
            if (characterName === "") {
                setCharacterData(undefined)
                setLoading(false)
                return
            }
            const url = getApiUrl({ characterName, offsetParam })
            const fetchData = async () => {
                const data = (await fetch(url)).json()
                return data
            }

            let payload = await fetchData()
           
            if (payload.data.total === 0) {
                throw new Error("No data found")
            }
            if (!payload.data.results.length && payload.data.total > 0) {
                
                // clear payload
                setCharacterData(undefined)
                // second payload
                payload = await fetchData()
                
                const total = payload.data.total
                const limit = payload.data.limit
                // If the offsetParam is greater than the total number of pages, set the offset to the last page
                setOffsetParam(Math.ceil(total / limit) * limit - limit)
                setCustomFilter({
                    page: Math.ceil(total / limit).toString(),
                    search: characterName,
                })
            }
            setTotalPages(Math.ceil(payload.data.total / payload.data.limit))
            setCharacterData(payload.data as Response)
        }
        catch (event) {
            setError(event as Error)
            throw event
        }
        finally {
            setLoading(false)
        }
    }, [offsetParam, setCustomFilter])

    return {
        characterData,
        loading,
        setLoading,
        error,
        fetchCharacterData,
        setOffsetParam,
        offsetParam,
        totalPages,
        setTotalPages,
        setError

    }
}




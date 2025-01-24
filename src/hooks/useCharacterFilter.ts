import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 20;
const DEFAULT_PAGE = "1";

export interface FilterParams {
    search?: string;
    page?: string;
}

export interface CharacterFilter {
    offsetPage: number;
    page: string;
    search: string;
    setCustomFilter: (filters: FilterParams) => void;
    resetFilters: () => void;
    searchParams: URLSearchParams;
}

/**
 * Custom hook to manage character filtering and pagination through URL parameters
 */
export const useCharacterFilter = (): CharacterFilter => {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const page = searchParams.get("page") || DEFAULT_PAGE;

    // Ensure page is a valid number
    const validatedPage = /^\d+$/.test(page) ? page : DEFAULT_PAGE;
    const offsetPage = (parseInt(validatedPage) - 1) * ITEMS_PER_PAGE;

    const setCustomFilter = useCallback((filters: FilterParams): void => {
        const newParams = new URLSearchParams();

        if (filters.search?.trim()) {
            newParams.set("search", filters.search);
        }
        
        if (filters.page && /^\d+$/.test(filters.page)) {
            newParams.set("page", filters.page);
        }

        setSearchParams(newParams);
    }, [setSearchParams]);

    const resetFilters = useCallback(() => {
        const resteParams = new URLSearchParams();
        resteParams.delete("page");
        resteParams.delete("search");
        setSearchParams(resteParams); // Reset all params creates empty object
        window.location.reload();
    }, [setSearchParams]);

    
    return {
        offsetPage,
        page: validatedPage,
        search,
        setCustomFilter,
        resetFilters,
        searchParams,
    };
};

export default useCharacterFilter;

import { useMemo } from "react";
import { getPagesCut } from "../utils/getPagesCut";
import { pagesRange } from "../utils/pagesRange";
import useCharacterFilter from "./useCharacterFilter";

interface usePaginationProps {
    totalPages: number;
}

export const usePagination = (props: usePaginationProps) => {

    const { page } = useCharacterFilter();
    const { totalPages } = props;
    
    const currentPage = useMemo(() => parseInt(page), [page]);

    const pagesCut = getPagesCut(totalPages, 5, currentPage);

    const pages = useMemo(() => pagesRange(pagesCut?.start, pagesCut?.end), [pagesCut?.start, pagesCut?.end]);

    const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);

    const isLastPage = useMemo(() => currentPage === totalPages, [currentPage, totalPages]);

    return { pages, currentPage, isFirstPage, isLastPage };
}
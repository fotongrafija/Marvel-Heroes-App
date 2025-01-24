
import { PaginationItem } from './PaginationItem';
import '../styles/pagination.scss'
import { useCharacterFilter } from '../hooks/useCharacterFilter';
import { usePagination } from '../hooks/usePagination'; 

export interface PaginationProps {
    onPageChange: (newOffset: number) => void;
    totalPages: number
}
/**
 * Pagination component that manages page state and handles page changes.
 * It calculates total pages, current page, and provides navigation controls.
 * @param {function} onPageChange - Callback function to handle page change.
 * @returns {JSX.Element} Rendered pagination component.
 */
export const PaginationComponent = ({ onPageChange, totalPages }: PaginationProps): JSX.Element => {
    const { pages, currentPage, isFirstPage, isLastPage } = usePagination({ totalPages })
    // custom hook for controlling URL state
    const { setCustomFilter } = useCharacterFilter();

    const handlePageChange = (page: number) => {
        setCustomFilter({
            page: page.toString(),
            search: '',
        });
        const newOffset = (page - 1) * 20;
        onPageChange(newOffset);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (<>
        <div className="pagination-wrapper">
            <div className="pagination">
                {
                    <PaginationItem
                        page="First"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(1)}
                        isDisabled={isFirstPage}
                    />
                }
                {
                    <PaginationItem
                        page="Prev"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(currentPage - 1)}
                        isDisabled={isFirstPage}
                    />
                }
                {pages.map((_page) => (
                    <PaginationItem
                        page={_page.toString()}
                        key={_page}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />))
                }
                {
                    <PaginationItem
                        page="Next"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(currentPage + 1)}
                        isDisabled={isLastPage}
                    />
                }
                {
                    <PaginationItem
                        page="Last"
                        currentPage={currentPage}
                        onPageChange={() => handlePageChange(totalPages)}
                        isDisabled={isLastPage}
                    />
                }
            </div>
        </div>
    </>);
}


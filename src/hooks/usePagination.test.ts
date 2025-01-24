import { renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';
import useCharacterFilter from './useCharacterFilter';
import { getPagesCut } from '../utils/getPagesCut';
import { pagesRange } from '../utils/pagesRange';

// Mock dependencies
jest.mock('./useCharacterFilter');
jest.mock('../utils/getPagesCut');
jest.mock('../utils/pagesRange');

describe('usePagination', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return correct pagination data for middle page', () => {
        // Setup mocks
        (useCharacterFilter as jest.Mock).mockReturnValue({ page: '3' });
        (getPagesCut as jest.Mock).mockReturnValue({ start: 1, end: 5 });
        (pagesRange as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);

        const { result } = renderHook(() => usePagination({ totalPages: 10 }));

        expect(result.current.currentPage).toBe(3);
        expect(result.current.isFirstPage).toBe(false);
        expect(result.current.isLastPage).toBe(false);
        expect(result.current.pages).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle first page correctly', () => {
        (useCharacterFilter as jest.Mock).mockReturnValue({ page: '1' });
        (getPagesCut as jest.Mock).mockReturnValue({ start: 1, end: 5 });
        (pagesRange as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);

        const { result } = renderHook(() => usePagination({ totalPages: 10 }));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.isFirstPage).toBe(true);
        expect(result.current.isLastPage).toBe(false);
    });

    it('should handle last page correctly', () => {
        (useCharacterFilter as jest.Mock).mockReturnValue({ page: '10' });
        (getPagesCut as jest.Mock).mockReturnValue({ start: 6, end: 10 });
        (pagesRange as jest.Mock).mockReturnValue([6, 7, 8, 9, 10]);

        const { result } = renderHook(() => usePagination({ totalPages: 10 }));

        expect(result.current.currentPage).toBe(10);
        expect(result.current.isFirstPage).toBe(false);
        expect(result.current.isLastPage).toBe(true);
    });

    it('should handle invalid page number', () => {
        (useCharacterFilter as jest.Mock).mockReturnValue({ page: 'invalid' });
        (getPagesCut as jest.Mock).mockReturnValue({ start: 1, end: 5 });
        (pagesRange as jest.Mock).mockReturnValue([1, 2, 3, 4, 5]);

        const { result } = renderHook(() => usePagination({ totalPages: 10 }));

        expect(result.current.currentPage).toBe(NaN);
        expect(result.current.pages).toEqual([1, 2, 3, 4, 5]);
    });
});
import { renderHook, act } from '@testing-library/react';
import { useCharacterFilter } from './useCharacterFilter';



const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
    
    ...jest.requireActual('react-router-dom'),
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams]
}));

describe('useCharacterFilter', () => {
    beforeEach(() => {
        mockSetSearchParams.mockClear();
        // Mock window.location.reload to avoid read-only error
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() }
        });
    });

    // it('should correctly update searchParams when setting multiple filters', () => {
    //     const { result } = renderHook(() => useCharacterFilter());
        
    //     act(() => {
    //         result.current.setCustomFilter({ 
    //             search: 'Thor',
    //             page: '2' 
    //         });
    //     });

    //     expect(result.current.search).toBe('Thor');
    //     expect(result.current.page).toBe('2');
    //     expect(result.current.offsetPage).toBe(20);
    // });

    // it('should not maintain existing params when updating only search filter', () => {
    //     const { result } = renderHook(() => useCharacterFilter());
        
    //     act(() => {
    //         result.current.setCustomFilter({ search: 'Thor' });
    //         result.current.setCustomFilter({ page: '2' });
    //     });

    //     expect(result.current.search).toBe('Thor');
    //     expect(result.current.page).toBe('2');
    // });

    it('should clear all filters on reset', () => {
        const { result } = renderHook(() => useCharacterFilter());
        
        act(() => {
            result.current.setCustomFilter({ 
                search: 'Thor',
                page: '2'
            });
            result.current.resetFilters();
        });

        expect(result.current.search).toBe('');
        expect(result.current.page).toBe('1');
        expect(result.current.offsetPage).toBe(0);
    });

    it('should update search params with Spider-Man', () => {
        const { result } = renderHook(() => useCharacterFilter());
        
        act(() => {
            result.current.setCustomFilter({ search: 'Spider-Man' });
        });

        expect(mockSetSearchParams).toHaveBeenCalledWith(
            expect.any(URLSearchParams)
        );
    });

    it('should ignore empty search strings', () => {
        const { result } = renderHook(() => useCharacterFilter());
        
        act(() => {
            result.current.setCustomFilter({ search: '   ' });
        });

        expect(mockSetSearchParams).toHaveBeenCalledWith(
            expect.any(URLSearchParams)
        );
        expect(result.current.search).toBe('');
    });

    it('should reset filters and reload page', () => {
        const reloadSpy = jest.spyOn(window.location, 'reload');
        const { result } = renderHook(() => useCharacterFilter());
        
        act(() => {
            result.current.resetFilters();
        });

        expect(mockSetSearchParams).toHaveBeenCalledWith(
            expect.any(URLSearchParams)
        );
        expect(reloadSpy).toHaveBeenCalled();
        reloadSpy.mockRestore();
    });

    it('should validate page numbers', () => {
        const { result } = renderHook(() => useCharacterFilter());

        act(() => {
            result.current.setCustomFilter({ page: 'invalid' });
        });

        expect(result.current.page).toBe('1');
        expect(result.current.offsetPage).toBe(0);
    });

    it('should handle both search and page filters simultaneously', () => {
        const { result } = renderHook(() => useCharacterFilter());
        
        act(() => {
            result.current.setCustomFilter({ 
                search: 'Iron Man',
                page: '3'
            });
        });

        expect(mockSetSearchParams).toHaveBeenCalled();
    });
    
});
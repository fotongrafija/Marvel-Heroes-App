import { renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { act } from '@testing-library/react';

describe('useDebounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    test('should return a debounced function', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useDebounce(callback, 1000));

        expect(typeof result.current).toBe('function');
    });

    test('should call callback after specified delay', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useDebounce(callback, 1000));

        act(() => {
            result.current();
        });

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should debounce multiple calls', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useDebounce(callback, 1000));

        act(() => {
            result.current();
            result.current();
            result.current();
        });

        expect(callback).not.toHaveBeenCalled();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should pass parameters to callback correctly', () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useDebounce(callback, 1000));

        act(() => {
            result.current('test', 123);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalledWith('test', 123);
    });

    test('should use updated callback', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const { result, rerender } = renderHook(
            ({ cb }) => useDebounce(cb, 1000),
            { initialProps: { cb: callback1 } }
        );

        act(() => {
            result.current();
        });

        rerender({ cb: callback2 });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).toHaveBeenCalledTimes(1);
    });

    test('should maintain the same debounced function when only callback changes', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const { result, rerender } = renderHook(
            ({ cb }) => useDebounce(cb, 1000),
            { initialProps: { cb: callback1 } }
        );

        const firstFunction = result.current;
        rerender({ cb: callback2 });
        const secondFunction = result.current;

        expect(firstFunction).toBe(secondFunction);
    });
});
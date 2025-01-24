import {useRef, useMemo, useEffect} from 'react';
import {debounce} from 'throttle-debounce';

export function useDebounce<T extends (...args: any[]) => void>(
 callback: T,
 delay: number,
) {
 const callbackRef = useRef(callback);

 useEffect(() => {
 callbackRef.current = callback;
 }, [callback]);

 return useMemo(
 () => debounce(delay, (...args: Parameters<T>) => callbackRef.current(...args)),
 [delay],
 );
}
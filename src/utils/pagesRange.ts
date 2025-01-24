



export const pagesRange = (start: number, end: number): number[] => {
    if (start > end) return [];
    return [...Array(end - start).keys()].map((el) => el + start);
};




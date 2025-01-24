import { getPagesCut } from './getPagesCut';

describe('getPagesCut', () => {
  test('handles valid inputs correctly', () => {
    expect(getPagesCut(10, 5, 1)).toEqual({ start: 1, end: 6 });
  });
  // If we are near the end
  test('handles near the end correctly', () => {
    expect(getPagesCut(10, 5, 6)).toEqual({ start: 4, end: 9 });
    
  });

  test('throws error for invalid inputs', () => {
    expect(() => getPagesCut(0, 5, 1)).toThrow('Invalid input');
    expect(() => getPagesCut(5, 5, 8)).toThrow('Current page cannot be greater than total pages');
  });
  

  test('handles edge cases', () => {
    // If pages cut count is grater than total pages
    expect(getPagesCut(3, 5, 2)).toEqual({ start: 1, end: 4 });
    // If pages cut count is equal to total pages
    expect(getPagesCut(3, 3, 2)).toEqual({ start: 1, end: 4 });
    // If pages cut count is less than total pages
    expect(getPagesCut(3, 1, 2)).toEqual({ start: 2, end: 3 });
  });

  // If current page plus beggining is greater than total pages 
  test('handles edge cases', () => {
    expect(getPagesCut(10, 5, 8)).toEqual({ start: 6, end: 11 });
  });
});
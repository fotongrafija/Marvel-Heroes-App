import { renderHook, act } from '@testing-library/react';
import { useBookmark } from './useBookmark';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
  description: string;
}

describe('useBookmark Hook', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Spider-Man',
    thumbnail: { path: 'test', extension: 'jpg' },
    description: 'Your friendly neighborhood Spider-Man',
  };

  let mockStorage: { [key: string]: string } = {};

  beforeEach(() => {
    mockStorage = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => mockStorage[key]),
        setItem: jest.fn((key, value) => {
          mockStorage[key] = value;
        }),
        removeItem: jest.fn((key) => {
          delete mockStorage[key];
        }),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with an empty saved characters list', () => {
    const { result } = renderHook(() => useBookmark());
    expect(result.current.savedCharacters).toEqual([]);
  });

  test('loads existing characters from localStorage', () => {
    const savedCharacters = [mockCharacter];
    mockStorage['savedCharacters'] = JSON.stringify(savedCharacters);

    const { result } = renderHook(() => useBookmark());
    expect(result.current.savedCharacters).toEqual(savedCharacters);
  });

  test('saves a new character', () => {
    const { result } = renderHook(() => useBookmark());

    act(() => {
      result.current.saveCharacter(mockCharacter);
    });

    expect(result.current.savedCharacters).toContainEqual(mockCharacter);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'savedCharacters',
      JSON.stringify([mockCharacter])
    );
  });

  test('removes a character by id', () => {
    const { result } = renderHook(() => useBookmark());

    act(() => {
      result.current.saveCharacter(mockCharacter);
      result.current.removeCharacter(mockCharacter.id);
    });

    expect(result.current.savedCharacters).toHaveLength(0);
  });

  test('handles invalid JSON in localStorage gracefully', () => {
    mockStorage['savedCharacters'] = 'invalid-json';
    const { result } = renderHook(() => useBookmark());
    expect(result.current.savedCharacters).toEqual([]);
  });

  test('handles non-array data in localStorage gracefully', () => {
    mockStorage['savedCharacters'] = JSON.stringify({ not: 'an array' });
    const { result } = renderHook(() => useBookmark());
    expect(result.current.savedCharacters).toEqual([]);
  });

  test('toggles bookmark state for a character', () => {
    const { result } = renderHook(() => useBookmark());

    // Initially save the character
    act(() => {
      result.current.toggleBookmark(mockCharacter, true);
    });
    expect(result.current.savedCharacters).toHaveLength(1);

    // Then remove the character
    act(() => {
      result.current.toggleBookmark(mockCharacter, false);
    });
    expect(result.current.savedCharacters).toHaveLength(0);
  });
});
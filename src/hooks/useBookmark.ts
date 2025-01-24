import { useState, useCallback, useEffect } from 'react';
import { Character } from './useCharacterData';

export const useBookmark = () => {
  const [savedCharacters, setSavedCharacters] = useState<Character[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedCharacters');
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setSavedCharacters(parsed);
      }
    } catch (error) {
      console.error('Error parsing saved characters:', error);
    }
  }, []);

  /**
   * Adds a character to the saved list and persists to localStorage.
   */
  const saveCharacter = useCallback((character: Character) => {
    setSavedCharacters(prev => {
      const next = [...prev, character];
      localStorage.setItem('savedCharacters', JSON.stringify(next));
      return next;
    });
  }, []);

  /**
   * Removes a character from the saved list by ID and persists to localStorage.
   */
  const removeCharacter = useCallback((characterId: number) => {
    setSavedCharacters(prev => {
      const next = prev.filter(char => char.id !== characterId);
      localStorage.setItem('savedCharacters', JSON.stringify(next));
      return next;
    });
  }, []);

  /**
   * Toggles a character’s bookmark status based on isChecked.
   */
  const toggleBookmark = useCallback(
    (character: Character, isChecked: boolean) => {
      return isChecked ? saveCharacter(character) : removeCharacter(character.id);
    },
    [saveCharacter, removeCharacter]
  );

  return {
    savedCharacters,
    saveCharacter,
    removeCharacter,
    toggleBookmark,
  };
};
import '../styles/characterCards.scss'
import { Character } from '../hooks/useCharacterData';

interface CharacterCardProps {
  character: Character;
  savedCharacters: Character[];
  toggleBookmark: (character: Character, isChecked: boolean) => void;
}
export const CharacterCard = ({ character, savedCharacters, toggleBookmark }: CharacterCardProps): JSX.Element => {
  const isBookmarked = Array.isArray(savedCharacters) && savedCharacters.some((c: Character) => c.id === character.id);

  const handleBookmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleBookmark(character, e.target.checked);
  }

  return (<>
    {<div data-testid={`character-${character.id}`} key={character.id} className="characterCard" style={{
      background: `url(${character.thumbnail.path}.${character.thumbnail.extension}) no-repeat center`,
      backgroundSize: 'cover'
    }}>
      <div className="caption">
        {character.name}
      </div>
      <div className="bookmark-wrapper">
        <label className="bookmark-control">
          <input
            className='bookmark-input'
            title={isBookmarked ? 'Remove from bookmark.' : 'Save to bookmark!'}
            name="checkbox"
            type="checkbox"
            aria-label='Bookmark this character'
            alt='Save to bookmark!'
            checked={isBookmarked}
            onChange={handleBookmarkChange}
          />
        </label>
      </div>
    </div>
    }</>)
}

import './styles/characterCards.scss'
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar"
import { useCharacterData } from "./hooks/useCharacterData";
import { useDebounce } from "./hooks/useDebounce";
import { CharacterCard } from "./components/CharacterCard";
import { LoadingLayout } from "./layouts/LoadingLayout";
import { PaginationComponent } from "./components/PaginationComponent";
import { useCharacterFilter } from "./hooks/useCharacterFilter";
import { useBookmark } from "./hooks/useBookmark";
import NoDataFound from "./components/NoDataFound";

function App() {
	const { characterData, loading, setOffsetParam, fetchCharacterData, error, totalPages } = useCharacterData();
	const { toggleBookmark, savedCharacters } = useBookmark();
	const { search, setCustomFilter, resetFilters } = useCharacterFilter()
	const [characterName, setCharacterName] = useState<string>(search);

	// Debounced search
	const debouncedSearchChange = useDebounce(fetchCharacterData, 1000)


	  // Fetch initial data on mount
	  useEffect(() => {
		if (characterName) {
		  debouncedSearchChange(characterName);
		}
	  }, [characterName, debouncedSearchChange]);

	// Search
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		// Validate that the input contains only letters
		const isValid = /^[a-zA-Z.()' ']*$/.test(searchTerm);
		if (!isValid) {
			return; // Do not update the state if the input is invalid
		}
		
		setCharacterName(searchTerm);
		setOffsetParam(0);
		console.log('searchTerm', searchTerm)

		if (searchTerm === "") {
			resetFilters(); // Params reset
		} else if (searchTerm) {
			setCustomFilter({
				search: searchTerm,
				page: "1",
			});
		}
	};
	// Pagination
	const handlePageChange = (newOffset: number) => {
		setCustomFilter({
			search: characterName,
			// Here #20 represents the limit of characters per page
			page: ((newOffset / 20) + 1).toString(),
		});
		setOffsetParam(newOffset)
		debouncedSearchChange(characterName);
	}
	// Conditional rendering
	const isShowingSaved = !error && !characterData && savedCharacters.length > 0
	const characters = isShowingSaved ? savedCharacters : characterData?.results
	const showPagination = !isShowingSaved && !error && totalPages > 1
	const showNoDataFound = error && !characterData && !loading 
	// Render
	return (
		<>
			<LoadingLayout isLoading={loading} />
			<SearchBar onChange={handleSearchChange} value={characterName} />
			{characters && <div className="characters">
				{characters?.map(character =>
					<CharacterCard 
					key={character.id} 
					character={character}
					savedCharacters={savedCharacters}
					toggleBookmark={toggleBookmark}
					/>
				)}
			</div>}
			{showNoDataFound && <NoDataFound />}
			{showPagination && <PaginationComponent onPageChange={handlePageChange} totalPages={totalPages} />}
		</>
	);
}
export default App





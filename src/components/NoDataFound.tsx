
import { useCharacterData } from '../hooks/useCharacterData'
import { useCharacterFilter } from '../hooks/useCharacterFilter'


const NoDataFound = () => {

    const { resetFilters } = useCharacterFilter()
    const { setError } = useCharacterData()

    
    
    const handleClick = () => {
        setError(undefined);
        resetFilters();
        
    }

    return (
        
        <div data-testid="no-data-found" className="characters" style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr',
        }}>
            <button onClick={handleClick} className="characterCard" style={{
                display: 'block'
            }}>
                <h1>404</h1>
                <span>click to start again</span>
                <div className="caption">
                    No Data Found
                </div>
            </button>
        </div>
    )
}

export default NoDataFound
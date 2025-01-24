import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom' 
import NoDataFound from './NoDataFound'

// 1) Mock the custom hooks
jest.mock('../hooks/useCharacterData', () => ({
  useCharacterData: jest.fn(),
}))
jest.mock('../hooks/useCharacterFilter', () => ({
  useCharacterFilter: jest.fn(),
}))

// 2) Import the mocked hooks so we can manipulate their return values
import { useCharacterData } from '../hooks/useCharacterData'
import { useCharacterFilter } from '../hooks/useCharacterFilter'

describe('NoDataFound', () => {
  // Prepare mock functions
  const mockSetError = jest.fn()
  const mockResetFilters = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementations
    ;(useCharacterData as jest.Mock).mockReturnValue({
      setError: mockSetError,
    })

    ;(useCharacterFilter as jest.Mock).mockReturnValue({
      resetFilters: mockResetFilters,
    })
  })

  it('renders the "No Data Found" component', () => {
    render(<NoDataFound />)

    const noDataFoundElement = screen.getByTestId('no-data-found')
    expect(noDataFoundElement).toBeInTheDocument()

    // The button should be present
    const button = screen.getByRole('button', { name: /404/i })
    expect(button).toBeInTheDocument()
  })

  it('calls setError(undefined) and resetFilters when the button is clicked', () => {
    render(<NoDataFound />)

    const button = screen.getByRole('button', { name: /click to start again/i })

    // Simulate a click
    fireEvent.click(button)

    // We expect both mocks to have been called
    expect(mockSetError).toHaveBeenCalledTimes(1)
    expect(mockSetError).toHaveBeenCalledWith(undefined)

    expect(mockResetFilters).toHaveBeenCalledTimes(1)
  })
})
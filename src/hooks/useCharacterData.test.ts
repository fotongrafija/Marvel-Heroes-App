import { renderHook, act } from '@testing-library/react';
import { useCharacterData } from './useCharacterData';
import { getApiUrl } from '../utils/getApiUrl';
import { useCharacterFilter } from './useCharacterFilter';

// 1) Mock external modules
jest.mock('../utils/getApiUrl');
jest.mock('./useCharacterFilter');

describe('useCharacterData', () => {
  // Common mocks
  const mockGetApiUrl = getApiUrl as jest.Mock;
  const mockUseCharacterFilter = useCharacterFilter as jest.Mock;
  const DEFAULT_TOTAL_PAYLOAD = 50;

  let originalFetch: typeof global.fetch;



  beforeAll(() => {
  // Set up a default mock fetch
    global.fetch = jest.fn();
  
  });
  beforeEach(() => {
    originalFetch = global.fetch;

    // Reset and restore all mocks
    jest.clearAllMocks();
    jest.restoreAllMocks();

    // Provide a default environment variable
    process.env.VITE_API_URL = 'http://gateway.marvel.com/';

    
  });

  afterEach(() => {
    // Restore original fetch
    global.fetch = originalFetch;
  });

  it('should fetch data and update state when fetchCharacterData is called', async () => {
    // Arrange
    // Mock the return value of getApiUrl
    mockGetApiUrl.mockReturnValue('https://mock-url.com/')
    
    // Mock useCharacterFilter to provide offsetPage
    mockUseCharacterFilter.mockReturnValue({
      offsetPage: 0,
      setCustomFilter: jest.fn(),
    })

    const payload = {
      data: {
        results: [{ id: 100, name: 'Mock Character' }],
        total: DEFAULT_TOTAL_PAYLOAD,
        limit: 20,
        offset: 0
      }
    }

    // Mock global fetch
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => (
       payload
      ),
    } as Response)

    // Act
    // Render the hook
    const { result } = renderHook(() => useCharacterData())

    // Initially, loading is false
    expect(result.current.loading).toBe(false)

    // Call fetchCharacterData
    await act(async () => {
      await result.current.fetchCharacterData('Spider-Man')
    })

    // Assert
    // 1) getApiUrl should be called with the correct args
    expect(mockGetApiUrl).toHaveBeenCalledWith({
      characterName: 'Spider-Man',
      offsetParam: 0,
    })

    // 2) fetch was called
    expect(global.fetch).toHaveBeenCalledWith('https://mock-url.com/')

    // 3) loading should be false after fetch completes
    expect(result.current.loading).toBe(false)

    // 4) characterData should be populated
    expect(result.current.characterData).toEqual(
      payload.data
    )
  })

  it('should do nothing if characterName is empty', async () => {
    mockGetApiUrl.mockReturnValue('https://mock-url.com/')
    mockUseCharacterFilter.mockReturnValue({
      offsetPage: 10,
      setCustomFilter: jest.fn(),
    })

    global.fetch = jest.fn() // mock, but we want to check if it’s NOT called

    const { result } = renderHook(() => useCharacterData())

    // Call fetch with empty string
    await act(async () => {
      await result.current.fetchCharacterData('')
    })

    // Should NOT call fetch
    expect(global.fetch).not.toHaveBeenCalled()
    // characterData should remain undefined
    expect(result.current.characterData).toBeUndefined()
    // loading should be false
    expect(result.current.loading).toBe(false)
  })

  it('should set error if fetch throws', async () => {
    mockGetApiUrl.mockReturnValue('https://mock-url.com/')
    mockUseCharacterFilter.mockReturnValue({
      offsetPage: 0,
      setCustomFilter: jest.fn(),
    })

    // Simulate a network or server error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => useCharacterData())

    await expect(result.current.fetchCharacterData('BadCharacter'))
      .rejects.toThrow('Network Error');

    // loading should be false
    expect(result.current.loading).toBe(false)
  })

  it('should throw if VITE_API_URL is not defined (if your hook explicitly checks for it)', async () => {
    // If your hook code throws an error when VITE_API_URL is undefined,
    // let's remove it from the environment:
    delete process.env.VITE_API_URL

    
    mockGetApiUrl.mockImplementation(() => {
      throw new Error('Error fetching data')
    })

    mockUseCharacterFilter.mockReturnValue({
      offsetPage: 0,
      setCustomFilter: jest.fn(),
    })

    const { result } = renderHook(() => useCharacterData())

    await expect(
      act(async () => {
        await result.current.fetchCharacterData('Spider-Man')
      })
    ).rejects.toThrow('Error fetching data')
  })
})
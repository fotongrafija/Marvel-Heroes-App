
jest.mock('./generateHash', () => ({
    generateHash: jest.fn(),  // turned into a Jest mock
    publicKey: 'mockedPublicKey',
  }))

  beforeAll(() => {
    // Make sure the environment variable is set
    process.env.VITE_API_URL = 'http://gateway.marvel.com/'
  })
  
  import { getApiUrl } from './getApiUrl'
  import { generateHash } from './generateHash'  
  
  describe('getApiUrl', () => {
    const MOCK_HASH = 'mockedHash'
    const MOCK_TIMESTAMP = 1234567890
  
    beforeEach(() => {
      // Make sure our environment variable is set
      process.env.VITE_API_URL = 'http://gateway.marvel.com/'
  
      
      // Because generateHash was replaced with `jest.fn()`,
      // we can do .mockReturnValue
      // ;(generateHash as jest.Mock).mockReturnValue(MOCK_HASH)
  
      const mockGenHash = generateHash as jest.Mock
      mockGenHash.mockReturnValue(MOCK_HASH)

      // Mock getTime
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(MOCK_TIMESTAMP)
    })
  
    afterEach(() => {
      jest.restoreAllMocks()
    })
  
    it('should return a URL with the correct pathname and query parameters', () => {
      const url = getApiUrl({ characterName: 'Spider-Man', offsetParam: 10 })
      expect(url.toString()).toBe(
        'http://gateway.marvel.com/v1/public/characters?' +
        'apikey=mockedPublicKey&' +
        'nameStartsWith=Spider-Man&' +
        'hash=mockedHash&' +
        'ts=1234567890&' +
        'offset=10&' +
        'limit=20'
      )
    })
  
    it('should call generateHash with the current timestamp', () => {
      getApiUrl({ characterName: 'Iron Man', offsetParam: 5 })
      expect(generateHash).toHaveBeenCalledTimes(1)
      expect(generateHash).toHaveBeenCalledWith(MOCK_TIMESTAMP)
    })

    
  })
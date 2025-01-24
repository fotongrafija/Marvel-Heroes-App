import { vi } from 'vitest'

// Mock Vite's import.meta.env
vi.mock('./utils/getApiUrl', () => ({
  API_URL: 'https://gateway.marvel.com/',
  default: {
    VITE_API_URL: 'https://gateway.marvel.com/'
  }
}))

// Mock environment variables
process.env.VITE_API_URL = 'https://gateway.marvel.com/'
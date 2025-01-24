import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useCharacterData } from './hooks/useCharacterData';
import { useBookmark } from './hooks/useBookmark';
import { useCharacterFilter } from './hooks/useCharacterFilter';

// Mock the hooks
jest.mock('./hooks/useCharacterData');
jest.mock('./hooks/useBookmark');
jest.mock('./hooks/useCharacterFilter');

const mockApp = () => {
    console.log('app');
    return render(<div><div id='root' /><App /></div>)
}

describe('App', () => {
    const mockCharacterData = {
        results: [
            { id: 1, name: 'Spider-Man', thumbnail: { path: 'path', extension: 'jpg' } },
            { id: 2, name: 'Iron Man', thumbnail: { path: 'path', extension: 'jpg' } }
        ]
    };

    beforeEach(() => {
        (useCharacterData as jest.Mock).mockReturnValue({
            characterData: mockCharacterData,
            loading: false,
            setOffsetParam: jest.fn(),
            fetchCharacterData: jest.fn(),
            error: undefined,
            totalPages: 2
        });

        (useBookmark as jest.Mock).mockReturnValue({
            toggleBookmark: jest.fn(),
            savedCharacters: []
        });

        (useCharacterFilter as jest.Mock).mockReturnValue({
            search: '',
            setCustomFilter: jest.fn(),
            resetFilters: jest.fn()
        });
    });

    test('renders search bar', () => {
        mockApp();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('renders character cards when data is available', () => {
        mockApp();
        expect(screen.getByText('Spider-Man')).toBeInTheDocument();
        expect(screen.getByText('Iron Man')).toBeInTheDocument();
    });

    test('handles valid search input', async () => {
        mockApp();
        const searchInput = screen.getByRole('textbox');

        fireEvent.change(searchInput, { target: { value: 'Spider' } });

        await waitFor(() => {
            expect(searchInput).toHaveValue('Spider');
        });
    });

    test('blocks invalid search input', () => {
        mockApp();
        const searchInput = screen.getByRole('textbox');

        fireEvent.change(searchInput, { target: { value: '123' } });

        expect(searchInput).toHaveValue('');
    });



    test('shows error state', () => {
        (useCharacterData as jest.Mock).mockReturnValue({
            ...useCharacterData,
            error: 'Error message',
            characterData: undefined
        });

        mockApp();
        expect(screen.getByTestId('no-data-found')).toBeInTheDocument();
    });
});
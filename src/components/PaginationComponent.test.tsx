
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { PaginationComponent } from './PaginationComponent';

// Mock hooks
jest.mock('../hooks/usePagination');
jest.mock('../hooks/useCharacterFilter');

import { usePagination } from '../hooks/usePagination';
import { useCharacterFilter } from '../hooks/useCharacterFilter';

describe('PaginationComponent', () => {
  const mockUsePagination = usePagination as jest.Mock;
  const mockUseCharacterFilter = useCharacterFilter as jest.Mock;

  const mockSetCustomFilter = jest.fn();
  const mockOnPageChange = jest.fn();
  let originalScrollTo: typeof window.scrollTo;

  beforeAll(() => {
    // Save the real scrollTo before mocking
    originalScrollTo = window.scrollTo;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // By default, let's say we have totalPages = 3, currentPage = 1
    mockUsePagination.mockReturnValue({
      pages: [1, 2, 3],
      currentPage: 1,
      isFirstPage: true,
      isLastPage: false,
    });

    mockUseCharacterFilter.mockReturnValue({
      setCustomFilter: mockSetCustomFilter,
    });

    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    // Restore the real scrollTo
    window.scrollTo = originalScrollTo;
  });

  it('renders pagination items (First, Prev, numbered pages, Next, Last)', () => {
    render(<PaginationComponent onPageChange={mockOnPageChange} totalPages={3} />);

    // We expect these buttons to be in the document
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });

  it('disables First and Prev when isFirstPage = true', () => {
    // The default mock sets isFirstPage = true
    render(<PaginationComponent onPageChange={mockOnPageChange} totalPages={3} />);

    const firstButton = screen.getByText('First') as HTMLButtonElement;
    const prevButton = screen.getByText('Prev') as HTMLButtonElement;

    expect(firstButton).toHaveClass('disabled');
    expect(prevButton).toHaveClass('disabled');
  });

  it('calls onPageChange and setCustomFilter when a page is clicked', () => {
    // Default mock: currentPage = 1, isFirstPage = true, isLastPage = false
    // We'll click on page "2"
    render(<PaginationComponent onPageChange={mockOnPageChange} totalPages={3} />);

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    // Expect setCustomFilter to be called with page: '2', search: ''
    expect(mockSetCustomFilter).toHaveBeenCalledWith({ page: '2', search: '' });
    // onPageChange should be called with (2 - 1) * 20 = 20
    expect(mockOnPageChange).toHaveBeenCalledWith(20);

    // Should scroll to top
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('disables Next and Last when isLastPage = true', () => {
    // Override our default mock to set isLastPage = true
    mockUsePagination.mockReturnValueOnce({
      pages: [1, 2, 3],
      currentPage: 3,
      isFirstPage: false,
      isLastPage: true,
    });

    render(<PaginationComponent onPageChange={mockOnPageChange} totalPages={3} />);

    const nextButton = screen.getByText('Next') as HTMLButtonElement;
    const lastButton = screen.getByText('Last') as HTMLButtonElement;

    expect(nextButton).toHaveClass('disabled');
    expect(lastButton).toHaveClass('disabled');
  });

  it('handles a simple "Next" button click', () => {
    // We’ll simulate currentPage=1, not last page => Next is enabled
    render(<PaginationComponent onPageChange={mockOnPageChange} totalPages={3} />);
    const nextButton = screen.getByText('Next');

    fireEvent.click(nextButton);

    // Next button goes to page = currentPage + 1 = 2 => offset = (2 - 1)*20 = 20
    expect(mockSetCustomFilter).toHaveBeenCalledWith({ page: '2', search: '' });
    expect(mockOnPageChange).toHaveBeenCalledWith(20);
  });
});
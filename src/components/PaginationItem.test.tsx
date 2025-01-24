
import { render, screen, fireEvent } from '@testing-library/react';
import { PaginationItem } from './PaginationItem';
import '@testing-library/jest-dom';

describe('PaginationItem', () => {
	const mockOnPageChange = jest.fn();
	
	beforeEach(() => {
		mockOnPageChange.mockClear();
	});

	test('renders pagination item with correct page number', () => {
		render(
			<PaginationItem
				page="1"
				currentPage={1}
				onPageChange={mockOnPageChange}
			/>
		);
		
		expect(screen.getByText('1')).toBeInTheDocument();
	});

	test('calls onPageChange with correct page number when clicked', () => {
		render(
			<PaginationItem
				page="2"
				currentPage={1}
				onPageChange={mockOnPageChange}
			/>
		);

		fireEvent.click(screen.getByRole('button'));
		expect(mockOnPageChange).toHaveBeenCalledWith(2);
	});

	test('applies active class when current page matches', () => {
		render(
			<PaginationItem
				page="1"
				currentPage={1}
				onPageChange={mockOnPageChange}
			/>
		);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('page-item');
		expect(button).toHaveClass('active');
	});

	test('applies disabled state correctly', () => {
		render(
			<PaginationItem
				page="1"
				currentPage={1}
				onPageChange={mockOnPageChange}
				isDisabled={true}
			/>
		);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
		expect(button).toHaveClass('disabled');
	});

	test('has correct aria-label', () => {
		render(
			<PaginationItem
				page="3"
				currentPage={1}
				onPageChange={mockOnPageChange}
			/>
		);

		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-label', 'Page button 3');
	});

	test('applies correct class names to span element', () => {
		render(
			<PaginationItem
				page="1"
				currentPage={1}
				onPageChange={mockOnPageChange}
			/>
		);

		const span = screen.getByText('1');
		expect(span).toHaveClass('page-link');
		expect(span).toHaveClass('active');
	});
});
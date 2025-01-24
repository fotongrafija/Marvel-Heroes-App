
// import { render, fireEvent, waitFor } from '@testing-library/react';

import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
	it('renders correctly with the placeholder text', () => {
		render(<SearchBar value="" onChange={() => { }} />);
		expect(screen.getByPlaceholderText('Type character name...')).toBeInTheDocument();
	});

	it('displays the correct value in the input field', () => {
		render(<SearchBar value="John Doe" onChange={() => { }} />);
		expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
	});

	it('calls onChange handler when the input value changes', () => {
		const handleChange = jest.fn();
		render(<SearchBar value="" onChange={handleChange} />);

		const input = screen.getByPlaceholderText('Type character name...');
		fireEvent.change(input, { target: { value: 'Jane Doe' } });

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); // Optionally check the event object
	});
	// Egde cases
	// it('handles null or undefined value gracefully', () => {
	// 	// @ts-expect-error Testing an invalid prop
	// 	render(<SearchBar value={null} onChange={() => { }} />);
	// 	const input = screen.getByPlaceholderText('Type character name...');
	// 	expect(input).toHaveValue('');
	// });
	// it('renders correctly without an onChange handler', () => {
	// 	render(<SearchBar value="Test" />);
	// 	const input = screen.getByPlaceholderText('Type character name...');
	// 	expect(input).toBeInTheDocument();
	// });
	// it('renders correctly with a long value', () => {
	// 	const longValue = 'a'.repeat(1000);
	// 	render(<SearchBar value={longValue} onChange={() => { }} />);
	// 	expect(screen.getByDisplayValue(longValue)).toBeInTheDocument();
	// });
	it('handles Enter key without issues', () => {
		const handleChange = jest.fn();
		render(<SearchBar value="" onChange={handleChange} />);
	  
		const input = screen.getByPlaceholderText('Type character name...');
		fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
	  
		// No specific behavior expected unless defined, so just ensure no crash
		expect(input).toBeInTheDocument();
	  });
});
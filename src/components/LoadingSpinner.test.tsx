import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner', () => {
    const { container } = render(<LoadingSpinner />);
    
    // Query an element with the 'spinner' class
    const spinnerElement = container.querySelector('.spinner');
    
    expect(spinnerElement).toBeInTheDocument();
  });
});
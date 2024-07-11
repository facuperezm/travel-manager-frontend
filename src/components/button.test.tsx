import { render, screen } from '@testing-library/react';
import MyButton from './button';

describe('MyButton Component', () => {
  it('should display loading text', () => {
    render(<MyButton />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

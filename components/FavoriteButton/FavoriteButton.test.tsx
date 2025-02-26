import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoriteButton } from './FavoriteButton';


describe('FavoriteButton', () => {
  test('renders correctly when not a favorite', () => {
    render(<FavoriteButton isFavorite={false} />);
    
    const button = screen.getByRole('button', { name: /add to favorites/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-gray-400');
    expect(button).not.toHaveClass('text-red-500');
  });

  test('renders correctly when a favorite', () => {
    render(<FavoriteButton isFavorite={true} />);
    
    const button = screen.getByRole('button', { name: /remove from favorites/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-red-500');
    expect(button).not.toHaveClass('text-gray-400');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<FavoriteButton isFavorite={false} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 
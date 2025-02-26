import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './SearchBar';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

import { useRouter } from 'next/navigation';

describe('SearchBar', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useRouter).mockReturnValue(mockRouter);
  });

  test('renders with empty input by default', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('textbox', { name: /buscar vídeos/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
    
    
    expect(screen.queryByRole('button', { name: /limpar busca/i })).not.toBeInTheDocument();
  });

  test('renders with provided initialQuery value', () => {
    render(<SearchBar initialQuery="javascript" />);
    
    const input = screen.getByRole('textbox', { name: /buscar vídeos/i });
    expect(input).toHaveValue('javascript');
    
  
    expect(screen.getByRole('button', { name: /limpar busca/i })).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('textbox', { name: /buscar vídeos/i });
    fireEvent.change(input, { target: { value: 'react tutorial' } });
    
    expect(input).toHaveValue('react tutorial');
  });

  test('shows clear button when input has text', () => {
    render(<SearchBar />);
    
    const input = screen.getByRole('textbox', { name: /buscar vídeos/i });
    fireEvent.change(input, { target: { value: 'react tutorial' } });
    
    const clearButton = screen.getByRole('button', { name: /limpar busca/i });
    expect(clearButton).toBeInTheDocument();
  });

  test('clears input when clear button is clicked', () => {
    render(<SearchBar initialQuery="javascript" />);
    
    const clearButton = screen.getByRole('button', { name: /limpar busca/i });
    fireEvent.click(clearButton);
    
    const input = screen.getByRole('textbox', { name: /buscar vídeos/i });
    expect(input).toHaveValue('');
    
    // Clear button should now be hidden
    expect(screen.queryByRole('button', { name: /limpar busca/i })).not.toBeInTheDocument();
  });

  test('focuses input after clearing', () => {
    render(<SearchBar initialQuery="javascript" />);
    
    const input = screen.getByRole('textbox', { name: /buscar vídeos/i });
    const clearButton = screen.getByRole('button', { name: /limpar busca/i });
    

    const mockFocus = jest.fn();
    input.focus = mockFocus;
    
    fireEvent.click(clearButton);
    
    expect(mockFocus).toHaveBeenCalledTimes(1);
  });

}); 
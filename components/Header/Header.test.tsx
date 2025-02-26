import { render, screen } from '@testing-library/react';
import { Header } from './Header';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    pathname: '/',
  }),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

import { usePathname, useRouter } from 'next/navigation';
  
describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReset();
    (useRouter as jest.Mock).mockReset().mockReturnValue({
      push: jest.fn(),
      pathname: '/',
    });
  });

  it('renders logo and platform name correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    
    render(<Header />);
    
    expect(screen.getByText('VideoPlatform')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /videoPlatform/i })).toHaveAttribute('href', '/');
  });

  test('highlights Home link when on home page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    
    render(<Header />);
    
    const homeLinks = screen.getAllByRole('link', { name: /início/i });

    homeLinks.forEach(link => {
      expect(link).toHaveClass('bg-blue-100');
      expect(link).toHaveClass('text-blue-800');
    });
    
    const favoriteLinks = screen.getAllByRole('link', { name: /favoritos/i });
    favoriteLinks.forEach(link => {
      expect(link).not.toHaveClass('bg-blue-100');
      expect(link).not.toHaveClass('text-blue-800');
    });
  });

  test('highlights Favorites link when on favorites page', () => {
    (usePathname as jest.Mock).mockReturnValue('/favorites');
    
    render(<Header />);
    
    const favoriteLinks = screen.getAllByRole('link', { name: /favoritos/i });
    favoriteLinks.forEach(link => {
      expect(link).toHaveClass('bg-blue-100');
      expect(link).toHaveClass('text-blue-800');
    });
    
    const homeLinks = screen.getAllByRole('link', { name: /início/i });
    homeLinks.forEach(link => {
      expect(link).not.toHaveClass('bg-blue-100');
      expect(link).not.toHaveClass('text-blue-800');
    });
  });

}); 
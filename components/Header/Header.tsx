import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchBar } from '../SearchBar';

interface HeaderProps {
  searchQuery?: string;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery = '' }) => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path);
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="content-between mx-auto px-10 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mr-2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              <span>VideoPlatform</span>
            </Link>
            
            <nav className="hidden md:flex space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive('/') && !isActive('/favorites') && !isActive('/search')
                    ? 'bg-blue-100 text-blue-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Início
              </Link>
              <Link 
                href="/favorites" 
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive('/favorites') 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Favoritos
              </Link>
            </nav>
          </div>
          
          <div className="w-full md:w-auto flex-1 md:max-w-lg">
            <SearchBar initialQuery={searchQuery} />
          </div>
        </div>
        
        <div className="md:hidden flex mt-3 space-x-4">
          <Link 
            href="/" 
            className={`flex-1 text-center px-3 py-2 rounded-md transition-colors ${
              isActive('/') && !isActive('/favorites') && !isActive('/search')
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Início
          </Link>
          <Link 
            href="/favorites" 
            className={`flex-1 text-center px-3 py-2 rounded-md transition-colors ${
              isActive('/favorites') 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Favoritos
          </Link>
        </div>
      </div>
    </header>
  );
};
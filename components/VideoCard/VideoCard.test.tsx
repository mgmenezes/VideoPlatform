import { render, screen, fireEvent } from '@testing-library/react';
import { VideoCard } from './VideoCard';
import { Video } from '@/types/types';


jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, sizes, ...rest } = props;
    return <img {...rest} data-testid="next-image" />;
  },
}));

jest.mock('../FavoriteButton', () => ({
  FavoriteButton: ({ isFavorite, onClick }: { isFavorite: boolean; onClick: () => void }) => (
    <button 
      data-testid="favorite-button"
      onClick={onClick}
      data-favorite={isFavorite}
    >
      {isFavorite ? 'Favorite' : 'Not Favorite'}
    </button>
  ),
}));

describe('VideoCard', () => {
  const mockVideo: Video = {
    id: '1',
    title: 'Test Video',
    description: 'Test video description',
    thumbnailUrl: '/thumbnail.jpg',
    embedUrl: 'https://www.youtube.com/embed/123456',
    platform: 'youtube',
    channelName: 'Test Channel',
    duration: '10:00',
    views: 1000,
    publishedAt: new Date('2023-01-01T00:00:00Z'),
  };

  const mockOnSelect = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls onSelect when the title is clicked', () => {
    render(
      <VideoCard
        video={mockVideo}
        onSelect={mockOnSelect}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    fireEvent.click(screen.getByText('Test Video'));
    expect(mockOnSelect).toHaveBeenCalledWith(mockVideo);
  });

  test('calls onSelect when the thumbnail is clicked', () => {
    render(
      <VideoCard
        video={mockVideo}
        onSelect={mockOnSelect}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const thumbnailContainer = screen.getByAltText('Test Video').closest('div')?.parentElement;
    if (thumbnailContainer) {
      fireEvent.click(thumbnailContainer);
      expect(mockOnSelect).toHaveBeenCalledWith(mockVideo);
    }
  });

  test('correctly displays the favorite state', () => {
    const { rerender } = render(
      <VideoCard
        video={mockVideo}
        onSelect={mockOnSelect}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(screen.getByTestId('favorite-button')).toHaveAttribute('data-favorite', 'false');

 
    rerender(
      <VideoCard
        video={mockVideo}
        onSelect={mockOnSelect}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(screen.getByTestId('favorite-button')).toHaveAttribute('data-favorite', 'true');
  });

  test('calls onToggleFavorite when the favorite button is clicked', () => {
    render(
      <VideoCard
        video={mockVideo}
        onSelect={mockOnSelect}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    fireEvent.click(screen.getByTestId('favorite-button'));
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockVideo);
  });
}); 
"use client";
import { FaHeart } from "react-icons/fa";


interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick?: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
}) => {
  return (
    <button
      className={`text-sm favorite-button flex items-center justify-center p-1 rounded-full transition-all duration-300 ${
        isFavorite
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-500"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
    <FaHeart />
  
      {isFavorite}
    </button>
  );
};

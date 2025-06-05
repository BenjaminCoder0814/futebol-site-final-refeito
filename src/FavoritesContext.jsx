import { createContext, useContext, useState, useEffect } from "react";

// Criação do contexto
const FavoritesContext = createContext();

// Provider do contexto
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Recupera do localStorage (opcional)
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Atualiza localStorage sempre que favoritos mudam
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Alterna o estado de favoritado
  const toggleFavorite = (item) => {
    const exists = favorites.some(fav => fav.id === item.id);
    if (exists) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook para acessar o contexto
export const useFavorites = () => useContext(FavoritesContext);

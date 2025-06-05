import { useFavorites } from '../FavoritesContext';

const ItemCard = ({ item }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.some(fav => fav.id === item.id);

  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{item.nome}</h3>
        {/* Exiba mais dados aqui se quiser, como preço ou imagem */}
      </div>

      <button onClick={() => toggleFavorite(item)} className="text-red-500 text-xl">
        {isFavorited ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default ItemCard;

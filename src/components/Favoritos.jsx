import React from "react";
import { useFavorites } from "../FavoritesContext";
import ProductCard from "./ProductCard";

export default function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">💖 Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">Você ainda não favoritou nenhum produto.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {favorites.map(produto => (
            <ProductCard key={produto.id} produto={produto} adicionarAoCarrinho={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}

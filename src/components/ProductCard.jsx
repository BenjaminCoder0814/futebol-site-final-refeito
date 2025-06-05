import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck } from "react-icons/fa";
import { useFavorites } from "../FavoritesContext";

export default function ProductCard({ produto, adicionarAoCarrinho }) {
  const [detalhes, setDetalhes] = useState(false);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(null);

  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.some(fav => fav.id === produto.id);

  const calcularFrete = () => {
    const apenasNumeros = cep.replace(/\D/g, '');
    if (apenasNumeros.length === 8) {
      const dias = Math.floor(Math.random() * 10) + 1;
      setFrete(`Entrega estimada em até ${dias} dias úteis 🚚`);
    } else {
      setFrete("Digite um CEP válido (8 dígitos)");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow text-center relative">
      {/* Botão de favoritar */}
      <button
        onClick={() => toggleFavorite(produto)}
        className="absolute top-2 right-2 text-2xl"
      >
        {isFavorited ? '❤️' : '🤍'}
      </button>

      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-bold">{produto.nome}</h3>
      <p className="text-green-700 font-semibold">{produto.preco}</p>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => adicionarAoCarrinho(produto)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Adicionar ao Carrinho
        </button>
        <button
          onClick={() => setDetalhes(true)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Ver Detalhes
        </button>
      </div>

      {/* Modal de detalhes */}
      <AnimatePresence>
        {detalhes && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setDetalhes(false)}
                className="absolute top-2 right-4 text-lg font-bold"
              >
                ✕
              </button>
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover rounded mb-4"
              />

              <h3 className="text-xl font-bold">{produto.nome}</h3>
              <p className="text-green-700 text-lg font-semibold mb-2">
                {produto.preco}
              </p>

              {/* Ficha Técnica */}
              {produto.tamanhos && (
                <p className="text-sm mb-2">
                  <strong>Tamanhos disponíveis:</strong> {produto.tamanhos.join(", ")}
                </p>
              )}
              {produto.cores && (
                <p className="text-sm mb-2">
                  <strong>Cores disponíveis:</strong> {produto.cores.join(", ")}
                </p>
              )}

              {/* Frete */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Digite seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                  maxLength={8}
                />
                <button
                  onClick={calcularFrete}
                  className="bg-yellow-400 px-4 py-1 rounded text-black w-full hover:bg-yellow-300"
                >
                  Calcular Frete
                </button>
                {frete && (
                  <p className="mt-2 text-green-700 text-sm flex items-center justify-center gap-1">
                    <FaTruck /> {frete}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  adicionarAoCarrinho(produto);
                  setDetalhes(false);
                }}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Adicionar ao Carrinho
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

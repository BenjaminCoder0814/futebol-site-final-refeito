// CarrinhoModal.jsx
import React from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";

export default function CarrinhoModal({ produtos = [], onFechar, onRemover, onAlterarQtd, onFinalizar }) {
  const total = produtos.reduce((acc, item) => {
    const preco = parseFloat(item?.preco?.replace("R$", "").replace(",", ".") || 0);
    return acc + preco * (item?.quantidade || 1);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onFechar}
          className="absolute left-4 top-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Seu Carrinho</h2>

        {produtos.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Carrinho vazio</p>
        ) : (
          <>
            <ul className="space-y-4">
              {produtos.map((item, index) => (
                <li key={index} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img src={item.imagem} alt={item.nome} className="w-14 h-14 object-cover rounded" />
                    <div>
                      <h3 className="font-bold text-sm md:text-base">{item.nome}</h3>
                      <p className="text-green-600 text-sm">{item.preco}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => onAlterarQtd(index, -1)} className="px-2 py-1 text-gray-600 hover:text-black">
                      <Minus size={16} />
                    </button>
                    <span className="text-sm font-semibold">{item.quantidade}</span>
                    <button onClick={() => onAlterarQtd(index, 1)} className="px-2 py-1 text-gray-600 hover:text-black">
                      <Plus size={16} />
                    </button>
                    <button onClick={() => onRemover(index)} className="ml-2 text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <p className="font-bold text-lg">
                Total: <span className="text-green-700">R$ {total.toFixed(2).replace('.', ',')}</span>
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={onFinalizar}
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

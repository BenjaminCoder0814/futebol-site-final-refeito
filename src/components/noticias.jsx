import React, { useState } from "react";

// Importando corretamente as imagens
import brasilImg from "./imagens/brasil.webp";
import corinthiansImg from "./imagens/corinthians.webp";
import palmeirasImg from "./imagens/palmeiras.jpg";
import flamengoImg from "./imagens/flamengo.jpg";
import gremioImg from "./imagens/gremio.jpg";
import santosImg from "./imagens/santos.jpg";
import exclusivaImg from "./imagens/exclusiva.jpg";

const noticiasIniciais = [
  { id: 1, titulo: "Brasil vence amistoso", imagem: brasilImg },
  { id: 2, titulo: "Corinthians anuncia novo reforço", imagem: corinthiansImg },
  { id: 3, titulo: "Palmeiras estreia na Libertadores", imagem: palmeirasImg },
  { id: 4, titulo: "Flamengo treina no Ninho do Urubu", imagem: flamengoImg },
  { id: 5, titulo: "Grêmio busca liderança", imagem: gremioImg },
  { id: 6, titulo: "Santos apresenta novo técnico", imagem: santosImg }
];

export default function Noticias() {
  const [noticias, setNoticias] = useState(noticiasIniciais);
  const [modal, setModal] = useState({ aberto: false, tipo: "", noticia: null });

  const removerNoticia = (id) => {
    const novaNoticia = {
      id: Date.now(),
      titulo: "Nova notícia exclusiva!",
      imagem: exclusivaImg
    };
    setNoticias((prev) => prev.filter((n) => n.id !== id).concat(novaNoticia));
    const noticia = noticias.find((n) => n.id === id);
    setModal({ aberto: true, tipo: "remover", noticia });
  };

  const saibaMais = (noticia) => {
    setModal({ aberto: true, tipo: "saibaMais", noticia });
  };

  const fecharModal = () => {
    setModal({ aberto: false, tipo: "", noticia: null });
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Notícias da Semana</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {noticias.map((n) => (
          <div key={n.id} className="bg-white rounded shadow p-4">
            <img src={n.imagem} alt={n.titulo} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold mb-1">{n.titulo}</h3>
            <div className="flex gap-2 mt-2">
              <button onClick={() => saibaMais(n)} className="text-green-600 text-sm underline">
                Saiba mais
              </button>
              <button onClick={() => removerNoticia(n.id)} className="text-red-600 text-sm underline">
                Não tenho interesse
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal.aberto && modal.noticia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={fecharModal}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-lg"
            >
              ×
            </button>

            {modal.tipo === "saibaMais" ? (
              <>
                <h3 className="text-xl font-bold text-green-700 mb-2">{modal.noticia.titulo}</h3>
                <img src={modal.noticia.imagem} alt={modal.noticia.titulo} className="w-full h-48 object-cover rounded mb-4" />
                <p className="text-gray-700">
                  Esta página está em construção. Em breve você poderá ler a notícia completa sobre <strong>{modal.noticia.titulo}</strong>.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-red-700 mb-4">Notícia removida</h3>
                <p className="text-gray-700">
                  A notícia <strong>{modal.noticia.titulo}</strong> foi removida com sucesso e substituída por outra no seu feed.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

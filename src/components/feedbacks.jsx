import React from 'react';

const feedbacks = [
  { nome: "Lucas", mensagem: "Entrega rápida e produto excelente!" },
  { nome: "Mariana", mensagem: "Adorei a qualidade da camisa do meu time!" },
  { nome: "Carlos", mensagem: "Compra fácil e atendimento ótimo." },
  { nome: "Fernanda", mensagem: "Voltarei a comprar, super satisfeita!" },
  { nome: "Pedro", mensagem: "Produto chegou antes do prazo." },
  { nome: "Ana", mensagem: "Muito bom! Recomendo demais." },
  { nome: "João", mensagem: "Atendimento excelente!" },
  { nome: "Juliana", mensagem: "Produto top demais, amei!" },
  { nome: "Rafael", mensagem: "Super recomendo, tudo perfeito." },
  { nome: "Bianca", mensagem: "Qualidade surpreendente!" },
  { nome: "Renan", mensagem: "Experiência muito boa com a loja." },
  { nome: "Larissa", mensagem: "Meu filho adorou o presente!" },
  { nome: "Diego", mensagem: "Muito bom o material." },
  { nome: "Camila", mensagem: "Nota 10!" },
  { nome: "Vinicius", mensagem: "Chegou tudo certinho." },
];

export default function Feedbacks() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-6">O que dizem nossos clientes</h2>
      <div className="overflow-hidden relative">
        <div className="flex animate-scrollFeedbacks gap-6 w-max px-4">
          {feedbacks.map((f, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-xs bg-white border border-gray-200 shadow-md rounded-lg p-4"
            >
              <p className="font-semibold text-green-700">{f.nome}</p>
              <p className="text-gray-700">{f.mensagem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

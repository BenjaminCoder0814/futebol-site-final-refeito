// src/components/Banner.jsx
import React from "react";
import bannerImg from "./imagens/banner.jpg"; // certifique-se que o nome e a extensão estão corretos

export default function Banner() {
  return (
    <section
      className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl"
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-2">🏆 Super Ofertas da Semana</h1>
          <p className="text-lg">Descontos especiais em equipamentos de futebol. Aproveite agora mesmo!</p>
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white p-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h4 className="font-bold mb-2">Futebol Club</h4>
          <p>Rua Esporte 123 - São Paulo - SP</p>
          <p>Email: contato@futebolclub.com</p>
          <p>Tel: (11) 99999-9999</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a>
          <a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a>
          <a href="https://twitter.com" target="_blank" className="hover:underline">Twitter</a>
        </div>
      </div>
      <div className="mt-4 text-center text-sm">© 2024 Futebol Club. Todos os direitos reservados.</div>
    </footer>
  );
}
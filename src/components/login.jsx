import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [showForm, setShowForm] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleProviderClick = () => {
    setShowForm(true); // Ativa o formulário com nome, email e senha
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Garante que está enviando corretamente os dados para o App.jsx
    onLogin({ nome, email, senha });
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
      {!showForm ? (
        <div className="bg-white shadow-lg rounded p-8 w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Entrar com:</h2>
          <button onClick={handleProviderClick} className="w-full bg-white border border-gray-300 py-2 rounded mb-2 hover:bg-gray-100">Google</button>
          <button onClick={handleProviderClick} className="w-full bg-blue-600 text-white py-2 rounded mb-2 hover:bg-blue-700">Facebook</button>
          <button onClick={handleProviderClick} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Apple</button>
          <div className="mt-4 text-sm text-gray-700">
            Não tem conta? Clique em uma opção acima para continuar.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded p-8 w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-center text-green-700">Login</h2>
          <input
            type="text"
            placeholder="Nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}

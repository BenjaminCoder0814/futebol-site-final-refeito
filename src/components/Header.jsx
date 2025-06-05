import React from 'react';
import { Search, User, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({
  onAbrirCarrinho,
  carrinho,
  usuarioLogado,
  nomeUsuario,
  onIrParaLogin
}) {
  const [busca, setBusca] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const texto = busca.toLowerCase();

    const elementos = Array.from(document.querySelectorAll('body *')).filter(el =>
      el.children.length === 0 && el.textContent.toLowerCase().includes(texto)
    );

    if (elementos.length > 0) {
      elementos[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      alert('Nenhum resultado encontrado 😕');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo com link para home */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:underline">
          <span role="img" aria-label="bola">⚽</span> Futebol Club
        </Link>

        {/* Barra de busca */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="px-4 py-1 rounded-full text-black focus:outline-none w-64"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Ícones */}
        <div className="flex items-center gap-6">
          {/* Ver favoritos */}
          <Link to="/favoritos" className="flex items-center gap-1 hover:underline">
            <Heart size={20} />
            Ver Favoritos
          </Link>

          {/* Usuário / Login */}
          {usuarioLogado ? (
            <div className="flex items-center gap-1 cursor-default">
              <User size={20} />
              <span>Bem-vindo, {nomeUsuario}</span>
            </div>
          ) : (
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline"
              onClick={onIrParaLogin}
            >
              <User size={20} />
              Login
            </div>
          )}

          {/* Carrinho */}
          <div className="relative cursor-pointer" onClick={onAbrirCarrinho}>
            <ShoppingCart size={24} />
            {carrinho.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {carrinho.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Feedbacks from './components/feedbacks';
import Noticias from './components/noticias';
import Banner from './components/Banner';
import CarrinhoModal from './components/CarrinhoModal';
import Confetti from 'react-confetti';
import produtos from './components/produtos';
import Login from './components/login';
import Favoritos from './components/Favoritos';

function App() {
  const [logado, setLogado] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarDados, setMostrarDados] = useState(false);
  const [mostrarAvisoLogin, setMostrarAvisoLogin] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarAgradecimento, setMostrarAgradecimento] = useState(false);
  const [cep, setCep] = useState('');
  const [mensagemFrete, setMensagemFrete] = useState('');
  const [erroCep, setErroCep] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = (userData) => {
    setNome(userData.nome);
    setEmail(userData.email);
    setSenha(userData.senha);
    setLogado(true);
    setMostrarLogin(false);
  };

  const adicionarAoCarrinho = (produto) => {
    if (!logado) {
      setMostrarAvisoLogin(true);
      return;
    }
    setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
  };

  const removerDoCarrinho = (index) => {
    const novo = [...carrinho];
    novo.splice(index, 1);
    setCarrinho(novo);
  };

  const alterarQuantidade = (index, delta) => {
    const novo = [...carrinho];
    novo[index].quantidade = Math.max(1, novo[index].quantidade + delta);
    setCarrinho(novo);
  };

  const finalizarCompra = () => {
    setCarrinho([]);
    setMostrarCarrinho(false);
    setMostrarAgradecimento(true);
    setShowConfetti(true);
    setTimeout(() => {
      setMostrarAgradecimento(false);
      setShowConfetti(false);
    }, 15000);
  };

  const abrirDetalhes = (produto) => {
    setProdutoSelecionado(produto);
    setCep('');
    setMensagemFrete('');
    setErroCep('');
  };

  const fecharDetalhes = () => setProdutoSelecionado(null);

  const calcularFrete = () => {
    const apenasNumeros = cep.replace(/\D/g, '');
    if (apenasNumeros.length !== 8) {
      setErroCep('O CEP deve conter exatamente 8 dígitos numéricos.');
      setMensagemFrete('');
      return;
    }
    setErroCep('');
    const dias = Math.floor(Math.random() * 10) + 1;
    setMensagemFrete(`Entrega estimada em até ${dias} dias úteis.`);
  };

  if (mostrarLogin) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        {showConfetti && <Confetti />}

        <Header
          carrinho={carrinho}
          onAbrirCarrinho={() => setMostrarCarrinho(true)}
          usuarioLogado={logado}
          nomeUsuario={nome}
          onAbrirDados={() => {
            if (!logado || !nome) {
              setMostrarLogin(true);
            } else {
              setMostrarDados(true);
            }
          }}
          onIrParaLogin={() => setMostrarLogin(true)}
        />

        <main className="flex-grow pt-24 px-6 max-w-6xl mx-auto space-y-12">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <section>
                    <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Produtos em Destaque</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {produtos.map((produto) => (
                        <ProductCard
                          key={produto.id}
                          produto={produto}
                          onVerDetalhes={abrirDetalhes}
                          adicionarAoCarrinho={adicionarAoCarrinho}
                        />
                      ))}
                    </div>
                  </section>
                  <Feedbacks />
                  <Noticias />
                </>
              }
            />
            <Route path="/favoritos" element={<Favoritos />} />
          </Routes>
        </main>

        <Footer />

        {mostrarCarrinho && (
          <CarrinhoModal
            produtos={carrinho || []}
            onFechar={() => setMostrarCarrinho(false)}
            onRemover={removerDoCarrinho}
            onAlterarQtd={alterarQuantidade}
            onFinalizar={finalizarCompra}
          />
        )}

        {produtoSelecionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-md w-full overflow-y-auto max-h-[90vh]">
              <h3 className="text-2xl font-bold mb-4">{produtoSelecionado.nome}</h3>
              <img src={produtoSelecionado.imagem} alt={produtoSelecionado.nome} className="w-full h-48 object-cover rounded mb-4" />
              <p className="text-green-700 font-bold text-xl mb-2">{produtoSelecionado.preco}</p>
              {produtoSelecionado.tamanhos && <p className="mb-2">Tamanhos disponíveis: {produtoSelecionado.tamanhos.join(', ')}</p>}
              {produtoSelecionado.cores && <p className="mb-2">Cores disponíveis: {produtoSelecionado.cores.join(', ')}</p>}

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Calcular Frete (CEP):</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite o CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                    className="border border-gray-300 rounded p-2 w-full"
                    maxLength={8}
                  />
                  <button
                    onClick={calcularFrete}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Calcular
                  </button>
                </div>
                {erroCep && <p className="text-red-600 mt-1 text-sm">{erroCep}</p>}
                {mensagemFrete && <p className="text-green-700 mt-1 text-sm">{mensagemFrete}</p>}
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={() => adicionarAoCarrinho(produtoSelecionado)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Adicionar ao carrinho</button>
                <button onClick={fecharDetalhes} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Voltar</button>
              </div>
            </div>
          </div>
        )}

        {mostrarAvisoLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-green-700">Acesso restrito</h3>
              <p className="text-gray-700 mt-2">Para comprar produtos é necessário fazer login. Pedimos desculpas pela inconveniência.</p>
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setMostrarAvisoLogin(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Continuar navegando</button>
                <button onClick={() => {
                  setMostrarAvisoLogin(false);
                  setMostrarLogin(true);
                }} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Fazer login</button>
              </div>
            </div>
          </div>
        )}

        {mostrarDados && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button onClick={() => setMostrarDados(false)} className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl">×</button>
              <h2 className="text-xl font-bold mb-4 text-green-700">Meus Dados</h2>
              <p><strong>Nome:</strong> {nome}</p>
              <p><strong>Email:</strong> {email}</p>
              <p className="flex items-center">
                <strong>Senha:</strong>
                <span className="ml-2 font-mono">
                  {mostrarSenha ? senha : senha.replace(/./g, '*')}
                </span>
                <button onClick={() => setMostrarSenha(!mostrarSenha)} className="ml-2 text-blue-500 text-sm hover:underline">
                  {mostrarSenha ? 'Ocultar' : 'Mostrar'}
                </button>
              </p>
            </div>
          </div>
        )}

        {mostrarAgradecimento && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center relative">
              <button onClick={() => {
                setMostrarAgradecimento(false);
                setShowConfetti(false);
              }} className="absolute top-2 right-2 text-gray-600 hover:text-black">×</button>
              <h2 className="text-2xl font-bold text-green-700 mb-4">Obrigado pela compra!</h2>
              <p>Em nome da loja <strong>Futebol Club</strong>, agradecemos pela sua preferência. Volte sempre!</p>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

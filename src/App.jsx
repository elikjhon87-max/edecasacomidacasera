import React, { useState } from 'react';
import { 
  ShoppingBag, Utensils, DollarSign, FileText, CheckCircle, 
  Clock, Plus, Trash2, Edit3, Send, ChefHat, Phone, MapPin, 
  CreditCard, ArrowRight, UserCheck, ShieldCheck, Heart, AlertCircle, RefreshCw
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [userRole, setUserRole] = useState('customer'); // 'customer' ou 'admin'
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Telefones oficiais É De Casa (conforme as imagens do panfleto)
  const phonePrimary = "31996647863";
  const phoneSecondary = "31995956952";

  // Estado do Cliente
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    reference: '',
    paymentMethod: 'Pix',
    changeFor: ''
  });

  // Prato e Acompanhamentos do Dia (com base na imagem 2)
  const [selectedSize, setSelectedSize] = useState({ name: 'Marmitex M', price: 18 });
  const [selectedProtein, setSelectedProtein] = useState('Filé de Peito Empanado');
  const [selectedSides, setSelectedSides] = useState([
    'Arroz', 'Feijão Carioca', 'Farofa', 'Moranga Assada', 'Batata Rústica com Bacon', 'Salada'
  ]);
  const [selectedDrinks, setSelectedDrinks] = useState([]);
  const [observation, setObservation] = useState('');

  // Tabela de Preços e Tamanhos
  const sizes = [
    { name: 'Marmitex P', price: 15, desc: 'Ideal para refeição leve' },
    { name: 'Marmitex M', price: 18, desc: 'Tamanho mais pedido' },
    { name: 'Marmitex G', price: 22, desc: 'Bem servida para reforçar' }
  ];

  const proteins = [
    'Filé de Peito Empanado',
    'Bisteca Suína',
    'Mista (Peito Empanado + Bisteca)'
  ];

  const availableSides = [
    'Arroz',
    'Feijão Carioca',
    'Farofa',
    'Moranga Assada',
    'Batata Rústica com Bacon',
    'Salada'
  ];

  const drinksList = [
    { id: 'coca', name: 'Coca-Cola Lata 350ml', price: 6 },
    { id: 'guarana', name: 'Guaraná Antarctica 600ml', price: 8 },
    { id: 'suco', name: 'Suco Natural Laranja 500ml', price: 7 },
    { id: 'agua', name: 'Água Mineral sem Gás 500ml', price: 3 }
  ];

  // Gestão de Pedidos (Simulado para o Admin)
  const [orders, setOrders] = useState([
    {
      id: '#1001',
      customer: 'Carlos Silva',
      phone: '31988887777',
      address: 'Rua das Flores, 123 - Centro',
      items: 'Marmitex M (Bisteca Suína) + Coca Lata',
      total: 24,
      payment: 'Pix',
      status: 'Em Preparação',
      time: '11:45'
    },
    {
      id: '#1002',
      customer: 'Ana Paula',
      phone: '31977776666',
      address: 'Av. Brasil, 450 - Apt 201',
      items: 'Marmitex G (Peito Empanado)',
      total: 22,
      payment: 'Cartão',
      status: 'Saiu para Entrega',
      time: '12:05'
    }
  ]);

  // Gestão Financeira (Admin)
  const [expenses, setExpenses] = useState([
    { id: 1, desc: 'Embalagens Marmitex', cat: 'Embalagens', val: 120 },
    { id: 2, desc: 'Carnes e Hortifrúti', cat: 'Insumos', val: 350 },
    { id: 3, desc: 'Gás de Cozinha', cat: 'Fixo', val: 110 }
  ]);

  const [newExpDesc, setNewExpDesc] = useState('');
  const [newExpVal, setNewExpVal] = useState('');
  const [newExpCat, setNewExpCat] = useState('Insumos');

  // Alternar Acompanhamentos
  const toggleSide = (side) => {
    if (selectedSides.includes(side)) {
      setSelectedSides(selectedSides.filter(s => s !== side));
    } else {
      setSelectedSides([...selectedSides, side]);
    }
  };

  // Alternar Bebidas
  const toggleDrink = (drink) => {
    if (selectedDrinks.some(d => d.id === drink.id)) {
      setSelectedDrinks(selectedDrinks.filter(d => d.id !== drink.id));
    } else {
      setSelectedDrinks([...selectedDrinks, drink]);
    }
  };

  // Cálculo do Total do Pedido Atual
  const totalDrinks = selectedDrinks.reduce((sum, d) => sum + d.price, 0);
  const orderTotal = selectedSize.price + totalDrinks;

  // Login de Admin
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === '1234' || adminPassword === 'edecasa') {
      setAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Senha incorreta. Use: 1234 ou edecasa');
    }
  };

  // Enviar Pedido via WhatsApp
  const handleSendOrderWhatsApp = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Por favor, preencha seu Nome, Telefone e Endereço de entrega!');
      return;
    }

    const drinksText = selectedDrinks.length > 0 
      ? selectedDrinks.map(d => `• ${d.name} (R$ ${d.price.toFixed(2)})`).join('\n') 
      : 'Nenhuma bebida';

    const message = `*NOVO PEDIDO - É DE CASA MARMITEX* 🍱\n\n` +
      `*Cliente:* ${customerInfo.name}\n` +
      `*Telefone:* ${customerInfo.phone}\n` +
      `*Endereço:* ${customerInfo.address}\n` +
      `*Ref:* ${customerInfo.reference || 'Não informada'}\n\n` +
      `*--- DETALHES DO PEDIDO ---*\n` +
      `• *Tamanho:* ${selectedSize.name} (R$ ${selectedSize.price.toFixed(2)})\n` +
      `• *Opção de Carne:* ${selectedProtein}\n` +
      `• *Acompanhamentos:* ${selectedSides.join(', ')}\n` +
      `• *Bebidas:*\n${drinksText}\n` +
      `• *Obs:* ${observation || 'Nenhuma'}\n\n` +
      `*--- PAGAMENTO ---*\n` +
      `• *Forma:* ${customerInfo.paymentMethod}\n` +
      (customerInfo.paymentMethod === 'Dinheiro' && customerInfo.changeFor ? `• *Troco para:* R$ ${customerInfo.changeFor}\n` : '') +
      `\n*TOTAL:* R$ ${orderTotal.toFixed(2)}\n\n` +
      `_Qualidade, sabor e muito carinho em cada marmita!_ ❤️`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/55${phonePrimary}?text=${encodedMsg}`, '_blank');

    // Registrar o pedido na lista
    const newOrderObj = {
      id: `#${1000 + orders.length + 1}`,
      customer: customerInfo.name,
      phone: customerInfo.phone,
      address: customerInfo.address,
      items: `${selectedSize.name} (${selectedProtein})`,
      total: orderTotal,
      payment: customerInfo.paymentMethod,
      status: 'Pendente',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setOrders([newOrderObj, ...orders]);
    setActiveTab('my-order');
  };

  // Adicionar Gasto (Admin)
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpDesc || !newExpVal) return;
    setExpenses([
      ...expenses, 
      { id: Date.now(), desc: newExpDesc, val: parseFloat(newExpVal), cat: newExpCat }
    ]);
    setNewExpDesc('');
    setNewExpVal('');
  };

  // Totais Financeiros
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.val, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans pb-20">
      
      {/* CABEÇALHO DA LOJA */}
      <header className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-neutral-950 p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-neutral-950 text-amber-400 p-2.5 rounded-full shadow-md border border-amber-300">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight leading-none text-neutral-950">
                É DE CASA
              </h1>
              <p className="text-xs font-bold tracking-wide uppercase text-neutral-900 opacity-90">
                Marmitex e Comida Caseira
              </p>
            </div>
          </div>

          {/* Selector de Perfil (Cliente / Admin) */}
          <button 
            onClick={() => setUserRole(userRole === 'customer' ? 'admin' : 'customer')}
            className="bg-neutral-950/90 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-400/30 flex items-center space-x-1"
          >
            {userRole === 'customer' ? (
              <>
                <UserCheck className="w-3.5 h-3.5" />
                <span>Cliente</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modo Gestor</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-xl mx-auto p-4 space-y-6">

        {/* CONTROLE MODO CLIENTE */}
        {userRole === 'customer' && (
          <>
            {/* NAVEGAÇÃO DE ABAS CLIENTE */}
            <div className="flex bg-neutral-800 p-1 rounded-xl border border-neutral-700">
              <button 
                onClick={() => setActiveTab('menu')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'menu' ? 'bg-amber-500 text-neutral-950 shadow-md' : 'text-neutral-400'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Cardápio do Dia</span>
              </button>
              <button 
                onClick={() => setActiveTab('checkout')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'checkout' ? 'bg-amber-500 text-neutral-950 shadow-md' : 'text-neutral-400'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Fazer Pedido</span>
              </button>
              <button 
                onClick={() => setActiveTab('my-order')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'my-order' ? 'bg-amber-500 text-neutral-950 shadow-md' : 'text-neutral-400'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Acompanhar</span>
              </button>
            </div>

            {/* ABA 1: CARDÁPIO DO DIA */}
            {activeTab === 'menu' && (
              <div className="space-y-5">
                {/* Banner de Boas Vindas */}
                <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/30 p-4 rounded-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="bg-amber-500 text-neutral-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                      TEM HOJE 🍲
                    </span>
                    <h2 className="text-lg font-bold text-amber-400 mt-1">Sabor caseiro de verdade no seu dia a dia</h2>
                    <p className="text-xs text-neutral-300 mt-1">
                      Qualidade, sabor e muito carinho em cada marmita! Façam seus pedidos antecipados.
                    </p>
                  </div>
                </div>

                {/* PASSO 1: Selecionar Tamanho */}
                <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2">
                    <span className="bg-amber-500 text-neutral-950 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">1</span>
                    <span>Escolha o Tamanho da Marmitex</span>
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSize(s)}
                        className={`p-3 rounded-xl border text-left transition-all relative ${
                          selectedSize.name === s.name
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-neutral-900/60 border-neutral-700/60 text-neutral-300'
                        }`}
                      >
                        <div className="font-bold text-sm">{s.name}</div>
                        <div className="text-xs font-semibold text-amber-400 mt-1">R$ {s.price.toFixed(2)}</div>
                        <div className="text-[10px] text-neutral-400 mt-1 leading-tight">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* PASSO 2: Selecionar Proteína */}
                <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2">
                    <span className="bg-amber-500 text-neutral-950 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">2</span>
                    <span>Opção de Carne / Prato Principal</span>
                  </h3>

                  <div className="space-y-2">
                    {proteins.map((prot) => (
                      <button
                        key={prot}
                        onClick={() => setSelectedProtein(prot)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-semibold transition-all ${
                          selectedProtein === prot
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-neutral-900/60 border-neutral-700/60 text-neutral-300'
                        }`}
                      >
                        <span>{prot}</span>
                        {selectedProtein === prot && <CheckCircle className="w-4 h-4 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PASSO 3: Acompanhamentos do Dia */}
                <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2">
                      <span className="bg-amber-500 text-neutral-950 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">3</span>
                      <span>Acompanhamentos (Monte seu Prato)</span>
                    </h3>
                    <span className="text-[10px] text-neutral-400">Toque para retirar</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {availableSides.map((side) => {
                      const isIncluded = selectedSides.includes(side);
                      return (
                        <button
                          key={side}
                          onClick={() => toggleSide(side)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                            isIncluded
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                              : 'bg-neutral-900/40 border-neutral-800 text-neutral-500 line-through'
                          }`}
                        >
                          <span>{side}</span>
                          {isIncluded && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PASSO 4: Bebidas */}
                <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2">
                    <span className="bg-amber-500 text-neutral-950 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black">4</span>
                    <span>Adicionar Bebida (Opcional)</span>
                  </h3>

                  <div className="space-y-2">
                    {drinksList.map((drink) => {
                      const isSelected = selectedDrinks.some(d => d.id === drink.id);
                      return (
                        <button
                          key={drink.id}
                          onClick={() => toggleDrink(drink)}
                          className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                              : 'bg-neutral-900/60 border-neutral-700/60 text-neutral-300'
                          }`}
                        >
                          <span>{drink.name}</span>
                          <span className="font-bold text-amber-400">+ R$ {drink.price.toFixed(2)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Botão Avançar para Pedido */}
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 font-extrabold py-3.5 rounded-2xl shadow-lg flex items-center justify-center space-x-2 hover:opacity-95 active:scale-[0.99] transition-all"
                >
                  <span>Avançar para Dados de Entrega</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* ABA 2: CHECKOUT / DADOS DO CLIENTE */}
            {activeTab === 'checkout' && (
              <div className="space-y-5">
                {/* Resumo da Marmita */}
                <div className="bg-neutral-800 border border-amber-500/30 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                    <span className="font-bold text-sm text-amber-400">Resumo do Seu Pedido</span>
                    <span className="font-extrabold text-base text-amber-400">R$ {orderTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-xs space-y-1 text-neutral-300 pt-1">
                    <p><strong className="text-neutral-100">Tamanho:</strong> {selectedSize.name}</p>
                    <p><strong className="text-neutral-100">Carne:</strong> {selectedProtein}</p>
                    <p><strong className="text-neutral-100">Acompanhamentos:</strong> {selectedSides.join(', ')}</p>
                    {selectedDrinks.length > 0 && (
                      <p><strong className="text-neutral-100">Bebidas:</strong> {selectedDrinks.map(d => d.name).join(', ')}</p>
                    )}
                  </div>
                </div>

                {/* Form de Dados do Cliente */}
                <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Dados de Entrega</span>
                  </h3>

                  <div>
                    <label className="text-[11px] text-neutral-400 font-medium block mb-1">Seu Nome Completo *</label>
                    <input 
                      type="text"
                      placeholder="Ex: Maria Oliveira"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 font-medium block mb-1">Seu WhatsApp (DDD + Número) *</label>
                    <input 
                      type="tel"
                      placeholder="Ex: 31999998888"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 font-medium block mb-1">Endereço Completo de Entrega *</label>
                    <input 
                      type="text"
                      placeholder="Rua, Número, Bairro"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 font-medium block mb-1">Ponto de Referência</label>
                    <input 
                      type="text"
                      placeholder="Ex: Próximo à padaria / Empresa X"
                      value={customerInfo.reference}
                      onChange={(e) => setCustomerInfo({...customerInfo, reference: e.target.value})}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2.5 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 font-medium block mb-1">Observações do Prato</label>
                    <textarea 
                      placeholder="Ex: Caprichar no molho / Feijão por baixo"
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500 h-16 resize-none"
                    />
                  </div>
                </div>

                {/* Forma de Pagamento */}
                <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Forma de Pagamento</span>
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    {['Pix', 'Cartão', 'Dinheiro'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setCustomerInfo({...customerInfo, paymentMethod: method})}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                          customerInfo.paymentMethod === method
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-neutral-900/60 border-neutral-700 text-neutral-400'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {customerInfo.paymentMethod === 'Dinheiro' && (
                    <div>
                      <label className="text-[11px] text-neutral-400 font-medium block mb-1">Precisa de troco para quanto?</label>
                      <input 
                        type="text"
                        placeholder="Ex: R$ 50,00"
                        value={customerInfo.changeFor}
                        onChange={(e) => setCustomerInfo({...customerInfo, changeFor: e.target.value})}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* Botão Finalizar no WhatsApp */}
                <button
                  onClick={handleSendOrderWhatsApp}
                  className="w-full bg-emerald-500 text-neutral-950 font-extrabold py-3.5 rounded-2xl shadow-lg flex items-center justify-center space-x-2 hover:bg-emerald-400 active:scale-[0.99] transition-all"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar Pedido pelo WhatsApp</span>
                </button>
              </div>
            )}

            {/* ABA 3: ACOMPANHAMENTO DO PEDIDO */}
            {activeTab === 'my-order' && (
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-amber-400">Seus Pedidos Recentes</h3>
                
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-neutral-800 border border-neutral-700 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                      <div>
                        <span className="font-extrabold text-sm text-amber-400">{ord.id}</span>
                        <span className="text-[10px] text-neutral-400 block">{ord.time}</span>
                      </div>
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 space-y-1">
                      <p><strong className="text-neutral-100">Itens:</strong> {ord.items}</p>
                      <p><strong className="text-neutral-100">Total:</strong> R$ {ord.total.toFixed(2)} ({ord.payment})</p>
                    </div>

                    {/* Barra de Progresso */}
                    <div className="bg-neutral-900 p-2.5 rounded-xl border border-neutral-700/50 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-neutral-400">
                        <span className={ord.status === 'Pendente' ? 'text-amber-400' : ''}>Pendente</span>
                        <span className={ord.status === 'Em Preparação' ? 'text-amber-400' : ''}>Preparo</span>
                        <span className={ord.status === 'Saiu para Entrega' ? 'text-amber-400' : ''}>Entrega</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-500"
                          style={{
                            width: ord.status === 'Pendente' ? '33%' : ord.status === 'Em Preparação' ? '66%' : '100%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CONTROLE MODO GESTOR / ADMIN */}
        {userRole === 'admin' && (
          <div className="space-y-5">
            {!adminLoggedIn ? (
              /* Tela de Login Admin */
              <div className="bg-neutral-800 border border-neutral-700 p-5 rounded-2xl space-y-4 max-w-sm mx-auto my-8">
                <div className="text-center space-y-1">
                  <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto" />
                  <h2 className="font-bold text-base text-neutral-100">Painel do Gestor</h2>
                  <p className="text-xs text-neutral-400">Acesso restrito para a equipe É De Casa</p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <div>
                    <label className="text-xs text-neutral-400 font-medium block mb-1">Senha de Acesso</label>
                    <input 
                      type="password"
                      placeholder="Digite a senha (1234 ou edecasa)"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {adminError && <p className="text-[11px] text-red-400">{adminError}</p>}

                  <button
                    type="submit"
                    className="w-full bg-amber-500 text-neutral-950 font-bold py-2.5 rounded-xl text-xs hover:bg-amber-400 transition-all"
                  >
                    Entrar no Painel
                  </button>
                </form>
              </div>
            ) : (
              /* Painel Admin Completo */
              <div className="space-y-5">
                {/* Cabeçalho Admin */}
                <div className="flex items-center justify-between bg-neutral-800 p-3 rounded-xl border border-neutral-700">
                  <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Painel Administrativo Ativo</span>
                  </span>
                  <button 
                    onClick={() => setAdminLoggedIn(false)}
                    className="text-[11px] text-neutral-400 hover:text-neutral-200 underline"
                  >
                    Sair
                  </button>
                </div>

                {/* Dashboard Financeiro */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-xl">
                    <span className="text-[10px] text-neutral-400 block">Vendas Hoje</span>
                    <span className="font-extrabold text-sm text-emerald-400">R$ {totalRevenue.toFixed(2)}</span>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-xl">
                    <span className="text-[10px] text-neutral-400 block">Gastos</span>
                    <span className="font-extrabold text-sm text-rose-400">R$ {totalExpenses.toFixed(2)}</span>
                  </div>
                  <div className="bg-neutral-800 border border-neutral-700 p-3 rounded-xl">
                    <span className="text-[10px] text-neutral-400 block">Lucro Líquido</span>
                    <span className={`font-extrabold text-sm ${netProfit >= 0 ? 'text-amber-400' : 'text-rose-500'}`}>
                      R$ {netProfit.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Gerenciamento de Pedidos Entrados */}
                <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-xs text-amber-400 uppercase tracking-wider">
                    Gerenciar Pedidos do Dia ({orders.length})
                  </h3>

                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div key={ord.id} className="bg-neutral-900 border border-neutral-700/80 p-3 rounded-xl space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-xs text-amber-400">{ord.id} - {ord.customer}</span>
                            <p className="text-[11px] text-neutral-400">{ord.phone} | {ord.address}</p>
                          </div>
                          <span className="text-xs font-extrabold text-emerald-400">R$ {ord.total.toFixed(2)}</span>
                        </div>

                        <p className="text-xs text-neutral-300">{ord.items}</p>

                        <div className="flex items-center space-x-2 pt-1">
                          <label className="text-[10px] text-neutral-400">Mudar Status:</label>
                          <select
                            value={ord.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              setOrders(orders.map(o => o.id === ord.id ? { ...o, status: newStatus } : o));
                            }}
                            className="bg-neutral-800 border border-neutral-700 text-xs text-amber-300 rounded px-2 py-1 focus:outline-none"
                          >
                            <option value="Pendente">Pendente</option>
                            <option value="Em Preparação">Em Preparação</option>
                            <option value="Saiu para Entrega">Saiu para Entrega</option>
                            <option value="Entregue">Entregue</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Registro de Gastos */}
                <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-xs text-amber-400 uppercase tracking-wider">
                    Lançar Despesa / Custo
                  </h3>

                  <form onSubmit={handleAddExpense} className="space-y-2">
                    <input 
                      type="text"
                      placeholder="Descrição (Ex: Compras de Verduras)"
                      value={newExpDesc}
                      onChange={(e) => setNewExpDesc(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-100"
                    />
                    <div className="flex space-x-2">
                      <input 
                        type="number"
                        placeholder="Valor (R$)"
                        value={newExpVal}
                        onChange={(e) => setNewExpVal(e.target.value)}
                        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-100"
                      />
                      <select
                        value={newExpCat}
                        onChange={(e) => setNewExpCat(e.target.value)}
                        className="bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 rounded-xl px-2"
                      >
                        <option value="Insumos">Insumos</option>
                        <option value="Embalagens">Embalagens</option>
                        <option value="Fixo">Fixo</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-bold py-2 rounded-xl hover:bg-rose-500/30"
                    >
                      Salvar Gastos
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RODAPÉ INFORMATIVO */}
        <footer className="text-center pt-4 border-t border-neutral-800 space-y-1">
          <p className="text-xs font-bold text-amber-400">É DE CASA - MARMITEX E COMIDA CASEIRA</p>
          <p className="text-[10px] text-neutral-400">Atendimento Rápido e Delivery: (31) 99664-7863 / (31) 99595-6952</p>
        </footer>

      </div>
    </div>
  );
}

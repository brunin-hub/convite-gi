// script.js – toda a mágica interativa

document.addEventListener('DOMContentLoaded', () => {
  // --- Elementos ---
  const cardContainer = document.getElementById('cardContainer');
  const telaConfirmacao = document.getElementById('telaConfirmacao');
  const btnSim = document.getElementById('btnSim');
  const btnNao = document.getElementById('btnNao');
  const floatingContainer = document.getElementById('floatingElements');
  const frasesContainer = document.getElementById('frasesContainer');

  // --- Frases românticas ---
  const frases = [
    '❤️ Você é meu lugar favorito.',
    '❤️ Cada momento ao seu lado vale a pena.',
    '❤️ O melhor passeio é qualquer um ao seu lado.',
    '❤️ Espero que esse seja apenas um dos muitos momentos incríveis que ainda vamos viver juntos.',
    '❤️ Seu sorriso ilumina meus dias.',
    '❤️ Você é a melhor parte de todos os meus planos.',
    '❤️ Cada dia ao seu lado é um presente.',
    '❤️ O amor é a coisa mais linda que existe.'
  ];

  // Exibe uma frase aleatória a cada 8 segundos
  function atualizarFrase() {
    if (!frasesContainer) return;
    const idx = Math.floor(Math.random() * frases.length);
    frasesContainer.textContent = frases[idx];
  }
  atualizarFrase();
  setInterval(atualizarFrase, 8000);

  // --- Elementos flutuantes: corações e partículas ---
  function criarElementosFlutuantes() {
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      const isHeart = i % 3 !== 0;
      el.className = isHeart ? 'heart-particle' : 'sparkle-particle';
      el.textContent = isHeart ? '❤️' : '✦';
      if (!isHeart) el.textContent = ['✦', '✧', '⋆'][i % 3];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.fontSize = (isHeart ? 1.4 + Math.random() * 1.6 : 0.8 + Math.random() * 1.2) + 'rem';
      el.style.animationDuration = (10 + Math.random() * 20) + 's';
      el.style.animationDelay = (Math.random() * 12) + 's';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      floatingContainer.appendChild(el);
    }
  }
  criarElementosFlutuantes();

  // --- Botão NÃO (fujão) ---
  function moverBotaoNao() {
    const btn = btnNao;
    if (!btn) return;
    const btnRect = btn.getBoundingClientRect();
    // margem de segurança
    const margin = 20;
    const maxX = window.innerWidth - btnRect.width - margin;
    const maxY = window.innerHeight - btnRect.height - margin - 30;
    const minX = margin;
    const minY = margin + 40;

    let x = Math.random() * (maxX - minX) + minX;
    let y = Math.random() * (maxY - minY) + minY;
    // não sair da área visível (viewport)
    x = Math.min(Math.max(x, 0), window.innerWidth - btnRect.width);
    y = Math.min(Math.max(y, 0), window.innerHeight - btnRect.height - 20);

    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.transition = 'left 0.25s cubic-bezier(0.23, 1, 0.32, 1), top 0.25s cubic-bezier(0.23, 1, 0.32, 1)';
  }

  // Eventos para fugir
  function iniciarFuga() {
    moverBotaoNao();
  }

  // Mouse
  btnNao.addEventListener('mouseenter', (e) => {
    e.stopPropagation();
    iniciarFuga();
  });
  // Mobile: touchstart / touchmove
  btnNao.addEventListener('touchstart', (e) => {
    e.preventDefault();
    iniciarFuga();
  });
  btnNao.addEventListener('touchmove', (e) => {
    e.preventDefault();
    iniciarFuga();
  });

  // também foge se o mouse se aproximar (mover sobre ele)
  document.addEventListener('mousemove', (e) => {
    if (!btnNao) return;
    const rect = btnNao.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < 90) {
      iniciarFuga();
    }
  });

  // --- Botão SIM: ativa confetes, corações e tela de confirmação ---
  btnSim.addEventListener('click', () => {
    // esconde cartão com animação
    cardContainer.style.transition = 'opacity 0.5s ease, transform 0.6s ease';
    cardContainer.style.opacity = '0';
    cardContainer.style.transform = 'scale(0.8) rotateY(10deg)';
    setTimeout(() => {
      cardContainer.classList.add('hidden');
    }, 600);

    // mostrar tela de confirmação
    telaConfirmacao.classList.remove('hidden');

    // chuva de confetes e corações
    for (let i = 0; i < 100; i++) {
      setTimeout(() => criarConfete(), i * 25);
    }
    for (let i = 0; i < 45; i++) {
      setTimeout(() => criarCoracaoChuva(), i * 70 + 200);
    }

    // inicia contador regressivo
    iniciarContador();

    // pequeno brilho extra
    const span = document.querySelector('.confirm-card');
    if (span) {
      span.style.boxShadow = '0 0 80px rgba(255, 215, 0, 0.5), 0 0 160px rgba(255, 100, 100, 0.3)';
    }
  });

  // --- Confetes ---
  function criarConfete() {
    const cores = ['#ff6b6b', '#ffb347', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6fb7', '#ffb8b8', '#ff1493', '#ff69b4'];
    const confete = document.createElement('div');
    confete.className = 'confetti';
    confete.style.left = Math.random() * 100 + '%';
    confete.style.top = '-10px';
    confete.style.background = cores[Math.floor(Math.random() * cores.length)];
    confete.style.width = (6 + Math.random() * 10) + 'px';
    confete.style.height = (6 + Math.random() * 10) + 'px';
    confete.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    confete.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
    confete.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confete);
    setTimeout(() => confete.remove(), 5000);
  }

  function criarCoracaoChuva() {
    const cor = document.createElement('div');
    cor.className = 'heart-rain';
    cor.textContent = ['❤️', '💕', '💗', '💖', '🌸', '✨', '💝'][Math.floor(Math.random() * 7)];
    cor.style.left = Math.random() * 100 + '%';
    cor.style.fontSize = (1.4 + Math.random() * 2.2) + 'rem';
    cor.style.animationDuration = (3.5 + Math.random() * 2) + 's';
    document.body.appendChild(cor);
    setTimeout(() => cor.remove(), 6000);
  }

  // --- Contador regressivo para 01 de agosto ---
  function iniciarContador() {
    const alvo = new Date('2026-08-01T00:00:00-03:00').getTime();
    function atualizar() {
      const agora = Date.now();
      let diff = alvo - agora;
      if (diff < 0) diff = 0;
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);
      document.getElementById('dias').textContent = String(dias).padStart(2, '0');
      document.getElementById('horas').textContent = String(horas).padStart(2, '0');
      document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
      document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
    }
    atualizar();
    setInterval(atualizar, 1000);
  }

  // garantir que o botão NÃO não seja clicável
  btnNao.addEventListener('click', (e) => {
    e.preventDefault();
    iniciarFuga();
  });

  // ajustar posição do botão NÃO em redimensionamento
  window.addEventListener('resize', () => {
    if (btnNao && !btnNao.classList.contains('hidden')) {
      if (btnNao.style.position === 'fixed') {
        const rect = btnNao.getBoundingClientRect();
        if (rect.left + rect.width > window.innerWidth || rect.top + rect.height > window.innerHeight) {
          moverBotaoNao();
        }
      }
    }
  });

  // esconder tela confirmação ao carregar
  telaConfirmacao.classList.add('hidden');

  console.log('💖 Convite especial carregado com amor!');
});
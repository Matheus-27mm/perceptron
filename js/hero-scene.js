/**
 * PERCEPTRON — Engine de Grafo de Engenharia do Hero
 * Desenha o fluxo lógico de inputs -> cérebro central -> outputs alinhado ao mockup.
 */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  const dpr = window.devicePixelRatio || 1;

  // Configurações estéticas (Branding Perceptron)
  const CONFIG = {
    bgColor: '#090909',
    accentColor: '#7c3aed', // Indigo
    accentSoft: 'rgba(124, 58, 237, 0.45)',
    tealColor: '#a78bfa',   // Roxo claro (saídas)
    lineColor: 'rgba(255, 255, 255, 0.04)',
    lineActiveColor: 'rgba(124, 58, 237, 0.15)',
    pulseSpeed: 0.006
  };

  let nodes = {};
  let pulses = [];
  let logoNodes = [];

  // Ajusta o tamanho do canvas
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initSystem();
  }

  // Definição da Classe Node (Nós do Grafo)
  class Node {
    constructor(x, y, r, isLogo = false, logoId = null, overlayId = null) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.isLogo = isLogo;
      this.logoId = logoId;
      this.overlayId = overlayId;
      this.glow = 0; // Fator de brilho residual (0 a 1)
    }

    update() {
      // Decaimento suave do brilho
      if (this.glow > 0) {
        this.glow -= 0.025;
      } else {
        this.glow = 0;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r + (this.glow * 2.5), 0, Math.PI * 2);

      if (this.isLogo) {
        // Nós do logotipo central acendem
        ctx.fillStyle = CONFIG.accentColor;
        ctx.shadowColor = CONFIG.accentColor;
        ctx.shadowBlur = 8 + (this.glow * 14);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Anel externo sutil
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.2 + this.glow * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        // Nós externos comuns
        const alpha = 0.25 + (this.glow * 0.75);
        ctx.fillStyle = this.overlayId && this.overlayId.includes('Right') 
          ? `rgba(167, 139, 250, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        
        if (this.glow > 0) {
          ctx.shadowColor = this.overlayId && this.overlayId.includes('Right') ? CONFIG.tealColor : '#ffffff';
          ctx.shadowBlur = 10 * this.glow;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }
  }

  // Classe Pulse (Pacote de dados percorrendo a rede)
  class Pulse {
    constructor(pathNodes, isTeal = false) {
      this.path = pathNodes; // Array de nós a percorrer
      this.currentIndex = 0;
      this.progress = 0;
      this.speed = CONFIG.pulseSpeed * (0.85 + Math.random() * 0.3);
      this.isTeal = isTeal;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.progress = 0;
        this.currentIndex++;

        // Ativa brilho do nó alcançado
        const reachedNode = this.path[this.currentIndex];
        if (reachedNode) {
          reachedNode.glow = 1.0;
          if (reachedNode.overlayId) {
            highlightOverlay(reachedNode.overlayId, 1000);
          }
        }

        // Se terminou o trajeto, remove
        if (this.currentIndex >= this.path.length - 1) {
          return false;
        }
      }
      return true;
    }

    draw() {
      const fromNode = this.path[this.currentIndex];
      const toNode = this.path[this.currentIndex + 1];
      if (!fromNode || !toNode) return;

      const px = fromNode.x + (toNode.x - fromNode.x) * this.progress;
      const py = fromNode.y + (toNode.y - fromNode.y) * this.progress;

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = this.isTeal ? CONFIG.tealColor : '#ffffff';
      ctx.shadowColor = this.isTeal ? CONFIG.tealColor : CONFIG.accentColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  // Dicionário simples para reter referências dos overlays ativos
  const activeTimeouts = {};

  function highlightOverlay(id, duration) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.add('active');

    // Limpa timeout pendente para evitar flickers
    if (activeTimeouts[id]) {
      clearTimeout(activeTimeouts[id]);
    }

    activeTimeouts[id] = setTimeout(() => {
      el.classList.remove('active');
      delete activeTimeouts[id];
    }, duration);
  }

  // Inicializa a malha e as coordenadas
  function initSystem() {
    nodes = {};
    pulses = [];

    // Coordenadas centrais da logo
    const cx = width * 0.5;
    const cy = height * 0.5;
    const logoScale = width > 768 ? 40 : 30;

    // 1. Criar nós da logo da Perceptron
    nodes.logo_t = new Node(cx - logoScale, cy - logoScale, 5, true, 't');
    nodes.logo_m = new Node(cx - logoScale, cy, 5, true, 'm');
    nodes.logo_b = new Node(cx - logoScale, cy + logoScale, 5, true, 'b');
    nodes.logo_out = new Node(cx + logoScale, cy, 8, true, 'out');

    logoNodes = [nodes.logo_t, nodes.logo_m, nodes.logo_b, nodes.logo_out];

    // 2. Criar nós externos (posições relativas das labels HTML)
    // Inputs (esquerda)
    nodes.left_top = new Node(width * 0.12, height * 0.16, 4, false, null, 'labelLeftTop');
    nodes.left_mid = new Node(width * 0.08, height * 0.50, 4, false, null, 'labelLeftMid');
    nodes.left_bot = new Node(width * 0.12, height * 0.84, 4, false, null, 'labelLeftBot');

    // Outputs (direita)
    nodes.right_top = new Node(width * 0.88, height * 0.16, 4, false, null, 'labelRightTop');
    nodes.right_mid = new Node(width * 0.92, height * 0.50, 4, false, null, 'labelRightMid');
    nodes.right_bot = new Node(width * 0.88, height * 0.84, 4, false, null, 'labelRightBot');
  }

  // Dispara pacotes de dados
  function triggerFlow(lane) {
    if (!nodes.left_top) return;

    if (lane === 0) {
      pulses.push(new Pulse([nodes.left_top, nodes.logo_t, nodes.logo_out, nodes.right_top], false));
      highlightOverlay('labelLeftTop', 1200);
      nodes.left_top.glow = 1.0;
    } else if (lane === 1) {
      pulses.push(new Pulse([nodes.left_mid, nodes.logo_m, nodes.logo_out, nodes.right_mid], false));
      highlightOverlay('labelLeftMid', 1200);
      nodes.left_mid.glow = 1.0;
    } else if (lane === 2) {
      pulses.push(new Pulse([nodes.left_bot, nodes.logo_b, nodes.logo_out, nodes.right_bot], false));
      highlightOverlay('labelLeftBot', 1200);
      nodes.left_bot.glow = 1.0;
    }
  }

  // Loop inteligente de disparo
  let lastTrigger = 0;
  function schedulePulses() {
    const now = Date.now();
    if (now - lastTrigger > 1800) {
      // Dispara um fluxo randômico
      const lane = Math.floor(Math.random() * 3);
      triggerFlow(lane);
      lastTrigger = now;
    }
  }

  // Loop de renderização principal
  function loop() {
    ctx.clearRect(0, 0, width, height);

    schedulePulses();

    // 1. Desenhar conexões de barramento lógicos
    ctx.lineWidth = 1;
    ctx.strokeStyle = CONFIG.lineColor;

    const paths = [
      [nodes.left_top, nodes.logo_t],
      [nodes.left_mid, nodes.logo_m],
      [nodes.left_bot, nodes.logo_b],
      [nodes.logo_t, nodes.logo_out],
      [nodes.logo_m, nodes.logo_out],
      [nodes.logo_b, nodes.logo_out],
      [nodes.logo_out, nodes.right_top],
      [nodes.logo_out, nodes.right_mid],
      [nodes.logo_out, nodes.right_bot]
    ];

    paths.forEach(p => {
      if (p[0] && p[1]) {
        ctx.beginPath();
        ctx.moveTo(p[0].x, p[0].y);
        ctx.lineTo(p[1].x, p[1].y);
        ctx.stroke();
      }
    });

    // 2. Atualizar e desenhar os nós
    Object.keys(nodes).forEach(key => {
      const node = nodes[key];
      node.update();
      node.draw();
    });

    // 3. Atualizar e desenhar os pulsos
    pulses = pulses.filter(p => {
      const active = p.update();
      if (active) p.draw();
      return active;
    });

    if (running) rafId = requestAnimationFrame(loop);
    else rafId = null;
  }

  // estado de execução — pausa fora da tela e respeita movimento reduzido
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var running = false;
  var rafId = null;

  // desenha o grafo parado (linhas + nós), sem pulsos
  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = CONFIG.lineColor;
    [
      [nodes.left_top, nodes.logo_t], [nodes.left_mid, nodes.logo_m], [nodes.left_bot, nodes.logo_b],
      [nodes.logo_t, nodes.logo_out], [nodes.logo_m, nodes.logo_out], [nodes.logo_b, nodes.logo_out],
      [nodes.logo_out, nodes.right_top], [nodes.logo_out, nodes.right_mid], [nodes.logo_out, nodes.right_bot]
    ].forEach(function (p) {
      if (p[0] && p[1]) { ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y); ctx.lineTo(p[1].x, p[1].y); ctx.stroke(); }
    });
    Object.keys(nodes).forEach(function (k) { nodes[k].draw(); });
  }

  function start() {
    if (reduced || running) return;
    running = true;
    if (rafId == null) rafId = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  window.addEventListener('resize', function () {
    resize();
    if (reduced) drawStatic();
  });

  resize();

  if (reduced) {
    drawStatic();
  } else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.05 }).observe(canvas);
  } else {
    start();
  }
})();

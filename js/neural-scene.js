/* ============================================================
   PERCEPTRON — cena 3D de rede neural (canvas 2D, projeção própria)
   A câmera atravessa as camadas da rede conforme o scroll da página.
   Mouse → paralaxe de rotação. Pulsos viajam pelas sinapses.
   API global: window.NEURAL = { setColor, setIntensity, setDensity }
   ============================================================ */
(function () {
  'use strict';

  var canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- config ---------- */
  var LAYERS = 9;          // camadas ao longo de Z
  var SPACING = 260;       // distância entre camadas
  var FOV = 520;
  var NEAR = 26;
  var nodesPerLayer = 15;  // ajustável via tweak (densidade)
  var intensity = 1;       // ajustável via tweak

  var accent = { r: 130, g: 87, b: 229 };   // #8257e5
  var accentSoft = { r: 182, g: 156, b: 255 };

  var DPR = Math.min(window.devicePixelRatio || 1, 1.75);
  var W = 0, H = 0, CX = 0, CY = 0;

  /* ---------- estado da câmera ---------- */
  var camZ = -650, camZTarget = -650;
  var camY = 0;
  var mouseX = 0, mouseY = 0;          // -1..1
  var rotX = 0, rotY = 0;              // suavizados
  var time = 0;
  var running = true;

  /* ---------- rede ---------- */
  var nodes = [], edges = [], pulses = [], adjacency = [];
  var DEPTH = (LAYERS - 1) * SPACING;

  function rand(a, b) { return a + Math.random() * (b - a); }

  function buildNetwork() {
    nodes = []; edges = []; pulses = []; adjacency = [];
    for (var l = 0; l < LAYERS; l++) {
      for (var i = 0; i < nodesPerLayer; i++) {
        // anel com jitter — centro fica mais livre para o texto
        var ang = (i / nodesPerLayer) * Math.PI * 2 + rand(-0.4, 0.4) + l * 0.7;
        var rad = rand(190, 560);
        nodes.push({
          x: Math.cos(ang) * rad,
          y: Math.sin(ang) * rad * 0.72,
          z: l * SPACING + rand(-70, 70),
          r: rand(1.4, 3.2),
          tw: rand(0, Math.PI * 2),     // fase do brilho
          layer: l
        });
      }
    }
    // arestas: cada nó liga aos 2 mais próximos da camada seguinte
    for (var a = 0; a < nodes.length; a++) {
      var na = nodes[a];
      if (na.layer >= LAYERS - 1) { adjacency.push([]); continue; }
      var candidates = [];
      for (var b = 0; b < nodes.length; b++) {
        if (nodes[b].layer !== na.layer + 1) continue;
        var dx = nodes[b].x - na.x, dy = nodes[b].y - na.y;
        candidates.push({ idx: b, d: dx * dx + dy * dy });
      }
      candidates.sort(function (p, q) { return p.d - q.d; });
      var own = [];
      for (var k = 0; k < Math.min(2, candidates.length); k++) {
        own.push(edges.length);
        edges.push({ a: a, b: candidates[k].idx });
      }
      adjacency.push(own);
    }
    // pulsos viajando pelas sinapses
    var pulseCount = Math.round(edges.length * 0.16);
    for (var p = 0; p < pulseCount; p++) {
      pulses.push({ edge: (Math.random() * edges.length) | 0, t: Math.random(), speed: rand(0.25, 0.7) });
    }
  }

  /* ---------- projeção ---------- */
  var twistCache = { z: 0, c: 1, s: 0 };
  function project(p, out) {
    var z = p.z - camZ;
    if (z < NEAR) return false;
    // torção da rede em torno do eixo Z (varia com a profundidade → leitura 3D)
    var twist = time * 0.05 + p.z * 0.00045;
    var c = Math.cos(twist), s = Math.sin(twist);
    var x = p.x * c - p.y * s;
    var y = p.x * s + p.y * c;
    // paralaxe do mouse (mais forte no que está perto)
    var depthBias = 1 - Math.min(z / (DEPTH + 800), 1);
    x += rotY * (120 + depthBias * 260);
    y += rotX * (90 + depthBias * 200) + camY;
    var scale = FOV / (FOV + z);
    out.x = CX + x * scale;
    out.y = CY + y * scale;
    out.s = scale;
    out.z = z;
    return true;
  }

  /* ---------- render ---------- */
  var PA = {}, PB = {};
  function frame(dt) {
    time += dt;
    // suavizações
    camZ += (camZTarget - camZ) * 0.065;
    rotY += (mouseX * 0.55 * intensity - rotY) * 0.045;
    rotX += (mouseY * 0.45 * intensity - rotX) * 0.045;
    camY = Math.sin(time * 0.32) * 11;

    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    var ar = accent.r, ag = accent.g, ab = accent.b;
    var sr = accentSoft.r, sg = accentSoft.g, sb = accentSoft.b;

    // sinapses
    ctx.lineWidth = 1;
    for (var e = 0; e < edges.length; e++) {
      var ed = edges[e];
      if (!project(nodes[ed.a], PA) || !project(nodes[ed.b], PB)) continue;
      var alpha = Math.min(PA.s, PB.s) * 0.34;
      if (alpha < 0.015) continue;
      ctx.strokeStyle = 'rgba(' + ar + ',' + ag + ',' + ab + ',' + alpha.toFixed(3) + ')';
      ctx.beginPath();
      ctx.moveTo(PA.x, PA.y);
      ctx.lineTo(PB.x, PB.y);
      ctx.stroke();
    }

    // neurônios
    for (var n = 0; n < nodes.length; n++) {
      var nd = nodes[n];
      if (!project(nd, PA)) continue;
      if (PA.x < -60 || PA.x > W + 60 || PA.y < -60 || PA.y > H + 60) continue;
      var glow = 0.55 + 0.45 * Math.sin(time * 1.4 + nd.tw);
      var rr = nd.r * PA.s * 2.4;
      var aHalo = (PA.s * 0.16 * glow);
      // halo
      ctx.fillStyle = 'rgba(' + ar + ',' + ag + ',' + ab + ',' + aHalo.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(PA.x, PA.y, rr * 3.4, 0, 6.2832);
      ctx.fill();
      // núcleo
      var aCore = Math.min(PA.s * (0.6 + glow * 0.5), 1);
      ctx.fillStyle = 'rgba(' + sr + ',' + sg + ',' + sb + ',' + aCore.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(PA.x, PA.y, Math.max(rr, 0.6), 0, 6.2832);
      ctx.fill();
    }

    // pulsos (sinais percorrendo as sinapses)
    for (var p = 0; p < pulses.length; p++) {
      var pu = pulses[p];
      pu.t += pu.speed * dt;
      if (pu.t >= 1) {
        // continua o caminho a partir do nó de chegada (fluxo contínuo)
        var arrived = edges[pu.edge].b;
        var next = adjacency[arrived];
        pu.edge = (next && next.length) ? next[(Math.random() * next.length) | 0]
                                        : (Math.random() * edges.length) | 0;
        pu.t = 0;
      }
      var eg = edges[pu.edge];
      var n1 = nodes[eg.a], n2 = nodes[eg.b];
      var px = n1.x + (n2.x - n1.x) * pu.t;
      var py = n1.y + (n2.y - n1.y) * pu.t;
      var pz = n1.z + (n2.z - n1.z) * pu.t;
      if (!project({ x: px, y: py, z: pz }, PA)) continue;
      var pa = PA.s * 0.95;
      if (pa < 0.03) continue;
      ctx.fillStyle = 'rgba(255,255,255,' + Math.min(pa, 0.95).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(PA.x, PA.y, 1.5 * PA.s + 0.4, 0, 6.2832);
      ctx.fill();
      ctx.fillStyle = 'rgba(' + sr + ',' + sg + ',' + sb + ',' + (pa * 0.35).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(PA.x, PA.y, 4.5 * PA.s + 1, 0, 6.2832);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---------- loop ---------- */
  var last = performance.now();
  function loop(now) {
    if (!running) return;
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    frame(dt);
    requestAnimationFrame(loop);
  }

  /* ---------- eventos ---------- */
  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    CX = W / 2; CY = H / 2;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function onScroll() {
    var max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    var prog = Math.min(window.scrollY / max, 1);
    // câmera mergulha através da rede ao longo da página inteira
    camZTarget = -650 + prog * (DEPTH + 540);
  }

  document.addEventListener('pointermove', function (e) {
    mouseX = (e.clientX / W) * 2 - 1;
    mouseY = (e.clientY / H) * 2 - 1;
  }, { passive: true });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resize);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { running = false; }
    else if (!reduced && !running) { running = true; last = performance.now(); requestAnimationFrame(loop); }
  });

  /* ---------- API p/ tweaks ---------- */
  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
  }
  window.NEURAL = {
    setColor: function (hex, softHex) {
      var c = hexToRgb(hex); if (c) accent = c;
      var s = hexToRgb(softHex || hex);
      if (s) accentSoft = { r: Math.min(s.r + 40, 255), g: Math.min(s.g + 40, 255), b: Math.min(s.b + 40, 255) };
    },
    setIntensity: function (f) { intensity = Math.max(0, +f || 0); },
    setDensity: function (n) {
      nodesPerLayer = Math.max(6, Math.min(26, Math.round(n)));
      buildNetwork();
      if (reduced) { frame(0.016); }
    }
  };

  /* ---------- boot ---------- */
  resize();
  buildNetwork();
  onScroll();
  if (reduced) {
    camZ = camZTarget;
    frame(0.016); // um frame estático
    running = false;
  } else {
    requestAnimationFrame(loop);
  }
})();

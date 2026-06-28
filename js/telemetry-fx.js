/**
 * PERCEPTRON — Script de Telemetria e Logs Ativos
 * Controla os JSONs interativos, gerador de logs e simuladores de métricas de engenharia.
 */
(function () {
  // 1. Dicionário de Payloads JSON da API
  const JSON_PAYLOADS = {
    status: {
      "status": "healthy",
      "timestamp": new Date().toISOString(),
      "services": {
        "postgresql": {
          "status": "connected",
          "connections_active": 14,
          "max_pool_size": 50,
          "avg_query_time_ms": 2.8
        },
        "redis_cache": {
          "status": "connected",
          "memory_used_mb": 142.6,
          "evicted_keys": 0
        },
        "background_scheduler": {
          "status": "running",
          "active_workers": 4,
          "idle_workers": 2
        }
      }
    },
    webhook: {
      "event": "invoice.processed",
      "attempt": 1,
      "delivered_at": new Date().toISOString(),
      "receiver": {
        "endpoint": "https://api.perceptron.py/v1/webhooks/receiver",
        "protocol": "https/ssl",
        "payload": {
          "id": "inv_9F4k2L",
          "amount_cents": 128500,
          "currency": "brl",
          "status": "reconciled",
          "metadata": {
            "customer_erp_id": "erp_usr_90432",
            "gateway": "stripe"
          }
        }
      },
      "http_response": {
        "status_code": 200,
        "body": "{\"received\":true}"
      }
    },
    queues: {
      "broker": "rabbitmq",
      "virtual_host": "/production",
      "queues": {
        "data.sync.inventory": {
          "messages_ready": 0,
          "messages_unacknowledged": 0,
          "active_consumers": 4
        },
        "data.process.invoice": {
          "messages_ready": 2,
          "messages_unacknowledged": 1,
          "active_consumers": 6
        },
        "data.alert.slack": {
          "messages_ready": 0,
          "messages_unacknowledged": 0,
          "active_consumers": 2
        }
      }
    }
  };

  // Inicializa o JSON Viewer com formatação sintática básica
  function formatJSON(obj) {
    const raw = JSON.stringify(obj, null, 2);
    // Escape simples de caracteres de marcação HTML
    let html = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // Colorizar chaves, strings, números e booleanos
    html = html.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")(\s*:)/g, '<span class="json-key">$1</span>$3');
    html = html.replace(/"(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"/g, function (match) {
      if (/:/.test(match)) return match;
      return '<span class="json-str">' + match + '</span>';
    });
    html = html.replace(/\b(true|false|null)\b/g, '<span class="json-bool">$1</span>');
    html = html.replace(/\b([0-9]+(?:\.[0-9]+)?)\b/g, '<span class="json-num">$1</span>');
    return html;
  }

  const jsonPre = document.getElementById('jsonCode');
  const tabs = document.querySelectorAll('.json-tab');

  function updateJSONView(key) {
    if (jsonPre && JSON_PAYLOADS[key]) {
      jsonPre.innerHTML = formatJSON(JSON_PAYLOADS[key]);
    }
  }

  // Configura os clicks nas abas
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      updateJSONView(this.dataset.api);
    });
  });

  // Carrega status inicial
  updateJSONView('status');


  // 2. Simulação e Injeção de Logs Ativos no Terminal
  const logBody = document.getElementById('logBody');
  const LOG_TEMPLATES = [
    { tag: 'info', msg: '[Scheduler] Iniciou rotina agendada: SyncERPToInventory' },
    { tag: 'info', msg: '[API] Solicitando registros da página 1/4 da API Totvs...' },
    { tag: 'success', msg: '[PostgreSQL] Atualizados 42 SKUs na tabela de estoque físico' },
    { tag: 'info', msg: '[Scheduler] Job concluído: SyncERPToInventory (1.4s)' },
    { tag: 'info', msg: '[Scheduler] Iniciou rotina: ReconciliationTaxPayments' },
    { tag: 'info', msg: '[API] Coletando novos Webhooks do gateway Stripe...' },
    { tag: 'success', msg: '[Stripe] Processada fatura inv_0843L — pagamento verificado' },
    { tag: 'success', msg: '[PostgreSQL] Faturamento conciliado: ID erp_902422' },
    { tag: 'info', msg: '[Webhook] Disparada confirmação de recebimento HTTP 200' },
    { tag: 'info', msg: '[Scheduler] Job concluído: ReconciliationTaxPayments (2.8s)' },
    { tag: 'warn', msg: '[API] Totvs retornou 429 (Too Many Requests) — Tentando novamente em 3s' },
    { tag: 'info', msg: '[API] Tentativa 2 de conexão com gateway fiscal realizada com sucesso' }
  ];

  function getFormattedTime() {
    const d = new Date();
    return d.toTimeString().split(' ')[0] + '.' + String(d.getMilliseconds()).padStart(3, '0');
  }

  function appendLogLine() {
    if (!logBody) return;

    // Escolhe um log aleatório
    const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
    
    const line = document.createElement('div');
    line.className = 'log-line';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'log-time';
    timeSpan.textContent = `[${getFormattedTime()}]`;

    const tagSpan = document.createElement('span');
    tagSpan.className = `log-tag ${template.tag}`;
    tagSpan.textContent = template.tag;

    const msgSpan = document.createElement('span');
    msgSpan.className = 'log-msg';
    msgSpan.textContent = template.msg;

    line.appendChild(timeSpan);
    line.appendChild(tagSpan);
    line.appendChild(msgSpan);

    logBody.appendChild(line);

    // Manter limite de logs na tela
    while (logBody.children.length > 25) {
      logBody.removeChild(logBody.firstChild);
    }

    // Scroll suave para a base do terminal
    logBody.scrollTop = logBody.scrollHeight;
  }

  // Iniciar logs com intervalo de 2 a 3.5 segundos
  function startLogs() {
    appendLogLine();
    const nextLog = 1600 + Math.random() * 2400;
    setTimeout(startLogs, nextLog);
  }

  // Pre-popular terminal inicial com logs passados
  if (logBody) {
    for (let i = 0; i < 6; i++) {
      appendLogLine();
    }
    startLogs();
  }


  // 3. Simulação das Métricas do Dashboard de Telemetria
  const domLatency = document.getElementById('telemetryLatency');
  const domQueueText = document.getElementById('telemetryQueueText');
  const domQueueBar = document.getElementById('telemetryQueueBar');
  const domWorkerText = document.getElementById('telemetryWorkerText');
  const domWorkerBar = document.getElementById('telemetryWorkerBar');
  const domUptime = document.getElementById('telemetryUptime');

  // Uptime Counter dinâmico
  let startTime = Date.now() - (148 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 12 * 60 * 1000 + 45 * 1000); // 148d 6h 12m 45s
  function updateUptime() {
    if (!domUptime) return;
    const diff = Date.now() - startTime;
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const mins = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const secs = Math.floor((diff % (60 * 1000)) / 1000);

    domUptime.textContent = `${days}d ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // Loop de atualização de telemetria
  function updateMetrics() {
    // 1. Latência do SQL oscila de 2.2ms a 3.6ms
    if (domLatency) {
      const lat = (2.2 + Math.random() * 1.4).toFixed(1);
      domLatency.textContent = lat;
    }

    // 2. Fila (Queue occupancy) oscila entre 8% e 42%
    if (domQueueBar && domQueueText) {
      const qVal = Math.floor(8 + Math.random() * 34);
      domQueueBar.style.width = qVal + '%';
      domQueueText.textContent = `${qVal}%`;
    }

    // 3. Worker Load oscila de 22% a 88%
    if (domWorkerBar && domWorkerText) {
      const wVal = Math.floor(22 + Math.random() * 66);
      domWorkerBar.style.width = wVal + '%';
      domWorkerText.textContent = `${wVal}%`;
    }
  }

  // Inicia loops de telemetria
  setInterval(updateUptime, 1000);
  setInterval(updateMetrics, 2000);
  
  updateUptime();
  updateMetrics();
})();

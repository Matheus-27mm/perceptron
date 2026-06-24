/* ============================================================
   PERCEPTRON — i18n (PT / EN / ES) sem o tradutor do navegador
   Estratégia: percorre os nós de texto uma vez, guarda o PT
   original e troca pelo idioma escolhido. Strings sem tradução
   ficam em PT (fallback). Áreas dinâmicas/animadas são puladas.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'perceptron-lang';
  var HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };

  /* dicionário — chaves = texto PT com espaços normalizados */
  var DICT = {
    en: {
      /* nav + botões */
      'O que fazemos': 'What we do',
      'Quem somos': 'About us',
      'Como funciona': 'How it works',
      'Soluções': 'Solutions',
      'Casos': 'Cases',
      'Falar com a equipe': 'Talk to the team',
      'Iniciar projeto': 'Start a project',
      /* hero */
      'Software sob medida para a sua empresa': 'Custom software for your company',
      'Transformamos': 'We transform',
      'a sua operação em': 'your operation into',
      'sistemas que escalam.': 'systems that scale.',
      'Eliminamos o trabalho manual e os erros da sua operação — para a sua empresa crescer com tranquilidade.': "We eliminate the manual work and the errors in your operation — so your company can grow with peace of mind.",
      'Iniciar um projeto': 'Start a project',
      'Ver o que fazemos': 'See what we do',
      /* marquee */
      'Menos trabalho manual': 'Less manual work',
      'Mais controle': 'More control',
      'Operação sozinha': 'Self-running operation',
      'Decisões com dados': 'Data-driven decisions',
      'Pronto para crescer': 'Ready to grow',
      'Feito sob medida': 'Made to measure',
      /* pilares */
      'Três formas de fazer a sua operação render mais.': 'Three ways to make your operation deliver more.',
      'Cada solução existe para um objetivo claro do seu negócio: economizar tempo, reduzir custo ou destravar o crescimento. A parte técnica é com a gente.': 'Every solution exists for a clear business goal: save time, cut costs, or unlock growth. The technical part is on us.',
      'Sistemas sob medida': 'Custom systems',
      'Software feito sob medida para o jeito que a sua empresa trabalha — sem as limitações dos sistemas de prateleira, pronto para durar e crescer junto.': 'Software built to fit the way your company works — without the limits of off-the-shelf systems, ready to last and grow with you.',
      'Automação de tarefas': 'Task automation',
      'Tiramos da mão da sua equipe o trabalho repetitivo: tarefas que tomavam horas passam a acontecer sozinhas, no tempo certo e sem erro.': "We take repetitive work off your team's hands: tasks that took hours now run on their own, on time and error-free.",
      'Organização dos dados': 'Data organization',
      'Suas informações reunidas e organizadas em um só lugar, para você decidir com base em dados reais — não no achismo.': 'Your information gathered and organized in one place, so you decide based on real data — not guesswork.',
      /* manifesto (a citação animada fica em PT) */
      'A origem do nome': 'The origin of the name',
      'entra a informação → o sistema pondera → sai a decisão': 'information goes in → the system weighs it → the decision comes out',
      'a ideia simples por trás de tudo que a gente constrói.': 'the simple idea behind everything we build.',
      /* prova */
      'A prova': 'The proof',
      'Não afirmamos capacidade. Demonstramos.': "We don't claim capability. We demonstrate it.",
      'É assim que funciona na prática: a informação espalhada entra de um lado, e do outro saem decisões e ações prontas — o tempo todo, sem ninguém precisar mexer.': "Here's how it works in practice: scattered information comes in on one side, and ready decisions and actions come out the other — all the time, without anyone lifting a finger.",
      'Sistemas': 'Systems',
      'Canais': 'Channels',
      'Planilhas': 'Spreadsheets',
      'o seu sistema': 'your system',
      'Relatórios': 'Reports',
      'Ações': 'Actions',
      'Avisos': 'Alerts',
      'tarefas feitas por dia': 'tasks done per day',
      'disponibilidade': 'uptime',
      'de trabalho manual': 'of manual work',
      'funcionando sozinho': 'running on its own',
      /* diferencial */
      'Nosso diferencial': 'Our difference',
      'Uma parceira de verdade, não só mais um fornecedor.': 'A real partner, not just another vendor.',
      'Entregamos software que simplesmente funciona — sólido, confiável e feito para acompanhar o crescimento da sua empresa.': "We deliver software that simply works — solid, reliable, and built to keep up with your company's growth.",
      'Sem complicação': 'No complications',
      'Você fala de negócio': 'You speak business',
      'Você não precisa entender de tecnologia — só do seu negócio. A parte técnica é com a gente, e traduzimos tudo em resultado.': "You don't need to understand technology — just your business. The technical part is on us, and we turn it all into results.",
      'Feito com cuidado': 'Made with care',
      'Cada detalhe pensado': 'Every detail considered',
      'Do primeiro contato à entrega, tudo é feito com capricho. Nada de gambiarra: cada detalhe é pensado para durar.': 'From first contact to delivery, everything is done with care. No quick hacks: every detail is built to last.',
      'Base do crescimento': 'Foundation for growth',
      'A base do seu negócio': 'The foundation of your business',
      'Não entregamos só uma ferramenta solta. Entregamos a base digital sobre a qual a sua empresa vai crescer.': "We don't just deliver a standalone tool. We deliver the digital foundation your company will grow on.",
      /* stack / soluções */
      'O que entregamos': 'What we deliver',
      'Resultado para a sua operação, de ponta a ponta.': 'Results for your operation, end to end.',
      'Mais eficiência, menos trabalho manual e mais controle — com a solução certa para cada necessidade da sua empresa.': 'More efficiency, less manual work, and more control — with the right solution for each need of your company.',
      'sem intervenção manual': 'no manual intervention',
      'Tarefas repetitivas que tomavam horas passam a acontecer sozinhas, no tempo certo e sem erro.': 'Repetitive tasks that took hours now happen on their own, on time and error-free.',
      'feito para você': 'built for you',
      'Software feito para o jeito que a sua empresa trabalha — sem as amarras das soluções genéricas.': 'Software built for the way your company works — without the constraints of generic solutions.',
      'Dados organizados': 'Organized data',
      'decisão com clareza': 'decide with clarity',
      'Suas informações reunidas e organizadas para decisões mais rápidas e seguras.': 'Your information gathered and organized for faster, safer decisions.',
      'Integração e crescimento': 'Integration and growth',
      'pronto para crescer': 'ready to grow',
      'Conectamos seus sistemas e processos para que tudo converse — e a sua operação esteja pronta para crescer.': 'We connect your systems and processes so everything talks to each other — and your operation is ready to grow.',
      /* casos */
      'Resultados': 'Results',
      'O que acontece quando a operação vira sistema.': 'What happens when operations become a system.',
      'Financeiro · Conciliação': 'Finance · Reconciliation',
      'tempo de fechamento': 'closing time',
      'Fechamento financeiro automatizado: 14 horas de trabalho manual por semana viraram praticamente zero.': 'Automated financial close: 14 hours of manual work per week dropped to nearly zero.',
      'Logística · Integração': 'Logistics · Integration',
      'mais pedidos processados': 'more orders processed',
      'Sistemas e canais de venda conectados: a mesma equipe passou a dar conta de cinco vezes mais pedidos.': 'Sales systems and channels connected: the same team now handles five times more orders.',
      'Indústria · Dados': 'Industry · Data',
      'decisões em tempo real': 'real-time decisions',
      'Todas as informações da produção reunidas em tempo real — decisões na hora, sem planilha no meio do caminho.': 'All production data brought together in real time — decisions on the spot, no spreadsheets in between.',
      '* cenários representativos de projetos típicos — cada operação tem seus próprios números.': '* representative scenarios of typical projects — each operation has its own numbers.',
      /* processo */
      'Como trabalhamos': 'How we work',
      'Do problema do dia a dia à solução funcionando.': 'From the everyday problem to a working solution.',
      'Diagnóstico': 'Diagnosis',
      'Entendemos a sua operação e onde estão os gargalos. No fim, você tem um plano claro, priorizado pelo que dá mais resultado.': 'We understand your operation and where the bottlenecks are. In the end, you get a clear plan, prioritized by what delivers the most.',
      'Desenho da solução': 'Solution design',
      'Desenhamos a solução completa e explicamos cada escolha em linguagem que você entende — sem caixa-preta.': 'We design the full solution and explain each choice in language you understand — no black box.',
      'Construção': 'Build',
      'Entregas a cada semana, já funcionando. Você acompanha tudo crescer de perto, sem surpresas.': 'Deliveries every week, already working. You watch it all grow up close, no surprises.',
      'Acompanhamento': 'Follow-up',
      'Continuamos por perto: acompanhando, medindo e melhorando a solução conforme a sua empresa evolui.': 'We stay close: monitoring, measuring, and improving the solution as your company evolves.',
      /* cta */
      'Vamos construir': "Let's build",
      'Pronto para tirar peso da sua operação e crescer com tranquilidade?': 'Ready to take the weight off your operation and grow with peace of mind?',
      'Conte o desafio do seu negócio aqui mesmo — chega pronto para a nossa equipe analisar.': 'Tell us your business challenge right here — it reaches our team ready to review.',
      'prefere direto?': 'prefer direct?',
      /* rodapé */
      'A Perceptron.py cria software sob medida para empresas que querem crescer com eficiência. O nome homenageia o primeiro neurônio artificial — a origem da inteligência das máquinas — e resume o nosso jeito de trabalhar: entender cada detalhe do seu negócio e transformá-lo em sistemas que funcionam sozinhos, reduzem o trabalho manual e sustentam o crescimento.': 'Perceptron.py builds custom software for companies that want to grow efficiently. The name honors the first artificial neuron — the origin of machine intelligence — and sums up how we work: understanding every detail of your business and turning it into systems that run on their own, reduce manual work, and sustain growth.',
      'Empresa': 'Company',
      'Diferencial': 'Difference',
      'Saiba mais': 'Learn more',
      'Organização de dados': 'Data organization',
      'Contato': 'Contact',
      'Voltar ao topo': 'Back to top',
      'Feito com': 'Made with',
      'e tecnologia': 'and technology'
    },

    es: {
      /* nav + botões */
      'O que fazemos': 'Qué hacemos',
      'Quem somos': 'Quiénes somos',
      'Como funciona': 'Cómo funciona',
      'Soluções': 'Soluciones',
      'Casos': 'Casos',
      'Falar com a equipe': 'Hablar con el equipo',
      'Iniciar projeto': 'Iniciar proyecto',
      /* hero */
      'Software sob medida para a sua empresa': 'Software a medida para tu empresa',
      'Transformamos': 'Transformamos',
      'a sua operação em': 'tu operación en',
      'sistemas que escalam.': 'sistemas que escalan.',
      'Eliminamos o trabalho manual e os erros da sua operação — para a sua empresa crescer com tranquilidade.': 'Eliminamos el trabajo manual y los errores de tu operación — para que tu empresa crezca con tranquilidad.',
      'Iniciar um projeto': 'Iniciar un proyecto',
      'Ver o que fazemos': 'Ver qué hacemos',
      /* marquee */
      'Menos trabalho manual': 'Menos trabajo manual',
      'Mais controle': 'Más control',
      'Operação sozinha': 'Operación autónoma',
      'Decisões com dados': 'Decisiones con datos',
      'Pronto para crescer': 'Listo para crecer',
      'Feito sob medida': 'Hecho a medida',
      /* pilares */
      'Três formas de fazer a sua operação render mais.': 'Tres formas de hacer que tu operación rinda más.',
      'Cada solução existe para um objetivo claro do seu negócio: economizar tempo, reduzir custo ou destravar o crescimento. A parte técnica é com a gente.': 'Cada solución existe para un objetivo claro de tu negocio: ahorrar tiempo, reducir costos o destrabar el crecimiento. La parte técnica es con nosotros.',
      'Sistemas sob medida': 'Sistemas a medida',
      'Software feito sob medida para o jeito que a sua empresa trabalha — sem as limitações dos sistemas de prateleira, pronto para durar e crescer junto.': 'Software hecho a la medida de cómo trabaja tu empresa — sin las limitaciones de los sistemas genéricos, listo para durar y crecer contigo.',
      'Automação de tarefas': 'Automatización de tareas',
      'Tiramos da mão da sua equipe o trabalho repetitivo: tarefas que tomavam horas passam a acontecer sozinhas, no tempo certo e sem erro.': 'Le quitamos a tu equipo el trabajo repetitivo: las tareas que tomaban horas pasan a ocurrir solas, a tiempo y sin errores.',
      'Organização dos dados': 'Organización de los datos',
      'Suas informações reunidas e organizadas em um só lugar, para você decidir com base em dados reais — não no achismo.': 'Tu información reunida y organizada en un solo lugar, para que decidas con base en datos reales — no en suposiciones.',
      /* manifesto */
      'A origem do nome': 'El origen del nombre',
      'entra a informação → o sistema pondera → sai a decisão': 'entra la información → el sistema pondera → sale la decisión',
      'a ideia simples por trás de tudo que a gente constrói.': 'la idea simple detrás de todo lo que construimos.',
      /* prova */
      'A prova': 'La prueba',
      'Não afirmamos capacidade. Demonstramos.': 'No afirmamos capacidad. La demostramos.',
      'É assim que funciona na prática: a informação espalhada entra de um lado, e do outro saem decisões e ações prontas — o tempo todo, sem ninguém precisar mexer.': 'Así funciona en la práctica: la información dispersa entra por un lado, y por el otro salen decisiones y acciones listas — todo el tiempo, sin que nadie tenga que intervenir.',
      'Sistemas': 'Sistemas',
      'Canais': 'Canales',
      'Planilhas': 'Planillas',
      'o seu sistema': 'tu sistema',
      'Relatórios': 'Informes',
      'Ações': 'Acciones',
      'Avisos': 'Avisos',
      'tarefas feitas por dia': 'tareas hechas por día',
      'disponibilidade': 'disponibilidad',
      'de trabalho manual': 'de trabajo manual',
      'funcionando sozinho': 'funcionando solo',
      /* diferencial */
      'Nosso diferencial': 'Nuestro diferencial',
      'Uma parceira de verdade, não só mais um fornecedor.': 'Un socio de verdad, no solo otro proveedor.',
      'Entregamos software que simplesmente funciona — sólido, confiável e feito para acompanhar o crescimento da sua empresa.': 'Entregamos software que simplemente funciona — sólido, confiable y hecho para acompañar el crecimiento de tu empresa.',
      'Sem complicação': 'Sin complicaciones',
      'Você fala de negócio': 'Tú hablas de negocio',
      'Você não precisa entender de tecnologia — só do seu negócio. A parte técnica é com a gente, e traduzimos tudo em resultado.': 'No necesitas entender de tecnología — solo de tu negocio. La parte técnica es con nosotros, y traducimos todo en resultados.',
      'Feito com cuidado': 'Hecho con cuidado',
      'Cada detalhe pensado': 'Cada detalle pensado',
      'Do primeiro contato à entrega, tudo é feito com capricho. Nada de gambiarra: cada detalhe é pensado para durar.': 'Del primer contacto a la entrega, todo se hace con esmero. Nada de improvisaciones: cada detalle está pensado para durar.',
      'Base do crescimento': 'Base del crecimiento',
      'A base do seu negócio': 'La base de tu negocio',
      'Não entregamos só uma ferramenta solta. Entregamos a base digital sobre a qual a sua empresa vai crescer.': 'No entregamos solo una herramienta suelta. Entregamos la base digital sobre la cual tu empresa va a crecer.',
      /* stack / soluções */
      'O que entregamos': 'Lo que entregamos',
      'Resultado para a sua operação, de ponta a ponta.': 'Resultados para tu operación, de punta a punta.',
      'Mais eficiência, menos trabalho manual e mais controle — com a solução certa para cada necessidade da sua empresa.': 'Más eficiencia, menos trabajo manual y más control — con la solución correcta para cada necesidad de tu empresa.',
      'sem intervenção manual': 'sin intervención manual',
      'Tarefas repetitivas que tomavam horas passam a acontecer sozinhas, no tempo certo e sem erro.': 'Las tareas repetitivas que tomaban horas pasan a ocurrir solas, a tiempo y sin errores.',
      'feito para você': 'hecho para ti',
      'Software feito para o jeito que a sua empresa trabalha — sem as amarras das soluções genéricas.': 'Software hecho para la forma en que trabaja tu empresa — sin las ataduras de las soluciones genéricas.',
      'Dados organizados': 'Datos organizados',
      'decisão com clareza': 'decisión con claridad',
      'Suas informações reunidas e organizadas para decisões mais rápidas e seguras.': 'Tu información reunida y organizada para decisiones más rápidas y seguras.',
      'Integração e crescimento': 'Integración y crecimiento',
      'pronto para crescer': 'listo para crecer',
      'Conectamos seus sistemas e processos para que tudo converse — e a sua operação esteja pronta para crescer.': 'Conectamos tus sistemas y procesos para que todo se comunique — y tu operación esté lista para crecer.',
      /* casos */
      'Resultados': 'Resultados',
      'O que acontece quando a operação vira sistema.': 'Lo que pasa cuando la operación se vuelve sistema.',
      'Financeiro · Conciliação': 'Finanzas · Conciliación',
      'tempo de fechamento': 'tiempo de cierre',
      'Fechamento financeiro automatizado: 14 horas de trabalho manual por semana viraram praticamente zero.': 'Cierre financiero automatizado: 14 horas de trabajo manual por semana se volvieron casi cero.',
      'Logística · Integração': 'Logística · Integración',
      'mais pedidos processados': 'más pedidos procesados',
      'Sistemas e canais de venda conectados: a mesma equipe passou a dar conta de cinco vezes mais pedidos.': 'Sistemas y canales de venta conectados: el mismo equipo pasó a manejar cinco veces más pedidos.',
      'Indústria · Dados': 'Industria · Datos',
      'decisões em tempo real': 'decisiones en tiempo real',
      'Todas as informações da produção reunidas em tempo real — decisões na hora, sem planilha no meio do caminho.': 'Toda la información de producción reunida en tiempo real — decisiones al instante, sin planillas en el medio.',
      '* cenários representativos de projetos típicos — cada operação tem seus próprios números.': '* escenarios representativos de proyectos típicos — cada operación tiene sus propios números.',
      /* processo */
      'Como trabalhamos': 'Cómo trabajamos',
      'Do problema do dia a dia à solução funcionando.': 'Del problema del día a día a la solución funcionando.',
      'Diagnóstico': 'Diagnóstico',
      'Entendemos a sua operação e onde estão os gargalos. No fim, você tem um plano claro, priorizado pelo que dá mais resultado.': 'Entendemos tu operación y dónde están los cuellos de botella. Al final, tienes un plan claro, priorizado por lo que da más resultado.',
      'Desenho da solução': 'Diseño de la solución',
      'Desenhamos a solução completa e explicamos cada escolha em linguagem que você entende — sem caixa-preta.': 'Diseñamos la solución completa y explicamos cada elección en un lenguaje que entiendes — sin caja negra.',
      'Construção': 'Construcción',
      'Entregas a cada semana, já funcionando. Você acompanha tudo crescer de perto, sem surpresas.': 'Entregas cada semana, ya funcionando. Acompañas todo crecer de cerca, sin sorpresas.',
      'Acompanhamento': 'Acompañamiento',
      'Continuamos por perto: acompanhando, medindo e melhorando a solução conforme a sua empresa evolui.': 'Seguimos cerca: monitoreando, midiendo y mejorando la solución a medida que tu empresa evoluciona.',
      /* cta */
      'Vamos construir': 'Vamos a construir',
      'Pronto para tirar peso da sua operação e crescer com tranquilidade?': '¿Listo para quitarle peso a tu operación y crecer con tranquilidad?',
      'Conte o desafio do seu negócio aqui mesmo — chega pronto para a nossa equipe analisar.': 'Cuéntanos el desafío de tu negocio aquí mismo — llega listo para que nuestro equipo lo analice.',
      'prefere direto?': '¿prefieres directo?',
      /* rodapé */
      'A Perceptron.py cria software sob medida para empresas que querem crescer com eficiência. O nome homenageia o primeiro neurônio artificial — a origem da inteligência das máquinas — e resume o nosso jeito de trabalhar: entender cada detalhe do seu negócio e transformá-lo em sistemas que funcionam sozinhos, reduzem o trabalho manual e sustentam o crescimento.': 'Perceptron.py crea software a medida para empresas que quieren crecer con eficiencia. El nombre rinde homenaje a la primera neurona artificial — el origen de la inteligencia de las máquinas — y resume nuestra forma de trabajar: entender cada detalle de tu negocio y transformarlo en sistemas que funcionan solos, reducen el trabajo manual y sostienen el crecimiento.',
      'Empresa': 'Empresa',
      'Diferencial': 'Diferencial',
      'Saiba mais': 'Saber más',
      'Organização de dados': 'Organización de datos',
      'Contato': 'Contacto',
      'Voltar ao topo': 'Volver arriba',
      'Feito com': 'Hecho con',
      'e tecnologia': 'y tecnología'
    }
  };

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  /* nós de texto traduzíveis, coletados uma vez */
  var nodes = [];
  var SKIP = '#manifestoQuote, #briefTerm, #termLines, .palette, .audio-toggle, .lang-switch, .kbd-hint';

  function collect(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var name = p.nodeName;
        if (name === 'SCRIPT' || name === 'STYLE' || name === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        if (!norm(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      n.__orig = n.nodeValue;
      n.__key = norm(n.nodeValue);
      nodes.push(n);
    }
  }

  function apply(lang) {
    var map = DICT[lang];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (lang === 'pt' || !map) {
        n.nodeValue = n.__orig;
      } else {
        var tr = map[n.__key];
        n.nodeValue = (tr != null) ? tr : n.__orig;
      }
    }
    document.documentElement.setAttribute('lang', HTML_LANG[lang] || 'pt-BR');

    var opts = document.querySelectorAll('.lang-opt');
    for (var j = 0; j < opts.length; j++) {
      var on = opts[j].getAttribute('data-lang') === lang;
      opts[j].classList.toggle('is-active', on);
      opts[j].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  function init() {
    collect(document.body);

    var opts = document.querySelectorAll('.lang-opt');
    for (var k = 0; k < opts.length; k++) {
      opts[k].addEventListener('click', function () {
        apply(this.getAttribute('data-lang'));
      });
    }

    var saved;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (saved && saved !== 'pt') apply(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

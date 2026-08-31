/* ============================================================
   PERCEPTRON — i18n (PT padrão · EN) sem o navegador
   Percorre os nós de texto uma vez, guarda o PT original e troca
   pelo idioma escolhido. Strings sem tradução ficam em PT.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'perceptron-lang';
  var HTML_LANG = { pt: 'pt-BR', en: 'en' };

  var DICT = {
    en: {
      /* nav + botões */
      'O que fazemos': 'What we do',
      'Soluções': 'Solutions',
      'Como funciona': 'How it works',
      'Casos': 'Cases',
      'Sobre nós': 'About us',
      'Falar com a equipe': 'Talk to the team',
      'Iniciar projeto': 'Start a project',
      /* hero */
      'Engenharia de Software · Automação · Dados': 'Software Engineering · Automation · Data',
      'Engenharia de Software · Automação · Integrações': 'Software Engineering · Automation · Integrations',
      'Menos tarefas manuais.': 'Fewer manual tasks.',
      'Mais operação.': 'More operation.',
      'Sistemas sob medida, automações e integrações para eliminar gargalos e organizar processos críticos.': 'Custom systems, automations and integrations to eliminate bottlenecks and organize critical processes.',
      'Sua operação não deveria depender de': "Your operation shouldn't depend on",
      'planilhas e tarefas manuais.': 'spreadsheets and manual tasks.',
      'Desenvolvemos sistemas sob medida e automações inteligentes que eliminam gargalos operacionais e transformam dados dispersos em decisões e resultados.': 'We build custom systems and intelligent automations that eliminate operational bottlenecks and turn scattered data into decisions and results.',
      'Iniciar Diagnóstico Técnico': 'Start a Technical Diagnosis',
      'Ver soluções': 'See solutions',
      'Conversar sobre meu projeto': 'Talk about my project',
      'Ver sistemas em produção': 'See systems in production',
      'Ver produtos em destaque': 'See featured products',
      'Resposta em até 1 dia útil · Sem compromisso': 'Reply within one business day · No commitment',
      'Sistemas': 'Systems',
      'Automação': 'Automation',
      'Integrações': 'Integrations',
      'Sistemas que desenvolvemos e mantemos em produção': 'Systems we build and keep running in production',
      'scroll': 'scroll',
      /* o que fazemos */
      'Engenharia que remove complexidade e cria escala.': 'Engineering that removes complexity and creates scale.',
      'Sistemas Sob Medida': 'Custom Systems',
      'Soluções proprietárias criadas para as regras e fluxos únicos do seu negócio.': 'Proprietary solutions built for the unique rules and flows of your business.',
      '01 / Principal': '01 / Main service',
      'Software desenhado para as regras, pessoas e fluxos da sua operação — sem adaptar o negócio a uma ferramenta genérica.': 'Software designed around the rules, people and flows of your operation — without forcing the business into a generic tool.',
      'Automação Operacional': 'Operational Automation',
      'Robôs e fluxos inteligentes que executam tarefas repetitivas em background 24/7.': 'Bots and intelligent flows that run repetitive tasks in the background 24/7.',
      'Rotinas repetitivas executadas com consistência, rastreabilidade e menos intervenção manual.': 'Repetitive routines executed with consistency, traceability and less manual intervention.',
      'Engenharia de Dados': 'Data Engineering',
      'Integração, limpeza e consolidação de dados para visibilidade e inteligência.': 'Data integration, cleaning and consolidation for visibility and intelligence.',
      'Dados integrados e organizados para dar visibilidade à operação e apoiar decisões.': 'Integrated, organized data that brings visibility to operations and supports decisions.',
      'Integrações & APIs': 'Integrations & APIs',
      'Conectamos sistemas, plataformas e canais para eliminar retrabalho.': 'We connect systems, platforms and channels to eliminate rework.',
      'Sistemas, plataformas e canais conectados para reduzir retrabalho e informação dispersa.': 'Systems, platforms and channels connected to reduce rework and scattered information.',
      /* software em produção */
      'Sistemas desenvolvidos': "Systems we've built",
      'Software em produção. Resultados reais.': 'Software in production. Real results.',
      'Sistemas que construímos.': 'Systems we build.',
      'Produtos digitais em operação e soluções que estamos desenvolvendo.': 'Digital products in operation and solutions currently in development.',
      'Produtos em destaque': 'Featured products',
      'Dois sistemas. Contextos reais.': 'Two systems. Real contexts.',
      'Uma operação em produção e um produto jurídico em desenvolvimento.': 'One live operation and one legal product in development.',
      'Em produção': 'In production',
      'Em desenvolvimento': 'In development',
      'Sistema jurídico completo — processos, prazos, clientes e assistente jurídico com IA.': 'Complete legal system — cases, deadlines, clients and an AI legal assistant.',
      'Rastreabilidade agrícola e conformidade EUDR — compliance, Score ESG e due diligence de fazendas.': 'Agricultural traceability and EUDR compliance — compliance, ESG Score and farm due diligence.',
      'Gestão para clínicas de estética — CRM, agenda, financeiro e central de WhatsApp em um só lugar.': 'Management for aesthetic clinics — CRM, scheduling, finance and a WhatsApp hub in one place.',
      'Unificou agendamento, vendas e relacionamento com o paciente.': 'Unified scheduling, sales and patient relationships.',
      'Agenda, vendas e relacionamento com o paciente em uma única operação.': 'Scheduling, sales and patient relationships in a single operation.',
      'Agenda': 'Scheduling',
      'Financeiro': 'Finance',
      'Processos': 'Cases',
      'Prazos': 'Deadlines',
      'Clientes': 'Clients',
      'IA jurídica': 'Legal AI',
      'CRM sob medida para o comercial — pipeline, negócios, financeiro e relatórios em tempo real.': 'Custom CRM for sales — pipeline, deals, finance and real-time reports.',
      'Quer ver mais detalhes de algum projeto?': 'Want to see more details on a project?',
      'Fale com a nossa equipe →': 'Talk to our team →',
      /* como funciona */
      'Um processo técnico. Transparente e contínuo.': 'A technical process. Transparent and continuous.',
      'Mapeamento': 'Mapping',
      'Entendemos seu fluxo, dados e gargalos para construir o caminho ideal.': 'We understand your flow, data and bottlenecks to build the ideal path.',
      'Arquitetura': 'Architecture',
      'Modelamos a solução, dados e integrações antes de escrever qualquer código.': 'We model the solution, data and integrations before writing any code.',
      'Desenvolvimento': 'Development',
      'Sprints iterativos com entregas constantes e acompanhamento em tempo real.': 'Iterative sprints with constant deliveries and real-time tracking.',
      'Deploy & Evolução': 'Deploy & Evolution',
      'Deploy seguro, monitoramento contínuo e melhorias sempre ativas.': 'Safe deployment, continuous monitoring and always-on improvements.',
      /* diferenciais */
      'Diferenciais': 'Why us',
      'Por que a Perceptron?': 'Why Perceptron?',
      'Software sob medida exige confiança antes, durante e depois do desenvolvimento.': 'Custom software requires trust before, during and after development.',
      'Tecnologia é meio.': 'Technology is a means.',
      'Operação confiável é o resultado.': 'Reliable operations are the outcome.',
      'Cada projeto começa pelo problema de negócio e continua depois do deploy. Sem métricas decorativas, sem promessas vagas.': 'Every project starts with the business problem and continues after deployment. No decorative metrics, no vague promises.',
      'Conheça nosso processo →': 'See how we work →',
      'Escopo construído com contexto': 'Scope built with context',
      'Antes de desenvolver, mapeamos regras, integrações e gargalos da operação para definir o que precisa ser resolvido.': 'Before development, we map operational rules, integrations and bottlenecks to define what needs to be solved.',
      'Entregas que você acompanha': 'Delivery you can follow',
      'O trabalho avança em ciclos curtos, com demonstrações e ajustes ao longo do projeto — não apenas no final.': 'Work moves forward in short cycles, with demonstrations and adjustments throughout the project — not only at the end.',
      'Engenharia para continuidade': 'Engineering for continuity',
      'Arquitetura, segurança e integrações são tratadas como parte do produto desde a primeira entrega.': 'Architecture, security and integrations are treated as part of the product from the first delivery.',
      'Operação acompanhada após o deploy': 'Operations supported after deployment',
      'Infraestrutura monitorada automaticamente, suporte em horário comercial e plantão para incidentes críticos.': 'Infrastructure monitored automatically, with business-hours support and on-call cover for critical incidents.',
      'Sobre a Perceptron': 'About Perceptron',
      'Engenharia próxima do negócio, do diagnóstico à evolução.': 'Engineering close to the business, from diagnosis to evolution.',
      'A Perceptron é uma empresa de engenharia de software que transforma operações complexas em sistemas sob medida, automações e integrações. Trabalhamos com proximidade técnica para entender o contexto, construir com clareza e acompanhar o sistema depois do deploy.': 'Perceptron is a software engineering company that turns complex operations into custom systems, automations and integrations. We work closely with clients to understand the context, build with clarity and support the system after deployment.',
      'Base': 'Based in',
      'Atuação': 'Reach',
      'Projetos no Brasil e no exterior': 'Projects in Brazil and abroad',
      'Contato direto': 'Direct contact',
      'Unimos engenharia sólida, processos inteligentes e tecnologia de ponta para entregar sistemas que realmente impulsionam a sua operação.': 'We combine solid engineering, intelligent processes and cutting-edge technology to deliver systems that truly boost your operation.',
      'Foco total em resultado': 'Total focus on results',
      'Entregamos soluções que resolvem problemas reais e geram impacto mensurável no seu negócio.': 'We deliver solutions that solve real problems and generate measurable impact on your business.',
      'Arquitetura moderna e escalável': 'Modern, scalable architecture',
      'Sistemas preparados para crescer com a sua empresa, suportando alta demanda com estabilidade e performance.': 'Systems ready to grow with your company, handling high demand with stability and performance.',
      'Monitoramento 24/7, suporte quando importa': '24/7 monitoring, support when it matters',
      'Infraestrutura monitorada de forma automatizada com alertas em tempo real. Suporte em horário comercial e plantão para incidentes críticos.': 'Infrastructure monitored automatically with real-time alerts. Support during business hours and on-call cover for critical incidents.',
      'Segurança em todas as camadas': 'Security at every layer',
      'Aplicamos as melhores práticas de segurança para proteger dados, processos e integrações de ponta a ponta.': 'We apply security best practices to protect data, processes and integrations end to end.',
      'Integrações inteligentes': 'Smart integrations',
      'Conectamos sistemas, APIs e plataformas eliminando retrabalho e centralizando informações para decisões melhores.': 'We connect systems, APIs and platforms, eliminating rework and centralizing information for better decisions.',
      'Tecnologia que impulsiona': 'Technology that drives growth',
      'Utilizamos o que há de mais eficiente e inovador em tecnologia para criar soluções que otimizam processos e reduzem custos.': 'We use the most efficient and innovative technology to create solutions that optimize processes and reduce costs.',
      'Tecnologia é meio, não fim.': 'Technology is a means, not an end.',
      'Nosso compromisso é entender seu negócio a fundo e construir soluções sob medida que tragam eficiência, autonomia e crescimento sustentável.': 'Our commitment is to deeply understand your business and build custom solutions that bring efficiency, autonomy and sustainable growth.',
      'Compromisso com seu sucesso': 'Commitment to your success',
      '+ Performance': '+ Performance',
      'Soluções otimizadas para máxima eficiência': 'Solutions optimized for maximum efficiency',
      '+ Confiabilidade': '+ Reliability',
      'Sistemas robustos, seguros e sempre disponíveis': 'Robust, secure and always-available systems',
      /* cta */
      'Pronto para transformar sua operação?': 'Ready to transform your operation?',
      'Vamos construir o próximo sistema que vai impulsionar seu negócio.': "Let's build the next system that will drive your business forward.",
      'Fale com a nossa equipe e descubra como podemos ajudar a estruturar sua infraestrutura digital.': 'Talk to our team and find out how we can help structure your digital infrastructure.',
      'Próximo passo': 'Next step',
      'Conte o que está travando sua operação.': 'Tell us what is holding your operation back.',
      'Analisamos o cenário, identificamos os principais gargalos e retornamos com um próximo passo claro.': 'We assess the scenario, identify the main bottlenecks and return with a clear next step.',
      'Converse com a equipe técnica': 'Talk to the technical team',
      'Resposta em até 1 dia útil': 'Reply within one business day',
      'Contato direto com a equipe técnica': 'Direct contact with the technical team',
      'Agendar Diagnóstico de Engenharia': 'Schedule an Engineering Diagnosis',
      'Diagnóstico técnico gratuito': 'Free technical diagnosis',
      'Proposta personalizada': 'Personalized proposal',
      'Sem compromisso': 'No commitment',
      /* formulário */
      'Nome': 'Name',
      'O que você precisa resolver?': 'What do you need to solve?',
      'Não preencha este campo': 'Do not fill in this field',
      'Informe seu nome.': 'Enter your name.',
      'Informe o nome da empresa.': 'Enter your company name.',
      'Informe um WhatsApp válido com DDD.': 'Enter a valid WhatsApp number with area code.',
      'Informe um e-mail válido.': 'Enter a valid email address.',
      'Descreva em uma frase o que você precisa resolver.': 'Describe in one sentence what you need to solve.',
      'Enviar mensagem': 'Send message',
      'Enviando…': 'Sending…',
      'Mensagem recebida. Retornamos em até um dia útil.': "Message received. We'll get back to you within one business day.",
      'Não foi possível enviar agora. Escreva para': "We couldn't send it right now. Please write to",
      'Falar no WhatsApp': 'Chat on WhatsApp',
      /* rodapé */
      'A Perceptron é uma empresa de engenharia de software que transforma operações complexas em sistemas inteligentes, robustos e escaláveis. Desenvolvemos software sob medida, automações inteligentes e infraestrutura digital para empresas que querem crescer com eficiência. Nosso objetivo é eliminar gargalos operacionais, integrar processos e criar tecnologia que sustente o crescimento do negócio no longo prazo.': 'Perceptron is a software engineering company that transforms complex operations into intelligent, robust and scalable systems. We build custom software, intelligent automations and digital infrastructure for companies that want to grow efficiently. Our goal is to eliminate operational bottlenecks, integrate processes and create technology that sustains business growth over the long term.',
      'Empresa': 'Company',
      'Recursos': 'Resources',
      'Contato': 'Contact',
      'Sistemas sob medida': 'Custom systems',
      'Automação operacional': 'Operational automation',
      'Engenharia de dados': 'Data engineering',
      'E-mail': 'Email',
      '© 2026 Perceptron · Todos os direitos reservados.': '© 2026 Perceptron · All rights reserved.',
      'Manaus, Amazonas, Brasil': 'Manaus, Amazonas, Brazil',
      'Política de Privacidade': 'Privacy Policy',
      'Termos de Serviço': 'Terms of Service',
      'Engenharia de software sob medida': 'Custom software engineering'
      ,'Engenharia de software para operações que precisam de clareza, integração e continuidade.': 'Software engineering for operations that need clarity, integration and continuity.'
      ,'Produtos': 'Products'
      ,'Processo': 'Process'
      ,'Vamos conversar': "Let's talk"
    }
  };

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  var nodes = [];
  function collect(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var nm = p.nodeName;
        if (nm === 'SCRIPT' || nm === 'STYLE' || nm === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('.lang-switch')) return NodeFilter.FILTER_REJECT;
        if (!norm(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) {
      n.__orig = n.nodeValue;
      n.__key = norm(n.nodeValue);
      n.__lead = n.nodeValue.match(/^\s*/)[0];
      n.__trail = n.nodeValue.match(/\s*$/)[0];
      nodes.push(n);
    }
  }

  function apply(lang) {
    var map = DICT[lang];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (lang === 'pt' || !map) { n.nodeValue = n.__orig; }
      else { var t = map[n.__key]; n.nodeValue = (t != null) ? n.__lead + t + n.__trail : n.__orig; }
    }
    document.documentElement.setAttribute('lang', HTML_LANG[lang] || 'pt-BR');
    var cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = (lang || 'pt').toUpperCase();
    var aopts = document.querySelectorAll('.lang-opt');
    for (var j = 0; j < aopts.length; j++) {
      aopts[j].classList.toggle('is-active', aopts[j].getAttribute('data-lang') === lang);
    }
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  function init() {
    collect(document.body);

    var sw = document.getElementById('langSwitch');
    var trigger = document.getElementById('langTrigger');
    function closeMenu() { if (sw) sw.classList.remove('open'); if (trigger) trigger.setAttribute('aria-expanded', 'false'); }
    function openMenu() { if (sw) sw.classList.add('open'); if (trigger) trigger.setAttribute('aria-expanded', 'true'); }

    if (trigger) {
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (sw.classList.contains('open')) closeMenu(); else openMenu();
      });
    }
    var opts = document.querySelectorAll('.lang-opt');
    for (var k = 0; k < opts.length; k++) {
      opts[k].addEventListener('click', function () {
        apply(this.getAttribute('data-lang'));
        closeMenu();
      });
    }
    document.addEventListener('click', function (e) { if (sw && !sw.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

    var saved;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    apply(saved && DICT[saved] ? saved : 'pt');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

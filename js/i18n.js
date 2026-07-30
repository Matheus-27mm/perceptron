/* ============================================================
   PERCEPTRON — i18n (PT padrão · EN · ES · FR) sem o navegador
   Percorre os nós de texto uma vez, guarda o PT original e troca
   pelo idioma escolhido. Strings sem tradução ficam em PT.
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'perceptron-lang';
  var HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es', fr: 'fr' };

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
      'Sua operação não deveria depender de': "Your operation shouldn't depend on",
      'planilhas e tarefas manuais.': 'spreadsheets and manual tasks.',
      'Desenvolvemos sistemas sob medida e automações inteligentes que eliminam gargalos operacionais e transformam dados dispersos em decisões e resultados.': 'We build custom systems and intelligent automations that eliminate operational bottlenecks and turn scattered data into decisions and results.',
      'Iniciar Diagnóstico Técnico': 'Start a Technical Diagnosis',
      'Ver soluções': 'See solutions',
      'Empresas que já transformaram suas operações conosco': 'Companies that have already transformed their operations with us',
      'scroll': 'scroll',
      /* o que fazemos */
      'Engenharia que remove complexidade e cria escala.': 'Engineering that removes complexity and creates scale.',
      'Sistemas Sob Medida': 'Custom Systems',
      'Soluções proprietárias criadas para as regras e fluxos únicos do seu negócio.': 'Proprietary solutions built for the unique rules and flows of your business.',
      'Automação Operacional': 'Operational Automation',
      'Robôs e fluxos inteligentes que executam tarefas repetitivas em background 24/7.': 'Bots and intelligent flows that run repetitive tasks in the background 24/7.',
      'Engenharia de Dados': 'Data Engineering',
      'Integração, limpeza e consolidação de dados para visibilidade e inteligência.': 'Data integration, cleaning and consolidation for visibility and intelligence.',
      'Integrações & APIs': 'Integrations & APIs',
      'Conectamos sistemas, plataformas e canais para eliminar retrabalho.': 'We connect systems, platforms and channels to eliminate rework.',
      /* software em produção */
      'Sistemas desenvolvidos': "Systems we've built",
      'Software em produção. Resultados reais.': 'Software in production. Real results.',
      'Sistema jurídico completo — processos, prazos, clientes e assistente jurídico com IA.': 'Complete legal system — cases, deadlines, clients and an AI legal assistant.',
      'Centralizou o contencioso e automatizou o controle de prazos críticos.': 'Centralized litigation and automated control of critical deadlines.',
      'Rastreabilidade agrícola e conformidade EUDR — compliance, Score ESG e due diligence de fazendas.': 'Agricultural traceability and EUDR compliance — compliance, ESG Score and farm due diligence.',
      'Unificou a conformidade ambiental e o monitoramento de alertas em tempo real.': 'Unified environmental compliance and real-time alert monitoring.',
      'Gestão para clínicas de estética — CRM, agenda, financeiro e central de WhatsApp em um só lugar.': 'Management for aesthetic clinics — CRM, scheduling, finance and a WhatsApp hub in one place.',
      'Unificou agendamento, vendas e relacionamento com o paciente.': 'Unified scheduling, sales and patient relationships.',
      'CRM sob medida para o comercial — pipeline, negócios, financeiro e relatórios em tempo real.': 'Custom CRM for sales — pipeline, deals, finance and real-time reports.',
      'Deu visibilidade total do funil de vendas e do desempenho financeiro.': 'Gave full visibility of the sales funnel and financial performance.',
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
      'Unimos engenharia sólida, processos inteligentes e tecnologia de ponta para entregar sistemas que realmente impulsionam a sua operação.': 'We combine solid engineering, intelligent processes and cutting-edge technology to deliver systems that truly boost your operation.',
      'Foco total em resultado': 'Total focus on results',
      'Entregamos soluções que resolvem problemas reais e geram impacto mensurável no seu negócio.': 'We deliver solutions that solve real problems and generate measurable impact on your business.',
      'Arquitetura moderna e escalável': 'Modern, scalable architecture',
      'Sistemas preparados para crescer com a sua empresa, suportando alta demanda com estabilidade e performance.': 'Systems ready to grow with your company, handling high demand with stability and performance.',
      'Monitoramento e suporte 24/7': '24/7 monitoring and support',
      'Acompanhamento contínuo da infraestrutura e sistemas para garantir disponibilidade, segurança e respostas rápidas.': 'Continuous monitoring of infrastructure and systems to ensure availability, security and fast responses.',
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
      'Engenharia de software sob medida': 'Custom software engineering'
    },

    es: {
      'O que fazemos': 'Qué hacemos',
      'Soluções': 'Soluciones',
      'Como funciona': 'Cómo funciona',
      'Casos': 'Casos',
      'Sobre nós': 'Sobre nosotros',
      'Falar com a equipe': 'Hablar con el equipo',
      'Iniciar projeto': 'Iniciar proyecto',
      'Engenharia de Software · Automação · Dados': 'Ingeniería de Software · Automatización · Datos',
      'Sua operação não deveria depender de': 'Tu operación no debería depender de',
      'planilhas e tarefas manuais.': 'planillas y tareas manuales.',
      'Desenvolvemos sistemas sob medida e automações inteligentes que eliminam gargalos operacionais e transformam dados dispersos em decisões e resultados.': 'Desarrollamos sistemas a medida y automatizaciones inteligentes que eliminan cuellos de botella operativos y transforman datos dispersos en decisiones y resultados.',
      'Iniciar Diagnóstico Técnico': 'Iniciar Diagnóstico Técnico',
      'Ver soluções': 'Ver soluciones',
      'Empresas que já transformaram suas operações conosco': 'Empresas que ya transformaron sus operaciones con nosotros',
      'scroll': 'desliza',
      'Engenharia que remove complexidade e cria escala.': 'Ingeniería que elimina la complejidad y crea escala.',
      'Sistemas Sob Medida': 'Sistemas a Medida',
      'Soluções proprietárias criadas para as regras e fluxos únicos do seu negócio.': 'Soluciones propias creadas para las reglas y flujos únicos de tu negocio.',
      'Automação Operacional': 'Automatización Operativa',
      'Robôs e fluxos inteligentes que executam tarefas repetitivas em background 24/7.': 'Robots y flujos inteligentes que ejecutan tareas repetitivas en segundo plano 24/7.',
      'Engenharia de Dados': 'Ingeniería de Datos',
      'Integração, limpeza e consolidação de dados para visibilidade e inteligência.': 'Integración, limpieza y consolidación de datos para visibilidad e inteligencia.',
      'Integrações & APIs': 'Integraciones y APIs',
      'Conectamos sistemas, plataformas e canais para eliminar retrabalho.': 'Conectamos sistemas, plataformas y canales para eliminar el retrabajo.',
      'Sistemas desenvolvidos': 'Sistemas desarrollados',
      'Software em produção. Resultados reais.': 'Software en producción. Resultados reales.',
      'Sistema jurídico completo — processos, prazos, clientes e assistente jurídico com IA.': 'Sistema jurídico completo — procesos, plazos, clientes y asistente jurídico con IA.',
      'Centralizou o contencioso e automatizou o controle de prazos críticos.': 'Centralizó el contencioso y automatizó el control de plazos críticos.',
      'Rastreabilidade agrícola e conformidade EUDR — compliance, Score ESG e due diligence de fazendas.': 'Trazabilidad agrícola y cumplimiento EUDR — compliance, Score ESG y due diligence de fincas.',
      'Unificou a conformidade ambiental e o monitoramento de alertas em tempo real.': 'Unificó el cumplimiento ambiental y el monitoreo de alertas en tiempo real.',
      'Gestão para clínicas de estética — CRM, agenda, financeiro e central de WhatsApp em um só lugar.': 'Gestión para clínicas de estética — CRM, agenda, finanzas y central de WhatsApp en un solo lugar.',
      'Unificou agendamento, vendas e relacionamento com o paciente.': 'Unificó la agenda, las ventas y la relación con el paciente.',
      'CRM sob medida para o comercial — pipeline, negócios, financeiro e relatórios em tempo real.': 'CRM a medida para el área comercial — pipeline, negocios, finanzas e informes en tiempo real.',
      'Deu visibilidade total do funil de vendas e do desempenho financeiro.': 'Dio visibilidad total del embudo de ventas y del desempeño financiero.',
      'Quer ver mais detalhes de algum projeto?': '¿Quieres ver más detalles de algún proyecto?',
      'Fale com a nossa equipe →': 'Habla con nuestro equipo →',
      'Um processo técnico. Transparente e contínuo.': 'Un proceso técnico. Transparente y continuo.',
      'Mapeamento': 'Mapeo',
      'Entendemos seu fluxo, dados e gargalos para construir o caminho ideal.': 'Entendemos tu flujo, datos y cuellos de botella para construir el camino ideal.',
      'Arquitetura': 'Arquitectura',
      'Modelamos a solução, dados e integrações antes de escrever qualquer código.': 'Modelamos la solución, los datos y las integraciones antes de escribir una sola línea de código.',
      'Desenvolvimento': 'Desarrollo',
      'Sprints iterativos com entregas constantes e acompanhamento em tempo real.': 'Sprints iterativos con entregas constantes y seguimiento en tiempo real.',
      'Deploy & Evolução': 'Despliegue y Evolución',
      'Deploy seguro, monitoramento contínuo e melhorias sempre ativas.': 'Despliegue seguro, monitoreo continuo y mejoras siempre activas.',
      'Diferenciais': 'Diferenciales',
      'Por que a Perceptron?': '¿Por qué Perceptron?',
      'Unimos engenharia sólida, processos inteligentes e tecnologia de ponta para entregar sistemas que realmente impulsionam a sua operação.': 'Unimos ingeniería sólida, procesos inteligentes y tecnología de punta para entregar sistemas que realmente impulsan tu operación.',
      'Foco total em resultado': 'Foco total en el resultado',
      'Entregamos soluções que resolvem problemas reais e geram impacto mensurável no seu negócio.': 'Entregamos soluciones que resuelven problemas reales y generan un impacto medible en tu negocio.',
      'Arquitetura moderna e escalável': 'Arquitectura moderna y escalable',
      'Sistemas preparados para crescer com a sua empresa, suportando alta demanda com estabilidade e performance.': 'Sistemas preparados para crecer con tu empresa, soportando alta demanda con estabilidad y rendimiento.',
      'Monitoramento e suporte 24/7': 'Monitoreo y soporte 24/7',
      'Acompanhamento contínuo da infraestrutura e sistemas para garantir disponibilidade, segurança e respostas rápidas.': 'Seguimiento continuo de la infraestructura y los sistemas para garantizar disponibilidad, seguridad y respuestas rápidas.',
      'Segurança em todas as camadas': 'Seguridad en todas las capas',
      'Aplicamos as melhores práticas de segurança para proteger dados, processos e integrações de ponta a ponta.': 'Aplicamos las mejores prácticas de seguridad para proteger datos, procesos e integraciones de extremo a extremo.',
      'Integrações inteligentes': 'Integraciones inteligentes',
      'Conectamos sistemas, APIs e plataformas eliminando retrabalho e centralizando informações para decisões melhores.': 'Conectamos sistemas, APIs y plataformas eliminando el retrabajo y centralizando la información para mejores decisiones.',
      'Tecnologia que impulsiona': 'Tecnología que impulsa',
      'Utilizamos o que há de mais eficiente e inovador em tecnologia para criar soluções que otimizam processos e reduzem custos.': 'Utilizamos lo más eficiente e innovador en tecnología para crear soluciones que optimizan procesos y reducen costos.',
      'Tecnologia é meio, não fim.': 'La tecnología es un medio, no un fin.',
      'Nosso compromisso é entender seu negócio a fundo e construir soluções sob medida que tragam eficiência, autonomia e crescimento sustentável.': 'Nuestro compromiso es entender tu negocio a fondo y construir soluciones a medida que aporten eficiencia, autonomía y crecimiento sostenible.',
      'Compromisso com seu sucesso': 'Compromiso con tu éxito',
      '+ Performance': '+ Rendimiento',
      'Soluções otimizadas para máxima eficiência': 'Soluciones optimizadas para la máxima eficiencia',
      '+ Confiabilidade': '+ Fiabilidad',
      'Sistemas robustos, seguros e sempre disponíveis': 'Sistemas robustos, seguros y siempre disponibles',
      'Pronto para transformar sua operação?': '¿Listo para transformar tu operación?',
      'Vamos construir o próximo sistema que vai impulsionar seu negócio.': 'Construyamos el próximo sistema que impulsará tu negocio.',
      'Fale com a nossa equipe e descubra como podemos ajudar a estruturar sua infraestrutura digital.': 'Habla con nuestro equipo y descubre cómo podemos ayudarte a estructurar tu infraestructura digital.',
      'Agendar Diagnóstico de Engenharia': 'Agendar Diagnóstico de Ingeniería',
      'Diagnóstico técnico gratuito': 'Diagnóstico técnico gratuito',
      'Proposta personalizada': 'Propuesta personalizada',
      'Sem compromisso': 'Sin compromiso',
      'Falar com um especialista': 'Hablar con un especialista',
      'A Perceptron é uma empresa de engenharia de software que transforma operações complexas em sistemas inteligentes, robustos e escaláveis. Desenvolvemos software sob medida, automações inteligentes e infraestrutura digital para empresas que querem crescer com eficiência. Nosso objetivo é eliminar gargalos operacionais, integrar processos e criar tecnologia que sustente o crescimento do negócio no longo prazo.': 'Perceptron es una empresa de ingeniería de software que transforma operaciones complejas en sistemas inteligentes, robustos y escalables. Desarrollamos software a medida, automatizaciones inteligentes e infraestructura digital para empresas que quieren crecer con eficiencia. Nuestro objetivo es eliminar cuellos de botella operativos, integrar procesos y crear tecnología que sostenga el crecimiento del negocio a largo plazo.',
      'Empresa': 'Empresa',
      'Recursos': 'Recursos',
      'Contato': 'Contacto',
      'Sistemas sob medida': 'Sistemas a medida',
      'Automação operacional': 'Automatización operativa',
      'Engenharia de dados': 'Ingeniería de datos',
      'E-mail': 'Correo',
      '© 2026 Perceptron · Todos os direitos reservados.': '© 2026 Perceptron · Todos los derechos reservados.',
      'Engenharia de software sob medida': 'Ingeniería de software a medida'
    },

    fr: {
      'O que fazemos': 'Ce que nous faisons',
      'Soluções': 'Solutions',
      'Como funciona': 'Comment ça marche',
      'Casos': 'Cas',
      'Sobre nós': 'À propos',
      'Falar com a equipe': "Parler à l'équipe",
      'Iniciar projeto': 'Démarrer un projet',
      'Engenharia de Software · Automação · Dados': 'Génie Logiciel · Automatisation · Données',
      'Sua operação não deveria depender de': 'Votre opération ne devrait pas dépendre de',
      'planilhas e tarefas manuais.': 'tableurs et de tâches manuelles.',
      'Desenvolvemos sistemas sob medida e automações inteligentes que eliminam gargalos operacionais e transformam dados dispersos em decisões e resultados.': "Nous développons des systèmes sur mesure et des automatisations intelligentes qui éliminent les goulots d'étranglement opérationnels et transforment des données dispersées en décisions et en résultats.",
      'Iniciar Diagnóstico Técnico': 'Démarrer le Diagnostic Technique',
      'Ver soluções': 'Voir les solutions',
      'Empresas que já transformaram suas operações conosco': 'Des entreprises qui ont déjà transformé leurs opérations avec nous',
      'scroll': 'défiler',
      'Engenharia que remove complexidade e cria escala.': "Une ingénierie qui supprime la complexité et crée de l'échelle.",
      'Sistemas Sob Medida': 'Systèmes Sur Mesure',
      'Soluções proprietárias criadas para as regras e fluxos únicos do seu negócio.': 'Des solutions propriétaires conçues pour les règles et flux uniques de votre entreprise.',
      'Automação Operacional': 'Automatisation Opérationnelle',
      'Robôs e fluxos inteligentes que executam tarefas repetitivas em background 24/7.': 'Des robots et flux intelligents qui exécutent les tâches répétitives en arrière-plan 24h/24 et 7j/7.',
      'Engenharia de Dados': 'Ingénierie des Données',
      'Integração, limpeza e consolidação de dados para visibilidade e inteligência.': 'Intégration, nettoyage et consolidation des données pour la visibilité et l\'intelligence.',
      'Integrações & APIs': 'Intégrations & APIs',
      'Conectamos sistemas, plataformas e canais para eliminar retrabalho.': 'Nous connectons systèmes, plateformes et canaux pour éliminer les tâches redondantes.',
      'Sistemas desenvolvidos': 'Systèmes développés',
      'Software em produção. Resultados reais.': 'Des logiciels en production. Des résultats réels.',
      'Sistema jurídico completo — processos, prazos, clientes e assistente jurídico com IA.': 'Système juridique complet — dossiers, délais, clients et assistant juridique IA.',
      'Centralizou o contencioso e automatizou o controle de prazos críticos.': 'A centralisé le contentieux et automatisé le suivi des délais critiques.',
      'Rastreabilidade agrícola e conformidade EUDR — compliance, Score ESG e due diligence de fazendas.': 'Traçabilité agricole et conformité EUDR — compliance, Score ESG et due diligence des exploitations.',
      'Unificou a conformidade ambiental e o monitoramento de alertas em tempo real.': 'A unifié la conformité environnementale et la surveillance des alertes en temps réel.',
      'Gestão para clínicas de estética — CRM, agenda, financeiro e central de WhatsApp em um só lugar.': 'Gestion pour cliniques esthétiques — CRM, agenda, finances et hub WhatsApp en un seul endroit.',
      'Unificou agendamento, vendas e relacionamento com o paciente.': 'A unifié la prise de rendez-vous, les ventes et la relation patient.',
      'CRM sob medida para o comercial — pipeline, negócios, financeiro e relatórios em tempo real.': 'CRM sur mesure pour le commercial — pipeline, affaires, finances et rapports en temps réel.',
      'Deu visibilidade total do funil de vendas e do desempenho financeiro.': "A donné une visibilité totale sur l'entonnoir de ventes et la performance financière.",
      'Quer ver mais detalhes de algum projeto?': 'Vous voulez voir plus de détails sur un projet ?',
      'Fale com a nossa equipe →': 'Parlez à notre équipe →',
      'Um processo técnico. Transparente e contínuo.': 'Un processus technique. Transparent et continu.',
      'Mapeamento': 'Cartographie',
      'Entendemos seu fluxo, dados e gargalos para construir o caminho ideal.': "Nous comprenons votre flux, vos données et vos goulots d'étranglement pour bâtir le chemin idéal.",
      'Arquitetura': 'Architecture',
      'Modelamos a solução, dados e integrações antes de escrever qualquer código.': "Nous modélisons la solution, les données et les intégrations avant d'écrire la moindre ligne de code.",
      'Desenvolvimento': 'Développement',
      'Sprints iterativos com entregas constantes e acompanhamento em tempo real.': 'Des sprints itératifs avec des livraisons constantes et un suivi en temps réel.',
      'Deploy & Evolução': 'Déploiement & Évolution',
      'Deploy seguro, monitoramento contínuo e melhorias sempre ativas.': 'Déploiement sécurisé, surveillance continue et améliorations permanentes.',
      'Diferenciais': 'Nos atouts',
      'Por que a Perceptron?': 'Pourquoi Perceptron ?',
      'Unimos engenharia sólida, processos inteligentes e tecnologia de ponta para entregar sistemas que realmente impulsionam a sua operação.': "Nous réunissons une ingénierie solide, des processus intelligents et une technologie de pointe pour livrer des systèmes qui propulsent réellement votre opération.",
      'Foco total em resultado': 'Concentrés sur le résultat',
      'Entregamos soluções que resolvem problemas reais e geram impacto mensurável no seu negócio.': 'Nous livrons des solutions qui résolvent de vrais problèmes et génèrent un impact mesurable sur votre activité.',
      'Arquitetura moderna e escalável': 'Architecture moderne et évolutive',
      'Sistemas preparados para crescer com a sua empresa, suportando alta demanda com estabilidade e performance.': 'Des systèmes prêts à grandir avec votre entreprise, supportant une forte demande avec stabilité et performance.',
      'Monitoramento e suporte 24/7': 'Surveillance et support 24h/24 et 7j/7',
      'Acompanhamento contínuo da infraestrutura e sistemas para garantir disponibilidade, segurança e respostas rápidas.': 'Un suivi continu de l\'infrastructure et des systèmes pour garantir disponibilité, sécurité et réactivité.',
      'Segurança em todas as camadas': 'Sécurité à toutes les couches',
      'Aplicamos as melhores práticas de segurança para proteger dados, processos e integrações de ponta a ponta.': 'Nous appliquons les meilleures pratiques de sécurité pour protéger données, processus et intégrations de bout en bout.',
      'Integrações inteligentes': 'Intégrations intelligentes',
      'Conectamos sistemas, APIs e plataformas eliminando retrabalho e centralizando informações para decisões melhores.': "Nous connectons systèmes, APIs et plateformes en éliminant les tâches redondantes et en centralisant l'information pour de meilleures décisions.",
      'Tecnologia que impulsiona': 'Une technologie qui propulse',
      'Utilizamos o que há de mais eficiente e inovador em tecnologia para criar soluções que otimizam processos e reduzem custos.': "Nous utilisons ce qu'il y a de plus efficace et innovant en technologie pour créer des solutions qui optimisent les processus et réduisent les coûts.",
      'Tecnologia é meio, não fim.': 'La technologie est un moyen, pas une fin.',
      'Nosso compromisso é entender seu negócio a fundo e construir soluções sob medida que tragam eficiência, autonomia e crescimento sustentável.': "Notre engagement : comprendre votre activité en profondeur et bâtir des solutions sur mesure qui apportent efficacité, autonomie et croissance durable.",
      'Compromisso com seu sucesso': 'Engagés pour votre réussite',
      '+ Performance': '+ Performance',
      'Soluções otimizadas para máxima eficiência': 'Des solutions optimisées pour une efficacité maximale',
      '+ Confiabilidade': '+ Fiabilité',
      'Sistemas robustos, seguros e sempre disponíveis': 'Des systèmes robustes, sûrs et toujours disponibles',
      'Pronto para transformar sua operação?': 'Prêt à transformer votre opération ?',
      'Vamos construir o próximo sistema que vai impulsionar seu negócio.': 'Construisons le prochain système qui propulsera votre entreprise.',
      'Fale com a nossa equipe e descubra como podemos ajudar a estruturar sua infraestrutura digital.': 'Parlez à notre équipe et découvrez comment nous pouvons structurer votre infrastructure numérique.',
      'Agendar Diagnóstico de Engenharia': "Planifier un Diagnostic d'Ingénierie",
      'Diagnóstico técnico gratuito': 'Diagnostic technique gratuit',
      'Proposta personalizada': 'Proposition personnalisée',
      'Sem compromisso': 'Sans engagement',
      'Falar com um especialista': 'Parler à un spécialiste',
      'A Perceptron é uma empresa de engenharia de software que transforma operações complexas em sistemas inteligentes, robustos e escaláveis. Desenvolvemos software sob medida, automações inteligentes e infraestrutura digital para empresas que querem crescer com eficiência. Nosso objetivo é eliminar gargalos operacionais, integrar processos e criar tecnologia que sustente o crescimento do negócio no longo prazo.': "Perceptron est une entreprise de génie logiciel qui transforme des opérations complexes en systèmes intelligents, robustes et évolutifs. Nous développons des logiciels sur mesure, des automatisations intelligentes et des infrastructures numériques pour les entreprises qui veulent croître efficacement. Notre objectif est d'éliminer les goulots d'étranglement opérationnels, d'intégrer les processus et de créer une technologie qui soutient la croissance de l'entreprise sur le long terme.",
      'Empresa': 'Entreprise',
      'Recursos': 'Ressources',
      'Contato': 'Contact',
      'Sistemas sob medida': 'Systèmes sur mesure',
      'Automação operacional': 'Automatisation opérationnelle',
      'Engenharia de dados': 'Ingénierie des données',
      'E-mail': 'E-mail',
      '© 2026 Perceptron · Todos os direitos reservados.': '© 2026 Perceptron · Tous droits réservés.',
      'Engenharia de software sob medida': 'Génie logiciel sur mesure'
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

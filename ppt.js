const { useState, useEffect } = React;

const heroMetrics = [
  { label: "+25 años", detail: "Distribución oficial de GLP en la Axarquía y Málaga" },
  { label: "24/7", detail: "Avisos de urgencia y soporte técnico continuo" },
  { label: "CRM-ready", detail: "Preparado para Salesforce, HubSpot o tu gestor actual" },
];

const services = [
  {
    icon: "⛽",
    title: "Suministro de butano y propano",
    description:
      "Entrega programada o urgente, control de stock y rutas optimizadas con trazabilidad.",
    points: [
      "Avisos de reposición y cargas monitorizadas",
      "Flota conectada con localización en vivo",
      "Alertas de seguridad y certificaciones al día",
    ],
  },
  {
    icon: "🏭",
    title: "Instalaciones y mantenimiento",
    description:
      "Diseño, legalización y mantenimiento de instalaciones industriales, comerciales y domésticas.",
    points: [
      "Revisiones periódicas y boletines reglamentarios",
      "Ingeniería y proyectos llave en mano",
      "Inspecciones de seguridad y soporte preventivo",
    ],
  },
  {
    icon: "🤝",
    title: "Atención y asesoría",
    description:
      "Acompañamiento cercano para comunidades, hostelería y empresas con formación y soporte.",
    points: [
      "Canal único para incidencias y solicitudes",
      "Chatbot + agentes conectados al CRM",
      "Gestión documental y facturación digital",
    ],
  },
];

const operationsSteps = [
  {
    badge: "1",
    tone: "status--ok",
    title: "Recepción y priorización",
    copy: "Recibimos avisos de carga, averías o nuevas altas y las clasificamos por criticidad.",
  },
  {
    badge: "2",
    tone: "status--warning",
    title: "Asignación automática",
    copy: "Enrutamos al técnico o a logística según zona, SLA y disponibilidad de producto.",
  },
  {
    badge: "3",
    tone: "status--info",
    title: "Ejecución y seguimiento",
    copy: "Checklists, fotos y firmas digitales para mantener la trazabilidad completa.",
  },
  {
    badge: "4",
    tone: "status",
    title: "Cierre y métricas",
    copy: "Confirmamos con el cliente, emitimos certificados y actualizamos KPIs en CRM.",
  },
];

const crmPillars = [
  {
    title: "Salesforce Service & Sales Cloud",
    copy: "Casos, rutas y oportunidades sincronizadas. Macros y colas para acelerar la atención.",
  },
  {
    title: "Chatbot + humano",
    copy: "Deriva conversaciones a agentes con contexto, historial y compromisos visibles.",
  },
  {
    title: "Datos en tiempo real",
    copy: "APIs para órdenes, inventario y facturación que alimentan tus reportes o BI.",
  },
];

const clients = [
  { title: "Industria", copy: "Suministro continuo, control de consumos y soporte 24/7." },
  { title: "Residencial", copy: "Recargas planificadas, avisos de seguridad y asistencia cercana." },
  { title: "Hostelería", copy: "Gestión multi-sucursal, mantenimiento preventivo y facturación ágil." },
];

const quickReplies = [
  "Quiero programar una recarga",
  "Necesito asistencia técnica urgente",
  "¿Cómo integro Salesforce?",
];

function useToast() {
  const [toast, setToast] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toast) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  return {
    toast,
    visible,
    show: (message) => setToast(message),
  };
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hola, somos Axar Gas. Podemos ayudarte con pedidos de GLP, instalaciones y soporte.",
    },
  ]);

  const { toast, visible, show } = useToast();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const addMessage = (text, from) => {
    setMessages((prev) => [...prev, { from, text }]);
    const container = document.querySelector(".chatbot__messages");
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }
  };

  const botReply = (text) => {
    const lower = text.toLowerCase();
    let reply = "Solicitud registrada. La asignamos al equipo correspondiente.";

    if (lower.includes("salesforce")) {
      reply =
        "Integramos con Salesforce Service Cloud para casos y con Sales Cloud para oportunidades.";
    } else if (lower.includes("recarga")) {
      reply = "Programamos la recarga y activamos alertas de inventario en tu CRM.";
    } else if (lower.includes("urgente") || lower.includes("asistencia")) {
      reply = "Abro ticket crítico y derivo a operaciones con SLA de respuesta inmediata.";
    }

    setTimeout(() => addMessage(reply, "bot"), 380);
  };

  const handleSend = (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.elements.mensaje;
    const value = input.value.trim();
    if (!value) return;
    addMessage(value, "user");
    botReply(value);
    input.value = "";
  };

  const handleQuick = (text) => {
    addMessage(text, "user");
    botReply(text);
    setChatOpen(true);
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    setRequestStatus("Enviando...");
    setTimeout(() => {
      setRequestStatus("Solicitud enviada. Sincronizando con Salesforce/CRM.");
      show("Solicitud creada y asignada.");
      setRequestOpen(false);
      setChatOpen(true);
      addMessage("Nueva solicitud registrada desde la pestaña.", "bot");
    }, 650);
  };

  const handlePreview = () => {
    setRequestOpen(true);
    setChatOpen(true);
    show("Vista previa interactiva activada: pestaña y chatbot abiertos.");
    addMessage("Mostrando vista previa con pestaña y chatbot abiertos.", "bot");
  };

  return (
    <>
      <div className="page">
        <header className="top-bar">
          <div className="brand">
            <div className="brand__logo">Axar</div>
            <div className="brand__tagline">Gas &amp; Soluciones</div>
          </div>
          <nav className="menu" aria-label="Principal">
            <button
              className="menu__toggle"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className={`menu__items ${menuOpen ? "is-open" : ""}`}>
              <li>
                <a href="#servicios" onClick={(e) => e.preventDefault() || scrollToId("servicios")}>Servicios</a>
              </li>
              <li>
                <a href="#operaciones" onClick={(e) => e.preventDefault() || scrollToId("operaciones")}>
                  Operaciones
                </a>
              </li>
              <li>
                <a href="#crm" onClick={(e) => e.preventDefault() || scrollToId("crm")}>
                  Gestión clientes
                </a>
              </li>
              <li>
                <a href="#quienes" onClick={(e) => e.preventDefault() || scrollToId("quienes")}>
                  Quiénes somos
                </a>
              </li>
              <li>
                <a href="#contacto" onClick={(e) => e.preventDefault() || scrollToId("contacto")}>
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
          <div className="top-bar__actions">
            <button className="cta cta--ghost" type="button" onClick={handlePreview}>
              Ver vista previa
            </button>
            <button className="cta cta--ghost" type="button" onClick={() => setRequestOpen(true)}>
              Solicitud
            </button>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="hero__content">
              <p className="pill">Inspirado en axargassl.es · visión 2024</p>
              <h1>
                Axar Gas S.L.: suministro seguro, instalaciones homologadas y atención inmediata desde
                la Axarquía para toda Málaga.
              </h1>
              <p className="lead">
                Integramos la experiencia real de Axar Gas en una interfaz moderna, responsive y lista
                para conectarse con Salesforce o el gestor que utilices. Activa solicitudes, chat y
                seguimiento de operaciones en un solo panel.
              </p>
              <div className="hero__actions">
                <a className="cta" href="#servicios" onClick={(e) => e.preventDefault() || scrollToId("servicios")}>
                  Conocer servicios
                </a>
                <button className="cta cta--ghost" onClick={() => setRequestOpen(true)}>
                  Crear solicitud
                </button>
              </div>
              <div className="metrics">
                {heroMetrics.map((item) => (
                  <div key={item.label}>
                    <span>{item.label}</span>
                    <small>{item.detail}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero__panel" aria-label="Panel de operación">
              <div className="panel__header">
                <div>
                  <p>Estado operativo</p>
                  <strong>Suministro estable</strong>
                </div>
                <span className="status status--ok">Activo</span>
              </div>
              <div className="panel__cards">
                <article>
                  <p>Inventario</p>
                  <h3>85%</h3>
                  <small>Depósitos principales · Reposición en 6h</small>
                </article>
                <article>
                  <p>Vehículos en ruta</p>
                  <h3>12</h3>
                  <small>Seguimiento en tiempo real</small>
                </article>
                <article>
                  <p>Solicitudes abiertas</p>
                  <h3>9</h3>
                  <small>3 para logística, 6 en soporte técnico</small>
                </article>
              </div>
              <div className="panel__footer">
                <p>Integración sugerida</p>
                <div className="chips">
                  <span className="chip">Salesforce Service Cloud</span>
                  <span className="chip">HubSpot</span>
                  <span className="chip">API Axar Gas</span>
                </div>
              </div>
            </div>
          </section>

          <section id="quienes" className="section section--alt">
            <div className="section__header">
              <p className="pill">Quiénes somos</p>
              <h2>Axar Gas S.L., especialistas en GLP en la Costa del Sol</h2>
              <p>
                Empresa familiar con más de dos décadas abasteciendo butano y propano, instalando y
                manteniendo redes de gas para hogares, hostelería y grandes consumos. Operamos desde la
                Axarquía con cobertura en toda Málaga.
              </p>
            </div>
            <div className="pillars">
              <article>
                <h3>Distribución oficial</h3>
                <p>Rutas diarias, pedidos telefónicos y digitales, avisos de seguridad y certificados.</p>
              </article>
              <article>
                <h3>Instalaciones y legalización</h3>
                <p>Proyectos llave en mano con ingeniería, boletines y mantenimiento periódico.</p>
              </article>
              <article>
                <h3>Emergencias y cercanía</h3>
                <p>Atención inmediata 24/7, revisión de fugas y asesoría personalizada.</p>
              </article>
            </div>
          </section>

          <section id="servicios" className="section section--grid">
            <div className="section__header">
              <p className="pill">Servicios</p>
              <h2>Soluciones integrales de GLP y energía</h2>
              <p>
                Todo lo que ya ofrece Axar Gas en una vista moderna: suministro, ingeniería, mantenimiento
                y soporte con trazabilidad digital.
              </p>
            </div>
            <div className="cards-grid">
              {services.map((service) => (
                <article className="card" key={service.title}>
                  <div className="icon" aria-hidden>{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="operaciones" className="section section--split">
            <div>
              <p className="pill">Operaciones</p>
              <h2>Transparencia y control continuo</h2>
              <p>
                Visualiza el avance de cada solicitud, el estado de seguridad y las visitas técnicas con
                indicadores claros.
              </p>
              <div className="timeline">
                {operationsSteps.map((step) => (
                  <div className="step" key={step.title}>
                    <span className={`status ${step.tone}`}>{step.badge}</span>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="widget">
              <div className="widget__header">
                <div>
                  <p>Panel de campo</p>
                  <strong>12 equipos activos</strong>
                </div>
                <span className="status status--info">Tiempo real</span>
              </div>
              <div className="widget__body">
                <div className="badge-row">
                  <span className="chip">Seguridad</span>
                  <span className="chip">IoT sensores</span>
                  <span className="chip">Rutas verdes</span>
                </div>
                <div className="progress">
                  <div className="progress__bar" style={{ width: "78%" }}></div>
                </div>
                <p className="small">78% de solicitudes resueltas en menos de 2h.</p>
                <div className="mini-cards">
                  <div>
                    <p>Riesgo</p>
                    <strong>Bajo</strong>
                    <small>0 incidentes críticos</small>
                  </div>
                  <div>
                    <p>Recorridos</p>
                    <strong>560 km</strong>
                    <small>Planificados hoy</small>
                  </div>
                  <div>
                    <p>Coordinaciones</p>
                    <strong>32</strong>
                    <small>Visitas técnicas</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="crm" className="section section--alt">
            <div className="section__header">
              <p className="pill">Gestión de clientes</p>
              <h2>CRM listo para Salesforce, HubSpot o la plataforma que uses</h2>
              <p>
                Diseñamos la experiencia para que cada interacción alimente tu embudo comercial, con
                automatizaciones y playbooks específicos para servicios energéticos.
              </p>
            </div>
            <div className="pillars">
              {crmPillars.map((pillar) => (
                <article key={pillar.title}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="clientes" className="section">
            <div className="section__header">
              <p className="pill">Confianza</p>
              <h2>Hecho para clientes industriales y residenciales</h2>
              <p>
                Visibilidad total, asistencia rápida y atención personalizada con una interfaz ligera y
                moderna.
              </p>
            </div>
            <div className="cards-grid cards-grid--compact">
              {clients.map((client) => (
                <article className="card card--line" key={client.title}>
                  <h3>{client.title}</h3>
                  <p>{client.copy}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="contacto" className="section section--cta">
            <div className="section__header">
              <p className="pill">Contacto</p>
              <h2>¿Listo para modernizar la experiencia de tus clientes?</h2>
              <p>
                Agenda una demo, configura el chatbot o activa la pestaña de solicitudes para tu operación.
              </p>
            </div>
            <div className="cta-block">
              <div>
                <h3>Activar demo</h3>
                <p>Personalizamos el flujo con los datos de tu operación.</p>
              </div>
              <button className="cta" onClick={() => setRequestOpen(true)}>
                Iniciar solicitud
              </button>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div>
            <strong>Axar Gas</strong>
            <p>Operación segura, experiencia moderna y soporte inteligente.</p>
          </div>
          <div className="footer__links">
            <a href="#servicios" onClick={(e) => e.preventDefault() || scrollToId("servicios")}>
              Servicios
            </a>
            <a href="#crm" onClick={(e) => e.preventDefault() || scrollToId("crm")}>
              CRM
            </a>
            <a href="#contacto" onClick={(e) => e.preventDefault() || scrollToId("contacto")}>
              Contacto
            </a>
          </div>
          <p className="small">© 2024 Axar Gas · Versión conceptual</p>
        </footer>
      </div>

      <button className="request-tab" aria-controls="solicitud-panel" onClick={() => setRequestOpen(true)}>
        Solicitud
      </button>

      <aside
        id="solicitud-panel"
        className={`request-panel ${requestOpen ? "is-open" : ""}`}
        aria-label="Solicitud de servicio"
        aria-hidden={!requestOpen}
      >
        <div className="request-panel__header">
          <div>
            <p>Pestaña de solicitud</p>
            <strong>Atención inmediata</strong>
          </div>
          <button className="icon-button" aria-label="Cerrar solicitud" onClick={() => setRequestOpen(false)}>
            ✕
          </button>
        </div>
        <form className="request-form" onSubmit={handleRequestSubmit}>
          <label>
            Nombre y empresa
            <input type="text" name="nombre" placeholder="Ej. Laura · Axar Gas" required />
          </label>
          <label>
            Correo
            <input type="email" name="email" placeholder="tu@correo.com" required />
          </label>
          <label>
            Tipo de solicitud
            <select name="tipo">
              <option>Recarga / logística</option>
              <option>Mantenimiento</option>
              <option>Proyecto nuevo</option>
              <option>Atención comercial</option>
            </select>
          </label>
          <label>
            CRM / Gestión de clientes
            <select name="crm">
              <option>Salesforce Service Cloud</option>
              <option>Salesforce Sales Cloud</option>
              <option>HubSpot</option>
              <option>Otro CRM</option>
            </select>
          </label>
          <label>
            Detalles
            <textarea name="detalle" rows="3" placeholder="Cuéntanos qué necesitas"></textarea>
          </label>
          <button type="submit" className="cta">Enviar solicitud</button>
          <p className="small">Respuesta automática + derivación a agente.</p>
          <p className="request-form__status" role="status">{requestStatus}</p>
        </form>
      </aside>

      <button
        className="chat-button"
        aria-controls="chatbot"
        aria-label="Abrir chatbot"
        onClick={() => setChatOpen((open) => !open)}
      >
        💬
      </button>

      <section id="chatbot" className={`chatbot ${chatOpen ? "is-open" : ""}`} aria-hidden={!chatOpen}>
        <header className="chatbot__header">
          <div>
            <p>Chat Axar Gas</p>
            <strong>Asistente 24/7</strong>
          </div>
          <button className="icon-button" aria-label="Cerrar chatbot" onClick={() => setChatOpen(false)}>
            ✕
          </button>
        </header>
        <div className="chatbot__messages" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.from}-${index}`}
              className={`message ${message.from === "bot" ? "message--bot" : "message--user"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chatbot__quick">
          {quickReplies.map((reply) => (
            <button key={reply} type="button" onClick={() => handleQuick(reply)}>
              {reply}
            </button>
          ))}
        </div>
        <form className="chatbot__form" onSubmit={handleSend}>
          <input type="text" name="mensaje" placeholder="Escribe tu mensaje" aria-label="Mensaje" required />
          <button type="submit">Enviar</button>
        </form>
      </section>

      <div className={`toast ${visible ? "is-visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

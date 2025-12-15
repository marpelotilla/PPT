(function ($) {
  const requestPanel = $("#solicitud-panel");
  const requestTab = $(".request-tab");
  const chatButton = $(".chat-button");
  const chatbot = $("#chatbot");
  const toast = $(".toast");
  const menuToggle = $(".menu__toggle");
  const menuItems = $(".menu__items");

  function toggleRequest(open) {
    requestPanel.toggleClass("is-open", open);
    requestPanel.attr("aria-hidden", !open);
  }

  function toggleChat(open) {
    chatbot.toggleClass("is-open", open);
    chatbot.attr("aria-hidden", !open);
  }

  function showToast(message) {
    toast.text(message).addClass("is-visible");
    setTimeout(() => toast.removeClass("is-visible"), 2400);
  }

  // Request tab interactions
  $("[data-open-request]").on("click", () => toggleRequest(true));
  $("[data-close-request]").on("click", () => toggleRequest(false));
  requestTab.on("click", () => toggleRequest(true));

  // Preview helper
  $("[data-preview]").on("click", () => {
    toggleRequest(true);
    toggleChat(true);
    showToast("Vista previa abierta: pestaña y chatbot activos.");
    addMessage("Mostrando vista previa interactiva.", "bot");
  });

  // Chatbot interactions
  chatButton.on("click", () => toggleChat(!chatbot.hasClass("is-open")));
  $("[data-close-chat]").on("click", () => toggleChat(false));

  // Quick replies
  $(".chatbot__quick button").on("click", function () {
    const text = $(this).data("quick");
    addMessage(text, "user");
    botReply(text);
  });

  // Chat form submit
  $(".chatbot__form").on("submit", function (event) {
    event.preventDefault();
    const input = $(this).find("input[name='mensaje']");
    const value = input.val().trim();
    if (!value) return;
    addMessage(value, "user");
    botReply(value);
    input.val("");
  });

  function addMessage(text, type) {
    const message = $("<div>").addClass("message");
    message.addClass(type === "bot" ? "message--bot" : "message--user");
    message.text(text);
    const container = $(".chatbot__messages");
    container.append(message);
    container.scrollTop(container.prop("scrollHeight"));
  }

  function botReply(userText) {
    const lower = userText.toLowerCase();
    let reply = "¡Listo! He registrado tu solicitud y la asignaré al equipo adecuado.";

    if (lower.includes("salesforce")) {
      reply =
        "Podemos conectar con Salesforce Service Cloud en menos de 1 día: casos, colas y macros listas.";
    } else if (lower.includes("recarga")) {
      reply =
        "Programa la recarga desde la pestaña Solicitud y activa alertas automáticas de inventario.";
    } else if (lower.includes("soporte")) {
      reply = "Abro ticket técnico y escalo a operaciones si es crítico.";
    }

    setTimeout(() => addMessage(reply, "bot"), 400);
  }

  // Request form submission (demo)
  $(".request-form").on("submit", function (event) {
    event.preventDefault();
    const status = $(this).find(".request-form__status");
    status.text("Enviando...");

    setTimeout(() => {
      status.text("Solicitud enviada. Enlazando con Salesforce/CRM");
      showToast("Solicitud creada y asignada.");
      toggleRequest(false);
      toggleChat(true);
      addMessage("Nueva solicitud registrada desde la pestaña.", "bot");
    }, 600);
  });

  // Menu toggle for mobile
  menuToggle.on("click", function () {
    const open = !menuItems.hasClass("is-open");
    menuItems.toggleClass("is-open", open);
    $(this).attr("aria-expanded", open);
  });

  // Smooth scrolling for anchor links
  $("a[href^='#']").on("click", function (event) {
    const target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: target.offset().top - 40 }, 400);
    }
  });
})(jQuery);

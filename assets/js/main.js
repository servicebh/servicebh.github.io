(() => {
  "use strict";

  const whatsappNumber = "5531982766011";
  const nav = document.querySelector(".navbar");
  const year = document.querySelector("#currentYear");
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightboxModal = document.querySelector("#lightboxModal");
  const quoteForm = document.querySelector("#quoteForm");
  const servicePresetButtons = document.querySelectorAll("[data-service-preset]");
  const navbarMenu = document.querySelector("#navbarMenu");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateNavbar = () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 30);
  };

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);

    if (prefersReducedMotion) {
      counter.textContent = target.toLocaleString("pt-BR") + "+";
      return;
    }

    const duration = 1600;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      counter.textContent = value.toLocaleString("pt-BR");

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = target.toLocaleString("pt-BR") + "+";
      }
    };

    requestAnimationFrame(tick);
  };

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  if (navbarMenu && window.bootstrap) {
    const collapse = window.bootstrap.Collapse.getOrCreateInstance(navbarMenu, { toggle: false });
    navbarMenu.querySelectorAll("a.nav-link, a.btn").forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarMenu.classList.contains("show")) {
          collapse.hide();
        }
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = "true";
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    counters.forEach(animateCounter);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      galleryItems.forEach((item) => {
        const shouldShow = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  servicePresetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceField = document.querySelector("#service");
      if (!serviceField) return;

      serviceField.value = button.dataset.servicePreset || "";
      serviceField.dispatchEvent(new Event("change", { bubbles: true }));
      serviceField.focus({ preventScroll: true });
    });
  });

  if (lightboxModal) {
    lightboxModal.addEventListener("show.bs.modal", (event) => {
      const trigger = event.relatedTarget;
      const image = document.querySelector("#lightboxImage");
      const title = document.querySelector("#lightboxTitle");

      if (!trigger || !image || !title) return;

      const imageUrl = trigger.getAttribute("data-image");
      const imageTitle = trigger.getAttribute("data-title") || "Projeto Service";

      image.src = imageUrl;
      image.alt = imageTitle;
      title.textContent = imageTitle;
    });

    lightboxModal.addEventListener("hidden.bs.modal", () => {
      const image = document.querySelector("#lightboxImage");
      if (image) {
        image.src = "";
        image.alt = "";
      }
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!quoteForm.reportValidity()) return;

      const data = new FormData(quoteForm);
      if (String(data.get("website") || "").trim()) return;

      const clean = (value, fallback = "Não informado", maxLength = 600) => {
        const text = String(value || "")
          .replace(/[\u0000-\u001f\u007f]+/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, maxLength);

        return text || fallback;
      };

      const lines = [
        "Olá, gostaria de fazer um orçamento.",
        "",
        `Nome: ${clean(data.get("name"), "", 80)}`,
        `Empresa: ${clean(data.get("company"), "Não informado", 100)}`,
        `Telefone: ${clean(data.get("phone"), "", 20)}`,
        `E-mail: ${clean(data.get("email"), "Não informado", 120)}`,
        `Cidade: ${clean(data.get("city"), "", 80)}`,
        `Serviço desejado: ${clean(data.get("service"), "", 80)}`,
        `Mensagem: ${clean(data.get("message"), "Não informado", 600)}`
      ];

      const message = encodeURIComponent(lines.join("\n"));
      const popup = window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
      if (popup) popup.opener = null;
    });
  }
})();

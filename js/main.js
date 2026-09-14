(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* Year */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Progress + header */
  const header = $("#header");
  const progressBar = $("#progressBar");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll-linked background atmosphere (site-wide) */
  let orbA = null;
  let orbB = null;
  let orbC = null;

  if (!prefersReduced) {
    const atmosphere = document.createElement("div");
    atmosphere.className = "scroll-atmosphere";
    atmosphere.setAttribute("aria-hidden", "true");
    atmosphere.innerHTML = `
      <span class="scroll-atmosphere__orb scroll-atmosphere__orb--a" data-orb="a"></span>
      <span class="scroll-atmosphere__orb scroll-atmosphere__orb--b" data-orb="b"></span>
      <span class="scroll-atmosphere__orb scroll-atmosphere__orb--c" data-orb="c"></span>
      <span class="scroll-atmosphere__grain"></span>
    `;
    document.body.prepend(atmosphere);
    orbA = atmosphere.querySelector('[data-orb="a"]');
    orbB = atmosphere.querySelector('[data-orb="b"]');
    orbC = atmosphere.querySelector('[data-orb="c"]');
  }

  let scrollTicking = false;

  function updateScrollAtmosphere() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? y / max : 0;

    document.documentElement.style.setProperty("--scroll-y", `${y}px`);
    document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));

    header?.classList.toggle("is-scrolled", y > 50);
    if (progressBar) progressBar.style.width = `${progress * 100}%`;

    if (orbA) {
      orbA.style.transform = `translate3d(${progress * 40}px, ${y * 0.18}px, 0)`;
      orbB.style.transform = `translate3d(${progress * -55}px, ${y * -0.12}px, 0)`;
      orbC.style.transform = `translate3d(${Math.sin(progress * Math.PI) * 30}px, ${y * 0.08}px, 0)`;
    }

    scrollTicking = false;
  }

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollAtmosphere);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollAtmosphere();

  /* Mobile nav */
  const navToggle = $("#navToggle");
  const nav = $("#nav");

  function closeNav() {
    nav?.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  navToggle?.addEventListener("click", () => {
    const open = !nav?.classList.contains("is-open");
    nav?.classList.toggle("is-open", open);
    navToggle.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  $$(".nav a").forEach((a) => a.addEventListener("click", closeNav));

  /* Scroll reveal */
  const revealEls = $$(".reveal");

  function showReveal(el) {
    const delay = Number(el.dataset.delay || 0);
    if (delay > 0) {
      setTimeout(() => el.classList.add("is-visible"), delay);
    } else {
      el.classList.add("is-visible");
    }
  }

  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showReveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Homepage / page scroll effects: hero parallax */
  const heroImg = $(".hero__bg img");
  const pageHeroImg = $(".page-hero__bg img");

  if (!prefersReduced && (heroImg || pageHeroImg)) {
    let parallaxTicking = false;

    function updateParallax() {
      const y = window.scrollY;

      if (heroImg) {
        const shift = Math.min(y * 0.32, 160);
        heroImg.style.transform = `scale(1.1) translate3d(0, ${shift}px, 0)`;
      }

      if (pageHeroImg) {
        const shift = Math.min(y * 0.22, 100);
        pageHeroImg.style.transform = `scale(1.06) translate3d(0, ${shift}px, 0)`;
      }

      parallaxTicking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!parallaxTicking) {
          requestAnimationFrame(updateParallax);
          parallaxTicking = true;
        }
      },
      { passive: true }
    );
    updateParallax();
  }

  /* Hero counters */
  function animateCount(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const heroStats = $(".hero__stats");
  if (heroStats && "IntersectionObserver" in window) {
    const statsIo = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        $$("[data-count]", heroStats).forEach(animateCount);
        statsIo.disconnect();
      },
      { threshold: 0.5 }
    );
    statsIo.observe(heroStats);
  }

  /* Partners */
  const partnerGrid = $("#partnerGrid");
  const partnerFilter = $("#partnerFilter");
  let activePartnerFilter = "all";

  function renderPartners() {
    if (!partnerGrid || typeof PARTNERS === "undefined") return;

    const list =
      activePartnerFilter === "all"
        ? PARTNERS
        : PARTNERS.filter((p) => p.category === activePartnerFilter);

    partnerGrid.innerHTML = list
      .map(
        (p) => `
      <article class="partner-card">
        <span class="partner-card__cat">${p.categoryLabel}</span>
        <h3>${p.name}</h3>
        <p class="partner-card__loc">${p.location}</p>
        <p>${p.description}</p>
        <div class="partner-card__tags">
          ${p.capabilities.map((c) => `<span>${c}</span>`).join("")}
        </div>
      </article>`
      )
      .join("");
  }

  if (partnerFilter && typeof PARTNER_FILTERS !== "undefined") {
    partnerFilter.innerHTML = PARTNER_FILTERS.map(
      (f) =>
        `<button type="button" class="filter-btn${f.id === activePartnerFilter ? " is-active" : ""}" data-filter="${f.id}">${f.label}</button>`
    ).join("");

    partnerFilter.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      activePartnerFilter = btn.dataset.filter;
      $$(".filter-btn", partnerFilter).forEach((b) =>
        b.classList.toggle("is-active", b.dataset.filter === activePartnerFilter)
      );
      renderPartners();
    });
  }

  renderPartners();

  /* Capacity */
  const capacityGrid = $("#capacityGrid");
  if (capacityGrid && typeof CAPACITY !== "undefined") {
    capacityGrid.innerHTML = CAPACITY.map(
      (c) => `
      <div class="capacity-item">
        <strong>${c.value}</strong>
        <span>${c.label}</span>
      </div>`
    ).join("");
  }

  /* Contact form */
  const form = $("#queryForm");
  const formNote = $("#formNote");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    formNote.className = "form__note";
    formNote.textContent = "";

    if (form.website?.value) {
      formNote.classList.add("is-success");
      formNote.textContent = "Thank you! We will contact you shortly.";
      form.reset();
      return;
    }

    const required = ["name", "company", "email", "phone", "interest", "message"];
    let valid = true;

    required.forEach((field) => {
      const input = form.elements[field];
      if (!input) return;
      const ok = input.value.trim().length > 0;
      input.classList.toggle("is-error", !ok);
      if (!ok) valid = false;
    });

    const email = form.elements.email;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add("is-error");
      valid = false;
    }

    if (!valid) {
      formNote.classList.add("is-error");
      formNote.textContent = "Please fill in all required fields correctly.";
      return;
    }

    formNote.classList.add("is-success");
    formNote.textContent =
      "Thank you! Your enquiry has been received. Our team will respond within 1–2 business days.";
    form.reset();
  });
})();

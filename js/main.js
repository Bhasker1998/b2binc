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
  const pageHeroImg = $(".page-hero__bg img:not(.hero-carousel__slide)");
  const pageHeroSlides = $$(".page-hero__bg.hero-carousel .hero-carousel__slide");

  if (!prefersReduced && (heroImg || pageHeroImg || pageHeroSlides.length)) {
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

      if (pageHeroSlides.length) {
        const shift = Math.min(y * 0.22, 100);
        pageHeroSlides.forEach((img) => {
          img.style.transform = `scale(1.06) translate3d(0, ${shift}px, 0)`;
        });
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

  /* Auto image carousels */
  function initCarousel(root) {
    const slides = $$(
      ".hero-carousel__slide, .image-carousel__slide",
      root
    );
    if (slides.length < 2) return;

    const dotsWrap = $(".hero-carousel__dots, .image-carousel__dots", root);
    const interval = Number(root.dataset.interval) || 4500;
    let index = slides.findIndex((s) => s.classList.contains("is-active"));
    if (index < 0) index = 0;
    let timer = null;

    if (dotsWrap) {
      dotsWrap.innerHTML = slides
        .map(
          (_, i) =>
            `<button type="button" aria-label="Show slide ${i + 1}" data-slide="${i}"></button>`
        )
        .join("");
    }

    function goTo(next) {
      slides[index]?.classList.remove("is-active");
      index = ((next % slides.length) + slides.length) % slides.length;
      slides[index].classList.add("is-active");
      if (dotsWrap) {
        $$("button", dotsWrap).forEach((btn, i) =>
          btn.classList.toggle("is-active", i === index)
        );
      }
    }

    goTo(index);

    function start() {
      if (prefersReduced) return;
      stop();
      timer = window.setInterval(() => goTo(index + 1), interval);
    }

    function stop() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    dotsWrap?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-slide]");
      if (!btn) return;
      goTo(Number(btn.dataset.slide));
      start();
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);

    start();
  }

  $$("[data-carousel]").forEach(initCarousel);

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

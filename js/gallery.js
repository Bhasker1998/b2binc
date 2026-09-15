(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const gallery = $("#exportGallery");
  const filterBar = $("#exportFilter");
  const modal = $("#productModal");
  const modalContent = $("#modalContent");
  const modalClose = $("#modalClose");

  if (!gallery || typeof EXPORT_PRODUCTS === "undefined") return;

  let activeFilter = "all";

  function openModal(product) {
    if (!modal || !modalContent) return;

    const extraImages =
      product.images && product.images.length > 1
        ? `<div class="modal-gallery">${product.images
            .map(
              (src, i) =>
                `<img src="${src}" alt="${product.name} view ${i + 1}" class="${i === 0 ? "is-active" : ""}" />`
            )
            .join("")}</div>`
        : "";

    modalContent.innerHTML = `
      <article class="modal-detail">
        <div class="modal-detail__img">
          <img src="${product.image}" alt="${product.name}" id="modalMainImg" />
          ${extraImages}
        </div>
        <div class="modal-detail__content">
          <span class="gallery-card__cat">${product.categoryLabel}</span>
          <h2 id="modalTitle">${product.name}</h2>
          <p class="meta">${product.exportNote} · Origin: ${product.origin}</p>
          <p>${product.description}</p>
          <dl class="modal-specs">
            <div><dt>Material</dt><dd>${product.material}</dd></div>
            <div><dt>Dimensions</dt><dd>${product.dimensions}</dd></div>
            <div><dt>Weight</dt><dd>${product.weight}</dd></div>
            <div><dt>MOQ</dt><dd>${product.moq}</dd></div>
            <div><dt>Packaging</dt><dd>${product.packaging}</dd></div>
            <div><dt>Customization</dt><dd>${product.customizable}</dd></div>
          </dl>
          <a href="index.html#contact-form" class="btn btn--primary">Request export quote</a>
        </div>
      </article>`;

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
    document.body.style.overflow = "hidden";

    const thumbs = modalContent.querySelectorAll(".modal-gallery img");
    const mainImg = modalContent.querySelector("#modalMainImg");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbs.forEach((t) => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
        if (mainImg) mainImg.src = thumb.src;
      });
    });
  }

  function closeModal() {
    if (!modal) return;
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
    document.body.style.overflow = "";
  }

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function renderGallery() {
    const list =
      activeFilter === "all"
        ? EXPORT_PRODUCTS
        : EXPORT_PRODUCTS.filter((p) => p.category === activeFilter);

    gallery.innerHTML = list
      .map(
        (p) => `
      <button type="button" class="gallery-card" data-id="${p.id}" aria-label="View ${p.name}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/export/ganesha-stone.jpg';" />
        <div class="gallery-card__body">
          <span class="gallery-card__cat">${p.categoryLabel}</span>
          <h3>${p.name}</h3>
          <p>${p.material} · ${p.origin}</p>
        </div>
      </button>`
      )
      .join("");

    $$(".gallery-card", gallery).forEach((card) => {
      card.addEventListener("click", () => {
        const product = EXPORT_PRODUCTS.find((p) => p.id === card.dataset.id);
        if (product) openModal(product);
      });
    });
  }

  if (filterBar && typeof EXPORT_FILTERS !== "undefined") {
    filterBar.innerHTML = EXPORT_FILTERS.map(
      (f) =>
        `<button type="button" class="filter-btn${f.id === activeFilter ? " is-active" : ""}" data-filter="${f.id}">${f.label}</button>`
    ).join("");

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      $$(".filter-btn", filterBar).forEach((b) =>
        b.classList.toggle("is-active", b.dataset.filter === activeFilter)
      );
      renderGallery();
    });
  }

  renderGallery();
})();

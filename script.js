const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const $ = (selector, root = document) => root.querySelector(selector);

const progress = $(".top-progress");
if (progress) {
  addEventListener("scroll", () => {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    const percent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
    progress.style.width = percent + "%";
  }, { passive: true });
}

const revealItems = $$(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const nav = $(".header nav");
const menuButton = $(".hamburger");
if (nav && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("mobile-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  $$(".header nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

const CONTACT_EMAIL = "info@b2binc.in";
const ACCESS_KEY = "aceba07c-a936-4bba-8ef5-31eb7b9bcfdb";
const form = $("#quoteForm");
const formStatus = $("#formStatus");
const submitButton = $("#formSubmitBtn");
const originalButtonHtml = submitButton ? submitButton.innerHTML : "";

function showFormStatus(type, message) {
  if (!formStatus) return;
  formStatus.className = "form-status full is-" + type;
  formStatus.textContent = message;
  formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function openMailto(data) {
  const subject = encodeURIComponent("New enquiry from B2Binc website");
  const body = encodeURIComponent([
    "Name: " + data.name,
    "Company: " + data.company,
    "Email: " + data.email,
    "Phone: " + data.phone,
    "Interest: " + data.interest,
    "",
    data.message
  ].join("\n"));
  window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const botcheck = form.elements.namedItem("botcheck");
    if (botcheck && botcheck.checked) {
      showFormStatus("success", "Thank you! We will contact you shortly.");
      form.reset();
      return;
    }

    const requiredFields = ["name", "company", "email", "phone", "interest", "message"];
    let isValid = true;
    requiredFields.forEach((fieldName) => {
      const field = form.elements[fieldName];
      if (!field) return;
      const hasValue = String(field.value || "").trim().length > 0;
      field.classList.toggle("is-error", !hasValue);
      if (!hasValue) isValid = false;
    });

    const emailField = form.elements.email;
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
      emailField.classList.add("is-error");
      isValid = false;
    }

    if (!isValid) {
      showFormStatus("error", "Please fill in all required fields correctly.");
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      company: form.elements.company.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      interest: form.elements.interest.value,
      message: form.elements.message.value.trim()
    };

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending…";
    }

    const restoreButton = () => {
      if (!submitButton) return;
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHtml;
    };

    if (!ACCESS_KEY) {
      openMailto(data);
      showFormStatus("error", "Your mail app opened with the enquiry. Click Send to email " + CONTACT_EMAIL + ".");
      restoreButton();
      return;
    }

    showFormStatus("success", "Sending your enquiry to " + CONTACT_EMAIL + "…");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "New enquiry from B2Binc website",
          from_name: "B2Binc Website",
          replyto: data.email,
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          interest: data.interest,
          message: data.message
        }),
        signal: controller.signal
      });
      window.clearTimeout(timer);
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || "send failed");
      }

      showFormStatus("success", "Thank you! Your enquiry has been sent to " + CONTACT_EMAIL + ".");
      form.reset();
    } catch (error) {
      window.clearTimeout(timer);
      openMailto(data);
      showFormStatus("error", "Automatic sending failed. Your mail app opened; click Send to email " + CONTACT_EMAIL + ".");
    } finally {
      restoreButton();
    }
  });
}

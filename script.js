document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");

const closeMenu = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Menüyü aç");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Menüyü kapat" : "Menüyü aç");
    navigation.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeMenu();
  });
}

const updateHeader = () => {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = [...document.querySelectorAll("[data-reveal]")];

revealItems.forEach((item) => {
  const delay = Number(item.dataset.revealDelay || 0);
  if (delay) item.style.transitionDelay = `${delay}ms`;
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const serviceSelect = document.querySelector("#service");

document.querySelectorAll('.service-card > a[href="#teklif"]').forEach((link) => {
  link.addEventListener("click", () => {
    if (!serviceSelect) return;
    const title = link.closest(".service-card")?.querySelector("h3")?.textContent?.trim();
    const mapping = {
      "Personel Servisi": "Personel Servisi",
      "Öğrenci Servisi": "Öğrenci Servisi",
      "Şehir İçi & Özel Grup": "Özel Grup / Etkinlik Transferi"
    };
    if (title && mapping[title]) serviceSelect.value = mapping[title];
  });
});

const quoteForm = document.querySelector("[data-quote-form]");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!quoteForm.reportValidity()) return;

    const data = new FormData(quoteForm);
    const service = String(data.get("service") || "").trim();
    const route = String(data.get("route") || "").trim();
    const passengers = String(data.get("passengers") || "").trim();
    const schedule = String(data.get("schedule") || "").trim();

    const message = [
      "Merhaba Deniz Group Taşımacılık, web sitenizden teklif almak istiyorum.",
      "",
      `Hizmet: ${service}`,
      `Güzergâh / İhtiyaç: ${route}`,
      passengers ? `Yolcu sayısı: ${passengers}` : null,
      schedule ? `Servis zamanı: ${schedule}` : null,
      "",
      "Uygun olduğunuzda benimle iletişime geçebilir misiniz?"
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/905537191410?text=${encodeURIComponent(message)}`;
    window.location.assign(whatsappUrl);
  });
}

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());

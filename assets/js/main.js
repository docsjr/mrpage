"use strict";

const SELECTORS = {
  app: "#app",
  progressBar: "#readingProgressBar",
  header: "#siteHeader",
  mobileCta: "#mobileCta",
  footer: "#footer",
};

const CTA_LINK = "#comprar";

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createParagraphs(items, className = "text") {
  return (items || [])
    .map((item) => `<p class="${className}">${escapeHTML(item)}</p>`)
    .join("");
}

function createList(items, className = "list-clean") {
  return `
    <ul class="${className}">
      ${(items || []).map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
    </ul>
  `;
}

function createButton(label, className = "btn btn-primary", href = CTA_LINK) {
  return `
    <a class="${className}" href="${href}" aria-label="${escapeHTML(label)}">
      ${escapeHTML(label)}
    </a>
  `;
}

function createAccordion(items, type = "chapters") {
  return `
    <div class="accordion" data-accordion="${escapeHTML(type)}">
      ${(items || [])
        .map((item, index) => {
          const label = item.chapter
            ? `${item.chapter} — ${item.title}`
            : item.question;

          const body = item.text || item.answer;

          return `
            <article class="accordion-item reveal" style="--delay: ${index * 70}ms;">
              <button class="accordion-trigger" type="button" aria-expanded="false">
                <span>${escapeHTML(label)}</span>
                <span class="accordion-icon" aria-hidden="true">+</span>
              </button>

              <div class="accordion-panel" aria-hidden="true">
                <p>${escapeHTML(body)}</p>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderHeader(content) {
  return `
    <header id="siteHeader" class="site-header">
      <div class="container header-inner">
        <a class="brand" href="#inicio" aria-label="Ir para o início">
          <span class="brand-mark">MR</span>
          <span>${escapeHTML(content.brand.productName)}</span>
        </a>

        <nav class="nav-links" aria-label="Menu principal">
          <a href="#metodo">Método</a>
          <a href="#conteudo">Conteúdo</a>
          <a href="#para-quem">Para quem é</a>
          <a href="#faq">FAQ</a>
        </nav>

        ${createButton("Acessar agora", "btn btn-primary btn-header")}
      </div>
    </header>
  `;
}

function renderHero(content) {
  return `
    <section id="inicio" class="hero section-dark">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-badge reveal">
            <span></span>
            ${escapeHTML(content.brand.productType)}
          </div>

          <h1 class="hero-title reveal">
            Você não precisa de mais uma dieta.
            <span>Precisa entender por que seu corpo travou.</span>
          </h1>

          <p class="hero-subtitle reveal">
            ${escapeHTML(content.hero.subheadline)}
          </p>

          <div class="hero-actions reveal">
            ${createButton(content.hero.cta)}
            <p>Acesso digital ao e-book. Conteúdo educativo e estratégico.</p>
          </div>
        </div>

<div class="hero-visual reveal">
  <div class="ebook-float" aria-label="Mockup do e-book Método Regular">
    <div class="ebook-cover">
      <div class="ebook-topline">Método</div>
      <div class="ebook-title">Regular™</div>
      <div class="ebook-subtitle">Saúde metabólica · Performance · Emagrecimento</div>

      <div class="ebook-image-wrap">
        <img
          class="ebook-image"
          src="./assets/images/capaflut.png"
          alt="Capa visual do Método Regular com identidade premium"
        />
      </div>

      <div class="ebook-line"></div>
      <div class="ebook-footer">Regular primeiro. Intensificar depois.</div>
    </div>
  </div>
</div>
      </div>
    </section>
  `;
}

function renderPainSection(content) {
  const painCards = [
    "Você começa bem, mas trava.",
    "A fome aumenta.",
    "A energia cai.",
    "O peso volta.",
    "Você se culpa.",
  ];

  return `
    <section class="section section-light" id="dor">
      <div class="container">
        <div class="section-header reveal">
          <span class="eyebrow">${escapeHTML(content.pain.eyebrow)}</span>
          <h2 class="section-title">${escapeHTML(content.pain.title)}</h2>
        </div>

        <div class="pain-grid">
          ${painCards
            .map(
              (card, index) => `
                <article class="pain-card reveal" style="--delay: ${index * 90}ms;">
                  <span class="pain-icon" aria-hidden="true"></span>
                  <h3>${escapeHTML(card)}</h3>
                </article>
              `
            )
            .join("")}
        </div>

        <div class="pain-copy reveal">
          ${createParagraphs(content.pain.closing, "text")}
        </div>
      </div>
    </section>
  `;
}

function renderBeliefBreak() {
  return `
    <section class="section belief-section section-dark">
      <div class="container belief-inner">
        <p class="belief-line reveal">Talvez o problema não seja sua disciplina.</p>
        <p class="belief-line belief-line-gold reveal">Talvez o problema seja o modelo que você aprendeu a seguir.</p>
      </div>
    </section>
  `;
}

function renderMethodSection(content) {
  return `
    <section class="section section-dark method-section" id="metodo">
      <div class="container method-grid">
        <div class="method-copy reveal">
          <span class="eyebrow">${escapeHTML(content.product.eyebrow)}</span>
          <h2 class="section-title">${escapeHTML(content.product.title)}</h2>

          <div class="method-text">
            ${createParagraphs(content.product.paragraphs, "text")}
          </div>

          <div class="highlight-box">
            <strong>${escapeHTML(content.product.principle)}</strong>
            <p>Porque um corpo desregulado não responde bem. Um corpo regulado tende a responder melhor à alimentação, ao treino e à rotina.</p>
          </div>

          ${createButton(content.product.cta)}
        </div>

        <div class="method-visual reveal" data-parallax>
          <div class="metabolic-orbit" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <strong>Regulação</strong>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderTriadSection(content) {
  return `
    <section class="section section-green triad-section">
      <div class="container">
        <div class="section-header reveal">
          <span class="eyebrow">${escapeHTML(content.mechanism.eyebrow)}</span>
          <h2 class="section-title">${escapeHTML(content.mechanism.title)}</h2>
          <p class="text">${escapeHTML(content.mechanism.intro)}</p>
        </div>

        <div class="triad-track">
          ${(content.mechanism.pillars || [])
            .map(
              (pillar, index) => `
                <article class="triad-card reveal" style="--delay: ${index * 100}ms;">
                  <span class="triad-icon" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
                  <h3>${escapeHTML(pillar.title)}</h3>
                  <p>${escapeHTML(pillar.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderBeforeAfterSection() {
  const before = [
    "Olhar só para a balança.",
    "Cortar calorias sem estratégia.",
    "Compensar excesso com punição.",
    "Recomeçar toda segunda-feira.",
    "Achar que tudo é falta de disciplina.",
  ];

  const after = [
    "Entender composição corporal.",
    "Regular metabolismo.",
    "Melhorar sono e recuperação.",
    "Preservar massa muscular.",
    "Construir constância.",
  ];

  return `
    <section class="section section-light before-after-section">
      <div class="container">
        <div class="section-header reveal">
          <span class="eyebrow">Antes e depois de consciência</span>
          <h2 class="section-title">Não é sobre prometer outro corpo. É sobre mudar a forma de entender o processo.</h2>
        </div>

        <div class="before-after-grid">
          <article class="compare-card compare-before reveal">
            <span>Antes</span>
            ${createList(before, "compare-list")}
          </article>

          <article class="compare-card compare-after reveal">
            <span>Depois</span>
            ${createList(after, "compare-list")}
          </article>
        </div>
      </div>
    </section>
  `;
}

function renderChaptersSection(content) {
  return `
    <section class="section section-dark" id="conteudo">
      <div class="container narrow">
        <div class="section-header reveal">
          <span class="eyebrow">${escapeHTML(content.chapters.eyebrow)}</span>
          <h2 class="section-title">${escapeHTML(content.chapters.title)}</h2>
          <p class="text">${escapeHTML(content.chapters.intro)}</p>
        </div>

        ${createAccordion(content.chapters.items, "chapters")}

        <div class="section-cta reveal">
          ${createButton(content.chapters.cta)}
        </div>
      </div>
    </section>
  `;
}

function renderAudienceSection(content) {
  return `
    <section class="section section-light audience-section" id="para-quem">
      <div class="container">
        <div class="section-header reveal">
          <span class="eyebrow">${escapeHTML(content.audience.forWho.eyebrow)}</span>
          <h2 class="section-title">${escapeHTML(content.audience.forWho.title)}</h2>
        </div>

        <div class="check-grid">
          ${(content.audience.forWho.items || [])
            .map(
              (item, index) => `
                <div class="check-item reveal" style="--delay: ${index * 80}ms;">
                  <span aria-hidden="true">✓</span>
                  <p>${escapeHTML(item)}</p>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderNotForSection(content) {
  return `
    <section class="section section-dark not-for-section">
      <div class="container">
        <div class="not-for-box reveal">
          <span class="eyebrow">${escapeHTML(content.audience.notForWho.eyebrow)}</span>
          <h2>${escapeHTML(content.audience.notForWho.title)}</h2>
          <p>
            O Método Regular™ não é para quem procura
            <strong>promessa milagrosa</strong>, dieta extrema ou resultado imediato sem consistência.
          </p>
        </div>
      </div>
    </section>
  `;
}

function renderMidCtaSection(content) {
  return `
    <section class="section section-dark cta-section" id="comprar">
      <div class="container cta-box reveal">
        <span class="eyebrow">${escapeHTML(content.midCta.eyebrow)}</span>
        <h2>${escapeHTML(content.midCta.title)}</h2>

        ${createButton(content.midCta.cta)}

        <p>Acesso digital ao e-book. Conteúdo educativo e estratégico.</p>
      </div>
    </section>
  `;
}

function renderBenefitsSection(content) {
  return `
    <section class="section section-light benefits-section">
      <div class="container">
        <div class="section-header reveal">
          <span class="eyebrow">${escapeHTML(content.benefits.eyebrow)}</span>
          <h2 class="section-title">${escapeHTML(content.benefits.title)}</h2>
        </div>

        <div class="benefits-grid">
          ${(content.benefits.items || [])
            .map(
              (item, index) => `
                <article class="benefit-card reveal" style="--delay: ${index * 70}ms;">
                  <span class="benefit-icon" aria-hidden="true"></span>
                  <p>${escapeHTML(item)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderNoticeSection() {
  return `
    <section class="section section-dark notice-section">
      <div class="container">
        <div class="notice-box reveal">
          <span class="notice-icon" aria-hidden="true">i</span>
          <p>
            O Método Regular™ é um e-book educativo. Não promete resultados específicos e não substitui acompanhamento médico, nutricional ou individualizado.
          </p>
        </div>
      </div>
    </section>
  `;
}

function renderFaqSection(content) {
  return `
    <section class="section section-dark faq-section" id="faq">
      <div class="container narrow">
        <div class="section-header reveal">
          <span class="eyebrow">${escapeHTML(content.faq.eyebrow)}</span>
          <h2 class="section-title">${escapeHTML(content.faq.title)}</h2>
        </div>

        ${createAccordion(content.faq.items, "faq")}
      </div>
    </section>
  `;
}

function renderFinalCtaSection(content) {
  return `
    <footer id="footer" class="section footer-cta section-dark">
      <div class="container final-grid final-grid-single">
        <div class="final-copy reveal">
          <span class="eyebrow">${escapeHTML(content.finalCta.eyebrow)}</span>

          <h2>
            O problema não é começar de novo.
            <span>O problema é recomeçar usando o mesmo modelo que já falhou antes.</span>
          </h2>

          ${createButton(content.finalCta.cta)}
        </div>
      </div>
    </footer>
  `;
}

function renderMobileCta(content) {
  return `
    <div id="mobileCta" class="mobile-cta" aria-label="Acesso rápido ao Método Regular">
      <span>${escapeHTML(content.brand.productName)}</span>
      ${createButton("Acessar agora", "btn btn-primary btn-mobile")}
    </div>
  `;
}

function renderPage() {
  const content = window.PAGE_CONTENT;

  if (!content) {
    throw new Error("PAGE_CONTENT não foi encontrado. Verifique se content.js foi carregado antes de main.js.");
  }

  const app = document.querySelector(SELECTORS.app);

  app.innerHTML = `
    ${renderHeader(content)}
    ${renderHero(content)}
    ${renderPainSection(content)}
    ${renderBeliefBreak()}
    ${renderMethodSection(content)}
    ${renderTriadSection(content)}
    ${renderBeforeAfterSection()}
    ${renderChaptersSection(content)}
    ${renderAudienceSection(content)}
    ${renderNotForSection(content)}
    ${renderMidCtaSection(content)}
    ${renderBenefitsSection(content)}
    ${renderNoticeSection()}
    ${renderFaqSection(content)}
    ${renderFinalCtaSection(content)}
    ${renderMobileCta(content)}
  `;
}

function setupScrollProgress() {
  const progressBar = document.querySelector(SELECTORS.progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    progressBar.style.width = `${Math.min(progress, 100)}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

function setupHeaderState() {
  const header = document.querySelector(SELECTORS.header);

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function setupAccordions() {
  const accordions = document.querySelectorAll("[data-accordion]");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");

      trigger.addEventListener("click", () => {
        const isActive = item.classList.contains("is-active");

        items.forEach((currentItem) => {
          const currentTrigger = currentItem.querySelector(".accordion-trigger");
          const currentPanel = currentItem.querySelector(".accordion-panel");

          currentItem.classList.remove("is-active");
          currentTrigger.setAttribute("aria-expanded", "false");
          currentPanel.setAttribute("aria-hidden", "true");
          currentPanel.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add("is-active");
          trigger.setAttribute("aria-expanded", "true");
          panel.setAttribute("aria-hidden", "false");
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    });
  });
}

function setupParallax() {
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  function updateParallax() {
    parallaxElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const movement = Math.max(-10, Math.min(10, (progress - 0.5) * 20));

      element.style.transform = `translateY(${movement}px)`;
    });
  }

  window.addEventListener("scroll", updateParallax, { passive: true });
  window.addEventListener("resize", updateParallax);
  updateParallax();
}

function setupMobileCtaVisibility() {
  const mobileCta = document.querySelector(SELECTORS.mobileCta);
  const footer = document.querySelector(SELECTORS.footer);

  function updateMobileCta() {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

    const footerRect = footer.getBoundingClientRect();
    const footerVisible = footerRect.top < window.innerHeight - 80;

    mobileCta.classList.toggle("is-visible", progress > 0.2 && !footerVisible);
  }

  window.addEventListener("scroll", updateMobileCta, { passive: true });
  window.addEventListener("resize", updateMobileCta);
  updateMobileCta();
}

function setupSmoothAnchors() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const targetId = link.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function init() {
  renderPage();
  setupScrollProgress();
  setupHeaderState();
  setupRevealAnimations();
  setupAccordions();
  setupParallax();
  setupMobileCtaVisibility();
  setupSmoothAnchors();
}

document.addEventListener("DOMContentLoaded", init);

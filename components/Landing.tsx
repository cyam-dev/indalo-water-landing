"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Scroll animation hook ─── */
function useScrollFade(className = "fade-up") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Section wrapper ─── */
function Section({ id, bg = "white", children }: { id?: string; bg?: string; children: React.ReactNode }) {
  const bgClass =
    bg === "light" ? "bg-[#EEF8F9]" :
    bg === "deep"  ? "bg-[#F0F5FB]" :
    "bg-white";
  return (
    <section id={id} className={`py-24 px-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ─── Section heading ─── */
function SectionHead({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  const ref = useScrollFade();
  return (
    <div ref={ref} className="fade-up text-center mb-16">
      <span className="overline">{tag}</span>
      <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#002856] mb-5">{title}</h2>
      {sub && <p className="text-[#64748B] text-lg max-w-2xl mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════
   NAV
══════════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "#sistema", label: "Sistema" },
    { href: "#entregables", label: "Entregables" },
    { href: "#modelo", label: "Modelo" },
    { href: "#timeline", label: "Timeline" },
    { href: "#supuestos", label: "Supuestos" },
    { href: "#pasos", label: "Próximos Pasos" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white font-bold text-lg tracking-wide">
          INDALO <span className="text-[#C0E7EA]">ROB</span>
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/80 hover:text-[#C0E7EA] text-sm font-medium transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        {/* Mobile menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#002856] px-6 pb-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block text-white/80 hover:text-[#C0E7EA] py-2 text-sm font-medium">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #002856 0%, #003d80 50%, #004987 100%)" }}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #C0E7EA, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #6BBFC4, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #C0E7EA, transparent 60%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
        {/* Brand tag */}
        <div className="text-center mb-8">
          <span className="overline" style={{ color: "rgba(192,231,234,0.75)" }}>
            Indalo Water · Mercado Hispano USA
          </span>
        </div>

        {/* Main title */}
        <div className="text-center mb-6">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white mb-4">
            Sistema de<br />
            <span className="gradient-text">Lanzamiento ROB</span>
          </h1>
          <p className="text-[#C0E7EA]/70 text-lg md:text-xl mt-6 tracking-wide">
            Validación 90 días · Mercado Hispano USA
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto">
          {[
            { value: "$10,000", label: "inversión / mes", sub: "Meta $7k + Google $3k" },
            { value: "$3,995", label: "precio del ROB", sub: "desde $111/mes financiado" },
            { value: "112 días", label: "plan completo", sub: "pre-launch + 3 meses" },
            { value: "8", label: "entregables", sub: "sistema completo" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center card-hover">
              <div style={{ fontFamily: "'Montserrat', sans-serif", animationDelay: `${i * 0.1}s` }}
                className="stat-value text-3xl md:text-4xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-[#C0E7EA] text-sm font-semibold mb-1">{stat.label}</div>
              <div className="text-white/40 text-xs">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-16">
          <a href="#sistema" className="inline-flex flex-col items-center text-white/40 hover:text-[#C0E7EA] transition-colors group">
            <span className="overline mb-2" style={{ color: "inherit" }}>Ver el sistema</span>
            <div className="w-6 h-9 border border-current rounded-full flex justify-center pt-1.5 opacity-60">
              <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SISTEMA (Funnel Architecture)
══════════════════════════════════════════════ */
function Sistema() {
  const ref = useScrollFade();
  const stages = [
    {
      num: "01",
      color: "#002856",
      title: "CAPTACIÓN",
      icon: "📡",
      lines: ["Meta Ads $7,000/mes", "Google Ads $3,000/mes", "→ Quiz de triaje"],
    },
    {
      num: "02",
      color: "#004987",
      title: "CALIFICACIÓN",
      icon: "🎯",
      lines: ["Quiz segmenta 3 rutas", "DIY / 3 Vías / White Glove", "Score de calificación"],
    },
    {
      num: "03",
      color: "#6BBFC4",
      title: "NURTURING",
      icon: "💬",
      lines: ["5 toques en 7 días", "WhatsApp + Email", "→ Llamada agendada"],
    },
    {
      num: "04",
      color: "#1A7A4A",
      title: "CIERRE",
      icon: "✅",
      lines: ["Closer humano", "+ Checkout directo", "Comisión + $3,995"],
    },
  ];

  const stack = ["Meta Verified", "n8n", "Clientify CRM", "ManyChat", "WhatsApp HSM", "WooCommerce"];

  return (
    <Section id="sistema" bg="white">
      <SectionHead tag="Arquitectura" title="Cómo funciona el sistema" sub="El funnel opera en 4 etapas conectadas. Cada lead pasa por captación, se califica automáticamente y llega al closer con contexto completo." />

      <div ref={ref} className="fade-up">
        {/* Flow stages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stages.map((s, i) => (
            <div key={i} className="relative">
              {i < 3 && (
                <div className="hidden md:block absolute top-10 -right-2 z-10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h12M9 4l4 4-4 4" stroke="#6BBFC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#C0E7EA]/40 h-full card-hover">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-xs font-black text-[#C0E7EA] bg-[#002856] px-2 py-0.5 rounded-md">
                    {s.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: s.color }}
                  className="font-bold text-sm mb-3 tracking-wide">
                  {s.title}
                </h3>
                {s.lines.map((l, j) => (
                  <p key={j} className="text-[#546E7A] text-xs leading-relaxed">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feedback loop */}
        <div className="bg-[#002856]/5 border border-[#002856]/10 rounded-xl px-6 py-4 text-center mb-6">
          <span className="text-[#002856] text-sm font-semibold">🔄 Retroalimentación continua: </span>
          <span className="text-[#546E7A] text-sm">CRM Clientify → Audiencias Lookalike → Optimización de campañas en tiempo real</span>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap justify-center gap-2">
          <span className="text-xs text-[#546E7A] mr-2 self-center font-medium">Stack:</span>
          {stack.map(t => (
            <span key={t} className="text-xs px-3 py-1.5 bg-white border border-[#C0E7EA] rounded-full text-[#002856] font-medium shadow-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   ENTREGABLES
══════════════════════════════════════════════ */
function Entregables() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      num: "E1", icon: "📊", title: "Estructura de Campañas",
      sub: "Meta + Google",
      pills: ["$7k Meta", "$3k Google"],
      bullets: [
        "3 campañas Meta: Prospección, Retargeting, Lookalike",
        "4 campañas Google: Brand Search, Categoría, PMax, YouTube",
        "Estrategia de puja por mes: Lowest Cost → Cost Cap → Target CPA",
        "Segmentación por ruta del quiz (DIY / 3 Vías / White Glove)",
      ],
    },
    {
      num: "E2", icon: "🎬", title: "4 Piezas de Anuncio",
      sub: "Copies completos",
      pills: ["NSF/ANSI 58", "FDA"],
      bullets: [
        "P1 Video UGC — Mamá hispana 35-45 · «¿Sabes qué hay en el agua?»",
        "P2 Autoridad Fundador — JJ Solís · «40 años estudiando el agua»",
        "P3 Comparativo — Garrafones $80/mes vs ROB $111/mes",
        "P4 Remarketing — Quiz completado, no agendó · Alta temperatura",
      ],
    },
    {
      num: "E3", icon: "💬", title: "Flujo de Nurturing",
      sub: "Email + WhatsApp",
      pills: ["5 toques", "7 días"],
      bullets: [
        "Rama A: Secuencia de agendamiento (calificado)",
        "Rama B: Anti-noshow post-agendamiento",
        "Rama C: Reactivación (7 días sin agendar)",
        "Rama D: Nurturing mensual largo plazo (no calificado)",
      ],
    },
    {
      num: "E4", icon: "⚖️", title: "Matriz de Compliance",
      sub: "FTC / FDA / Meta",
      pills: ["FTC Act §5", "Meta Policies"],
      bullets: [
        "✓ Permitidos: NSF/ANSI 58, FDA, labs independientes — confirmados",
        "⚠ Con respaldo: claims de % reducción (PFAS, plomo) con lab",
        "✗ Prohibidos: claims médicos, detox, antienvejecimiento, curación",
        "Restricciones por canal: Meta, Google, WhatsApp, landing",
      ],
    },
    {
      num: "E5", icon: "📈", title: "Plan de Tracking",
      sub: "Pixel + GA4 + CAPI",
      pills: ["9 eventos core", "Event Match ≥7.0"],
      bullets: [
        "Pixel Meta + Conversions API (server-side) para iOS 14+",
        "GA4 con Enhanced Conversions y micro-conversiones",
        "Eventos clave: QuizCompleted, QualifiedLead, AppointmentBooked, Purchase",
        "Dashboard semanal: leads por canal, show rate, CAC, cierre",
      ],
    },
    {
      num: "E6", icon: "🗂️", title: "Pipeline CRM Clientify",
      sub: "10 etapas",
      pills: ["Clientify", "n8n + ManyChat"],
      bullets: [
        "10 etapas: Lead Nuevo → Calificación → Agendada → Atendida → Ganado",
        "Automatizaciones: WhatsApp en cada cambio de etapa vía webhooks",
        "SLA por etapa: 72h calificación, 30-45 min llamada (confirmado JJ)",
        "6 campos obligatorios: ruta, DMA, canal, orificio, pago, closer",
      ],
    },
    {
      num: "E7", icon: "💰", title: "Modelo Económico",
      sub: "3 escenarios · 90 días",
      pills: ["LTV $5,500–5,800", "CAC/LTV 11–18%"],
      bullets: [
        "Conservador: 18-19 ventas · ~$72,000 revenue · CAC $909",
        "Base: 30 ventas · $119,850 revenue · CAC $625 en M3",
        "Optimista: 45 ventas · $179,775 revenue · CAC $417",
        "Meta con historial activo → CPL Base ($30). Google conservador en M1.",
      ],
    },
    {
      num: "E8", icon: "🗓️", title: "Plan de Ejecución",
      sub: "~112 días",
      pills: ["$30,000 total", "WooCommerce desde cero"],
      bullets: [
        "Pre-launch extendido (días 1-28): WooCommerce + Quiz desde cero",
        "M1 (días 29-56): Lanzamiento y primeras ventas con datos reales",
        "M2 (días 57-84): Optimización, Lookalike, Cost Cap, UGC",
        "M3 (días 85-112): Escala, 15-20 ventas, validar sistema",
      ],
    },
  ];

  return (
    <Section id="entregables" bg="light">
      <SectionHead tag="Los 8 entregables" title="Sistema completo" sub="Cada entregable es una pieza operativa del funnel. Haz clic en cualquier card para ver el detalle." />
      <div className="fade-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}
              className={`bg-white rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden
                ${isOpen ? "border border-[#002856] shadow-lg" : "border border-[#C0E7EA]/50 hover:border-[#6BBFC4]/70 shadow-sm card-hover"}`}
              onClick={() => setOpen(isOpen ? null : i)}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="text-xs font-black bg-[#002856] text-[#C0E7EA] px-2 py-0.5 rounded-md">
                    {item.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className="font-bold text-[#002856] text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-[#546E7A] text-xs mb-3">{item.sub}</p>
                <div className="flex flex-wrap gap-1">
                  {item.pills.map(p => (
                    <span key={p} className="text-[10px] px-2 py-0.5 bg-[#EEF8F9] text-[#004987] rounded-full font-medium border border-[#C0E7EA]/60">
                      {p}
                    </span>
                  ))}
                </div>
                <div className={`mt-3 text-[10px] flex items-center gap-1 font-medium transition-colors ${isOpen ? "text-[#002856]" : "text-[#6BBFC4]"}`}>
                  {isOpen ? "▲ Cerrar" : "▼ Ver detalle"}
                </div>
              </div>
              <div style={{ maxHeight: isOpen ? "500px" : "0", overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                <div className="px-5 pb-5 border-t border-[#EEF8F9]">
                  <ul className="mt-3 space-y-2">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#546E7A]">
                        <span className="text-[#6BBFC4] mt-0.5 shrink-0">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   MODELO ECONÓMICO
══════════════════════════════════════════════ */
function Modelo() {
  const ref = useScrollFade();
  const scenarios = [
    {
      label: "Conservador",
      highlight: false,
      cpl: "$38 → $26",
      leads: "263 → 385",
      ventas: "18–19",
      revenue: "~$72,000",
      cac: "~$909",
      barW: "40%",
      barColor: "#6BBFC4",
    },
    {
      label: "BASE",
      highlight: true,
      cpl: "$30 → $20",
      leads: "333 → 500",
      ventas: "30",
      revenue: "$119,850",
      cac: "$625",
      barW: "66%",
      barColor: "#002856",
    },
    {
      label: "Optimista",
      highlight: false,
      cpl: "$22 → $15",
      leads: "455 → 667",
      ventas: "45",
      revenue: "$179,775",
      cac: "$417",
      barW: "100%",
      barColor: "#1A7A4A",
    },
  ];

  return (
    <Section id="modelo" bg="deep">
      <SectionHead tag="E7 — Modelo económico" title="Proyecciones 90 días"
        sub="$10,000/mes · Precio ROB $3,995 · Meta con historial activo · Google historial limitado en M1" />
      <div ref={ref} className="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {scenarios.map((s, i) => (
            <div key={i}
              className={`bg-white rounded-2xl p-6 transition-all
                ${s.highlight ? "scenario-base" : "border border-[#C0E7EA]/40 shadow-sm card-hover"}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontFamily: "'Montserrat', sans-serif" }}
                  className={`font-black text-lg ${s.highlight ? "text-[#002856]" : "text-[#546E7A]"}`}>
                  {s.label}
                </h3>
                {s.highlight && (
                  <span className="text-xs bg-[#002856] text-[#C0E7EA] px-2 py-1 rounded-full font-semibold">
                    Objetivo
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-4">
                {[
                  { k: "CPL M1→M3", v: s.cpl },
                  { k: "Leads M1→M3", v: s.leads },
                  { k: "Ventas 90d", v: s.ventas },
                  { k: "Revenue total", v: s.revenue },
                  { k: "CAC en M3", v: s.cac },
                ].map(row => (
                  <div key={row.k} className="flex items-center justify-between text-sm">
                    <span className="text-[#546E7A]">{row.k}</span>
                    <span style={{ fontFamily: "'Montserrat', sans-serif" }}
                      className={`font-bold ${s.highlight ? "text-[#002856]" : "text-[#1E2A35]"}`}>
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>

              {/* Revenue bar */}
              <div className="mt-4">
                <div className="h-1.5 bg-[#EEF8F9] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bar-animate" style={{ width: s.barW, background: s.barColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LTV callout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: "$5,500–5,800", label: "LTV a 5 años", sub: "filtros de reposición propietarios" },
            { value: "11–18%", label: "CAC / LTV en M3", sub: "ratio saludable para escala" },
            { value: "$30,000", label: "Inversión total", sub: "90 días de paid media" },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#002856] rounded-xl p-5 text-center">
              <div style={{ fontFamily: "'Montserrat', sans-serif" }}
                className="text-2xl font-black text-white mb-1">{kpi.value}</div>
              <div className="text-[#C0E7EA] font-semibold text-sm mb-0.5">{kpi.label}</div>
              <div className="text-white/40 text-xs">{kpi.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════ */
function Timeline() {
  const ref = useScrollFade();
  const phases = [
    {
      phase: "PRE-LAUNCH",
      days: "Días 1–28",
      badge: "⚠️ EXTENDIDO",
      badgeColor: "#7A4800",
      badgeBg: "#FFF8EC",
      color: "#7A4800",
      bg: "#FFF8EC",
      border: "#F59E0B",
      invest: "$0",
      focus: "Construir base técnica desde cero",
      items: [
        "WooCommerce + checkout + financiamiento $111/mes",
        "Quiz de triaje (3 rutas) — JJ comparte lógica",
        "Pixel Meta + GA4 + CAPI configurados",
        "Integración Clientify + n8n + ManyChat + WhatsApp HSM",
        "Pieza 2 Fundador JJ Solís grabada",
        "Auditoría Google Ads con historial previo",
        "Test end-to-end completo antes del primer dólar",
      ],
    },
    {
      phase: "MES 1",
      days: "Días 29–56",
      badge: "LANZAMIENTO",
      badgeColor: "#002856",
      badgeBg: "#EEF8F9",
      color: "#002856",
      bg: "#EEF8F9",
      border: "#6BBFC4",
      invest: "$10,000",
      focus: "Datos reales · Optimización inicial · Primeras ventas",
      items: [
        "Activar campañas Meta (Prospección + Retargeting básico)",
        "Activar Search Brand + Categoría en Google",
        "CPL objetivo: $30–35 (normal en M1)",
        "KPI: 3–5 ventas · tasa agendamiento 6–8%",
        "Decisión D30: auditar audiencia de menor CPL",
      ],
    },
    {
      phase: "MES 2",
      days: "Días 57–84",
      badge: "OPTIMIZACIÓN",
      badgeColor: "#004987",
      badgeBg: "#EEF8F9",
      color: "#004987",
      bg: "#EEF8F9",
      border: "#6BBFC4",
      invest: "$10,000",
      focus: "Bajar CAC · Activar Lookalike · UGC A/B",
      items: [
        "Activar Lookalike 1–3% desde QualifiedLeads del CRM",
        "Cost Cap en ad sets con ≥30 conversiones",
        "Target CPA en Google Search con datos reales M1",
        "Lanzar Pieza 1 (UGC) vs Pieza 2 (Fundador) — A/B",
        "Decisión D60: ¿CAC acercándose al rango $500–800?",
      ],
    },
    {
      phase: "MES 3",
      days: "Días 85–112",
      badge: "ESCALA",
      badgeColor: "#1A7A4A",
      badgeBg: "#E8F7F0",
      color: "#1A7A4A",
      bg: "#E8F7F0",
      border: "#1A7A4A",
      invest: "$10,000",
      focus: "Alcanzar KPIs · Validar sistema · Decisión escala post-90d",
      items: [
        "Target: 15–20 ventas en el mes",
        "LAL de compradores 1% (si ≥50 purchasers como base)",
        "Test bundle: ROB + 2 años filtros prepagados",
        "Flujo de referidos activo desde primeros clientes",
        "Entregable D90: Dashboard actuals vs E7 + recomendación",
      ],
    },
  ];

  return (
    <Section id="timeline" bg="white">
      <SectionHead tag="E8 — Plan de ejecución" title="~112 días · $30,000"
        sub="Pre-launch extendido porque WooCommerce y quiz deben construirse desde cero. Los 90 días de paid media no cambian." />
      <div ref={ref} className="fade-up space-y-4">
        {phases.map((p, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${p.border}` }}>
            <div className="flex flex-col md:flex-row">
              {/* Left label */}
              <div className="md:w-44 shrink-0 p-5 flex flex-col justify-between" style={{ background: p.bg }}>
                <div>
                  <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2"
                    style={{ background: p.badgeColor, color: "#fff" }}>
                    {p.badge}
                  </span>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", color: p.color }}
                    className="font-black text-xl">{p.phase}</h3>
                  <p className="text-xs text-[#546E7A] mt-0.5">{p.days}</p>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-[#546E7A]">Inversión</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", color: p.color }}
                    className="text-2xl font-black">{p.invest}</div>
                </div>
              </div>
              {/* Right content */}
              <div className="flex-1 p-5 bg-white">
                <p className="text-sm font-semibold text-[#002856] mb-3">{p.focus}</p>
                <ul className="space-y-1.5">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#546E7A]">
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#6BBFC4]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   SUPUESTOS CONFIRMADOS
══════════════════════════════════════════════ */
function Supuestos() {
  const ref = useScrollFade();
  const rows = [
    { punto: "Certificación NSF/ANSI 58", estado: "OK", estadoLabel: "Confirmado", impacto: "Claims de membrana certificada en Permitidos. Copies actualizados con este respaldo." },
    { punto: "Registro FDA", estado: "OK", estadoLabel: "Confirmado", impacto: "Refuerza legitimidad del producto. Usar en copy de autoridad (Pieza 2)." },
    { punto: "Laboratorios independientes", estado: "OK", estadoLabel: "Confirmados", impacto: "Respaldo para claims de reducción de contaminantes. Verificar % por compuesto." },
    { punto: "Cuentas Meta Ads", estado: "OK", estadoLabel: "Historial activo", impacto: "CPL M1 en Meta más cercano al escenario Base ($30). Lookalike disponible antes." },
    { punto: "Closer humano", estado: "OK", estadoLabel: "Confirmado", impacto: "Experiencia en venta consultiva. Sistema de agendamiento activo desde M1." },
    { punto: "DMA prioritario", estado: "OK", estadoLabel: "Miami", impacto: "Miami = DMA 1 en prospección. Historial local potencialmente aprovechable." },
    { punto: "Duración llamada de cierre", estado: "OK", estadoLabel: "30–45 min", impacto: "Confirma el SLA en E6. Flujo de nurturing calibrado para ese tiempo." },
    { punto: "Checkout WooCommerce", estado: "NO", estadoLabel: "No existe", impacto: "Construir desde cero. Pre-lanzamiento extendido a 4 semanas." },
    { punto: "Quiz de triaje", estado: "NO", estadoLabel: "No existe", impacto: "Diseñar desde cero. JJ tiene lógica de 3 rutas; la compartirá." },
    { punto: "Cuentas Google Ads", estado: "WARN", estadoLabel: "Historial limitado", impacto: "Replantear estructura antes de reactivar. CPL Google M1 más conservador." },
  ];

  const badge = (estado: string, label: string) => {
    if (estado === "OK")   return <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F7F0] text-[#1A7A4A]">{label}</span>;
    if (estado === "NO")   return <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FEF2F2] text-[#BE123C]">{label}</span>;
    return                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF8EC] text-[#7A4800]">{label}</span>;
  };

  return (
    <Section id="supuestos" bg="light">
      <SectionHead tag="Respuestas de JJ Solís" title="Supuestos confirmados"
        sub="Respuestas recibidas el 13 de junio de 2026. Cada punto modifica directamente la estrategia." />
      <div ref={ref} className="fade-up bg-white rounded-2xl shadow-sm border border-[#C0E7EA]/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#002856] text-white">
                <th className="text-left px-5 py-3.5 font-semibold text-xs tracking-wide">Punto</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs tracking-wide">Estado</th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs tracking-wide">Impacto en el sistema</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={`border-t border-[#EEF8F9] ${i % 2 === 0 ? "bg-white" : "bg-[#EEF8F9]/30"}`}>
                  <td className="px-5 py-3.5 font-medium text-[#002856]">{r.punto}</td>
                  <td className="px-5 py-3.5">{badge(r.estado, r.estadoLabel)}</td>
                  <td className="px-5 py-3.5 text-[#546E7A] text-xs leading-relaxed">{r.impacto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   PRÓXIMOS PASOS
══════════════════════════════════════════════ */
function ProximosPasos() {
  const ref = useScrollFade();
  const pasos = [
    { num: 1, title: "Construir WooCommerce", desc: "Checkout + financiamiento $111/mes + pasarela de pago. Confirmar proveedor de financiamiento con JJ.", urgency: "crítico" },
    { num: 2, title: "Quiz de triaje desde cero", desc: "JJ comparte lógica de 3 rutas (DIY / 3 Vías / White Glove). Diseñar preguntas, captura de contacto, ramificación.", urgency: "crítico" },
    { num: 3, title: "Pixel Meta + GA4 + CAPI", desc: "Configurar Conversions API en WooCommerce. Objetivo: Event Match Quality ≥7.0 para Purchase.", urgency: "alta" },
    { num: 4, title: "Integrar stack completo", desc: "Clientify CRM + n8n + ManyChat + WhatsApp Business HSM. Test de webhooks por cambio de etapa.", urgency: "alta" },
    { num: 5, title: "Grabar Pieza 2 (Fundador)", desc: "JJ Solís · selfie simple · 60–90 seg · guion listo en E2. Sin sobre-producción.", urgency: "alta" },
    { num: 6, title: "Auditar Google Ads", desc: "Revisar estructura de cuentas con historial previo antes de reactivar. Definir nueva arquitectura.", urgency: "media" },
    { num: 7, title: "Test end-to-end del funnel", desc: "Quiz → Lead en CRM → WhatsApp automático → Agendamiento → CRM actualizado. Cero errores antes del día 29.", urgency: "crítico" },
  ];

  const urgencyConfig: Record<string, { label: string; bg: string; text: string }> = {
    crítico: { label: "Crítico",  bg: "#FEF2F2", text: "#BE123C" },
    alta:    { label: "Alta",     bg: "#EEF8F9", text: "#004987" },
    media:   { label: "Media",    bg: "#F5F7F8", text: "#546E7A" },
  };

  const pending = [
    "¿Los reportes de laboratorio incluyen % de reducción por contaminante (PFAS, plomo)?",
    "Confirmar proveedor de financiamiento a $111/mes para integrar en WooCommerce",
    "Compartir fotografía de producto de alta resolución (Pieza 3 y Pieza 1)",
  ];

  return (
    <Section id="pasos" bg="deep">
      <SectionHead tag="Antes del lanzamiento" title="Próximos pasos"
        sub="Todo esto debe estar listo antes del día 29. No se activa tráfico hasta tener el funnel probado end-to-end." />
      <div ref={ref} className="fade-up grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Steps */}
        <div className="lg:col-span-2 space-y-3">
          {pasos.map(p => {
            const uc = urgencyConfig[p.urgency];
            return (
              <div key={p.num} className="flex gap-4 bg-white rounded-xl border border-[#C0E7EA]/40 p-4 shadow-sm card-hover">
                <div className="shrink-0">
                  <div style={{ fontFamily: "'Montserrat', sans-serif" }}
                    className="w-9 h-9 rounded-full bg-[#002856] text-white flex items-center justify-center text-sm font-black">
                    {p.num}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-[#002856] text-sm">{p.title}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: uc.bg, color: uc.text }}>
                      {uc.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#546E7A] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pending sidebar */}
        <div className="space-y-4">
          <div className="bg-[#FFF8EC] border border-[#F59E0B]/30 rounded-2xl p-5">
            <h4 style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="font-bold text-[#7A4800] text-sm mb-3">
              ⚠ Pendiente aclarar con JJ
            </h4>
            <ul className="space-y-3">
              {pending.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#7A4800]">
                  <span className="text-[#F59E0B] mt-0.5 shrink-0">□</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#002856] rounded-2xl p-5">
            <h4 style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="font-bold text-white text-sm mb-2">
              Decisión hito — Día 28
            </h4>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              ¿Está el funnel end-to-end sin errores? ¿WooCommerce activo? ¿Quiz funcionando con 3 rutas?
            </p>
            <div className="bg-[#C0E7EA]/10 border border-[#C0E7EA]/20 rounded-lg px-4 py-3">
              <p className="text-[#C0E7EA] text-xs font-semibold">
                Si alguno falla → no lanzar hasta resolver.<br />
                Un lead que no llega al CRM es presupuesto quemado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#002856] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-white font-black text-lg mb-1">
            INDALO <span className="text-[#C0E7EA]">ROB</span>
          </div>
          <p className="text-white/40 text-xs">Sistema de Lanzamiento · Mercado Hispano USA</p>
        </div>
        <div className="text-center text-xs text-white/40">
          <p>Andrés Felipe Arias · Growth Marketing Director</p>
          <p className="mt-0.5">Junio 2026 · Confidencial</p>
        </div>
        <div className="text-right text-xs text-white/40">
          <p>Validación 90 días · $10,000/mes</p>
          <p className="mt-0.5">8 entregables · ~112 días</p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════
   ROOT COMPONENT
══════════════════════════════════════════════ */
export default function Landing() {
  // Initialize scroll animations on mount
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up, .fade-in").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main>
      <Nav />
      <Hero />
      <Sistema />
      <Entregables />
      <Modelo />
      <Timeline />
      <Supuestos />
      <ProximosPasos />
      <Footer />
    </main>
  );
}

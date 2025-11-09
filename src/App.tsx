import { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCodeOutline } from "react-icons/io5";
import { motion } from "framer-motion";

// ===== Replace these imports with your local images (Vite/CRA will inline them correctly) =====
import escritorio from "./assets/aplicacion.jpg";
import certificado1 from "./assets/certificado1.jpg";
import certificado2 from "./assets/certificado2.jpg";
import dashboard from "./assets/dashboard.png";
import celu from "./assets/celu.png";
import micro from "./assets/micro.png";
// ============================================================================================

export default function App() {
  // --- Rotating headline (bug‑free) ---
  const phrases = useMemo(
    () => [
      "Desarrollador Web",
      "En constante aprendizaje",
      "Apasionado por la Tecnología",
      "Trabajo en equipo y comunicación",
    ],
    []
  );
  const [headline, setHeadline] = useState(phrases[0]);
  const idxRef = useRef(0);
  useEffect(() => {
    const t = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % phrases.length;
      setHeadline(phrases[idxRef.current]);
    }, 2200);
    return () => clearInterval(t);
  }, [phrases]);

  // --- Image modal ---
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // --- Portfolio data ---
  type Item = {
    id: number;
    categoria: "web" | "movil";
    titulo: string;
    descripcion: string;
    git: string;
    image: string;
  };

  const portafolio: Item[] = [
    {
      id: 1,
      categoria: "web",
      titulo: "AxiomaPOS (en desarrollo)",
      descripcion:
        "Sistema POS colaborativo para restaurantes/tiendas/hoteles con gestión de ventas e inventario. Arquitectura multiplataforma (Web + Android).",
      git: "https://github.com/Organizacion-AxiomaGest/AxiomaPos",
      image: dashboard,
    },
    {
      id: 2,
      categoria: "web",
      titulo: "Minishop — Microfrontends",
      descripcion:
        "Demostración con Single‑SPA, React, MUI y React Query. Módulos independientes, despliegues autónomos y base TypeScript escalable.",
      git: "https://github.com/juanca1406/Minishop",
      image: micro,
    },
    {
      id: 3,
      categoria: "movil",
      titulo: "App AxiomaPOS — React Native",
      descripcion:
        "App móvil moderna con React Native + Tailwind y React Query para estado y sincronización. UI limpia, rendimiento fluido.",
      git: "https://github.com/juanca1406/App-Sistema-pos",
      image: celu,
    },
  ];

  // --- Filtering ---
  type Category = "Todo" | "Web" | "Móvil";
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todo");
  const filtered = useMemo(() => {
    if (selectedCategory === "Todo") return portafolio;
    if (selectedCategory === "Web") return portafolio.filter((i) => i.categoria === "web");
    return portafolio.filter((i) => i.categoria === "movil");
  }, [selectedCategory]);

  // --- Active section tracking (highlights nav as you scroll) ---
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (ents) => {
        ents.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0.1 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // --- Smooth scroll helper ---
  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar (desktop) / Topbar (mobile) */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col justify-between border-r bg-white/80 p-6 shadow-2xl backdrop-blur-xl md:flex">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Juan Carlos <span className="text-indigo-600">Martínez</span>
          </h1>
          <p className="mt-1 text-xs text-gray-500">Desarrollador Software • Colombia</p>
          <nav className="mt-8 flex flex-col gap-4">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "quien-soy", label: "Quién soy" },
              { id: "portafolio", label: "Portafolio" },
              { id: "certificados", label: "Certificaciones" },
              { id: "contactos", label: "Contacto" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link.id)}
                className={`text-left text-sm font-medium transition-colors hover:text-indigo-600 ${active === link.id ? "text-indigo-600" : "text-gray-700"
                  }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <footer className="text-xs text-gray-500">
          © {new Date().getFullYear()} — JM
        </footer>
      </aside>

      {/* Mobile topbar */}
      <header className="sticky top-0 z-40 border-b bg-white/80 px-4 py-3 shadow-sm backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-lg font-bold">JM Portafolio</h1>
          <nav className="flex items-center gap-4 text-sm">
            <button onClick={() => goTo("inicio")} className={active === "inicio" ? "text-indigo-600" : ""}>
              Inicio
            </button>
            <button onClick={() => goTo("quien-soy")} className={active === "quien-soy" ? "text-indigo-600" : ""}>
              Yo
            </button>
            <button onClick={() => goTo("portafolio")} className={active === "portafolio" ? "text-indigo-600" : ""}>
              Proyectos
            </button>
            <button onClick={() => goTo("contactos")} className={active === "contactos" ? "text-indigo-600" : ""}>
              Contacto
            </button>
          </nav>
        </div>
      </header>

      {/* Main content wrapper (leaves room for sidebar) */}
      <main className="md:ml-64">
        {/* HERO */}
        <section id="inicio" className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-16 md:text-left">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              src={escritorio}
              alt="Escritorio de desarrollo — setup de trabajo"
              className="h-64 w-full max-w-md rounded-2xl object-cover shadow-xl md:h-80"
            />
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl font-extrabold leading-tight sm:text-5xl"
              >
                Hola, soy <span className="text-indigo-600">Juan Carlos</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 text-lg text-gray-700"
              >
                {headline}
              </motion.p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contactos"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  Contacto
                </a>
                <a
                  href="/cv.pdf" // Reemplaza con tu ruta real de CV
                  download
                  className="rounded-xl border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-50"
                >
                  Descargar CV
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="quien-soy" className="border-y bg-white/60 py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold"
              >
                ¿Quién soy?
              </motion.h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Técnico en Análisis de Software y estudiante de Tecnología en Desarrollo de Software (6.º semestre).
                Experiencia construyendo soluciones con <b>Django</b>, <b>React</b> y <b>React Native</b>, control de versiones con <b>Git</b> y diseño de interfaces orientadas a accesibilidad y rendimiento.
                Enfocado en aprender rápido, entregar valor y trabajar en equipo.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-gray-700">
                <li className="rounded-lg bg-gray-100 px-3 py-2">React • React Native</li>
                <li className="rounded-lg bg-gray-100 px-3 py-2">TypeScript • Tailwind</li>
                <li className="rounded-lg bg-gray-100 px-3 py-2">Django • REST APIs</li>
                <li className="rounded-lg bg-gray-100 px-3 py-2">Git • CI/CD básico</li>
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <img
                src={escritorio}
                alt="Ambiente de trabajo — laptop y escritorio"
                className="h-80 w-full rounded-2xl object-cover shadow-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portafolio" className="bg-gradient-to-b from-white to-indigo-50 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <h3 className="text-2xl font-bold">Portafolio</h3>
              <div className="flex flex-wrap items-center gap-2">
                {(["Todo", "Web", "Móvil"] as Category[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`rounded-full border px-4 py-1.5 text-sm transition ${selectedCategory === c
                      ? "border-indigo-600 bg-indigo-600 text-white shadow"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    aria-pressed={selectedCategory === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {filtered.map((row) => (
                <motion.article
                  key={row.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <IoCodeOutline className="h-6 w-6 text-indigo-600" />
                    <h4 className="text-lg font-semibold">{row.titulo}</h4>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-600">{row.descripcion}</p>
                  <div className="mt-4 overflow-hidden rounded-xl">
                    <img
                      src={row.image}
                      alt={`Vista previa de ${row.titulo}`}
                      className="h-52 w-full cursor-zoom-in rounded-xl object-cover transition duration-300 group-hover:scale-[1.02]"
                      onClick={() => setSelectedImage(row.image)}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                      {row.categoria === "web" ? "Web" : "Móvil"}
                    </span>
                    <a
                      href={row.git}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:underline"
                    >
                      <FaGithub className="h-5 w-5" /> Código
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICADOS */}
        <section id="certificados" className="border-y bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h3 className="text-2xl font-bold">Certificaciones</h3>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <CertCard
                img={certificado1}
                title="Ultimate Python"
                text={
                  <>
                    Certificado por completar el curso <b>Ultimate Python</b> (Hola Mundo). <br /> Emitido el
                    <b> 8 de abril de 2024</b>.
                  </>
                }
                onOpen={() => setSelectedImage(certificado1)}
              />
              <CertCard
                img={certificado2}
                title="React — Guía Definitiva"
                text={
                  <>
                    Certificado por completar <b>React: Hooks, Router, Redux, Next + Proyectos</b> (Hola Mundo). <br />
                    Emitido el <b>8 de abril de 2024</b>.
                  </>
                }
                onOpen={() => setSelectedImage(certificado2)}
              />
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contactos" className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-100 via-white to-violet-100" />
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold">Contacto</h3>
                <p className="mt-3 text-gray-700">
                  ¿Hablamos de tu proyecto? Estoy disponible para colaborar en desarrollo del software.
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  <li>
                    <b>Teléfono:</b> <a href="tel:+573184620843" className="text-indigo-700 hover:underline">+57 318 462 0843</a>
                  </li>
                  <li>
                    <b>Email:</b> <a href="mailto:juan1406ma@gmail.com" className="text-indigo-700 hover:underline">juan1406ma@gmail.com</a>
                  </li>
                </ul>
                <div className="mt-6 flex items-center gap-4">
                  <a href="https://github.com/juanca1406" className="text-gray-700 transition hover:text-indigo-700" target="_blank" rel="noreferrer">
                    <FaGithub className="h-7 w-7" />
                  </a>
                  <a href="mailto:juan1406ma@gmail.com" className="text-gray-700 transition hover:text-indigo-700">
                    <MdEmail className="h-7 w-7" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/juan-carlos-martinez-martinez-121a84243/?trk=opento_sprofile_details"
                    className="text-gray-700 transition hover:text-indigo-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedin className="h-7 w-7" />
                  </a>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border bg-white p-6 shadow-xl"
              >
                <h4 className="text-lg font-semibold">¿Por qué contratarme?</h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                  <li>Entrega continua: versiones funcionales y comunicación clara.</li>
                  <li>Stack moderno: React, React Native, TypeScript, Django.</li>
                  <li>Buenas prácticas: Git, componentes reutilizables y accesibles.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-6"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={selectedImage}
            alt="Vista ampliada"
            className="max-h-[85vh] w-auto max-w-6xl rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

function CertCard({
  img,
  title,
  text,
  onOpen,
}: {
  img: string;
  title: string;
  text: JSX.Element;
  onOpen: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl">
      <button className="block w-full overflow-hidden" onClick={onOpen} aria-label={`Ampliar certificado ${title}`}>
        <img src={img} alt={`Certificado ${title}`} className="h-64 w-full object-cover transition hover:scale-[1.02]" />
      </button>
      <div className="p-5">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="mt-2 text-sm text-gray-700">{text}</p>
      </div>
    </article>
  );
}
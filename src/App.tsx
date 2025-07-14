import { SetStateAction, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import escritorio from "./assets/aplicacion.jpg";
import certificado1 from "./assets/certificado1.jpg";
import certificado2 from "./assets/certificado2.jpg";
import { IoCodeOutline } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import dashboard from "./assets/dashboard.png";
import celu from "./assets/celu.png";
import micro from "./assets/micro.png";
import foto from "./assets/foto.png";

function App() {
  const text = ["Desarrollador web", "Desarrollador App Móvil", "Apasionado por la tecnología"];
  const [cambio, setCambio] = useState<string>(text[0]);
  let index = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % text.length; // Cambia al siguiente texto
      setCambio(text[index]);
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [text]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const portafolio = [
    {
      id: 1,
      categoria: "web",
      titulo: "Sistemas Pos (En proceso)",
      descripcion: "AxiomaPos es un sistema POS desarrollado de manera colaborativa junto con mi equipo. Este proyecto tiene como objetivo optimizar la gestión de ventas e inventarios en restaurantes, tiendas y hoteles. y una integración multiplataforma (web y Android).",
      git: "https://github.com/Organizacion-AxiomaGest/AxiomaPos",
      icon: <FaGithub size={36} />,
      image: dashboard,
    },
    {
      id: 2,
      categoria: "web",
      titulo: "Minishop",
      descripcion: "Este proyecto explora el uso de microfrontends con Single SPA para dividir aplicaciones en módulos independientes y desplegarlos de forma autónoma. Utilicé React, Material-UI y React Query para crear una interfaz dinámica y optimizar el manejo de datos. Con TypeScript, logré una estructura robusta y escalable. Este experimento combina tecnologías modernas para construir aplicaciones modulares y eficientes.",
      git: "https://github.com/juanca1406/Minishop",
      icon: <FaGithub size={36} />,
      image: micro,
    },
    {
      id: 3,
      categoria: "movil",
      titulo: "AppAxiomaPos",
      descripcion: "Este proyecto fue desarrollado con React Native para construir una aplicación móvil moderna y eficiente. Utilicé Tailwind CSS para estilizar la interfaz de forma rápida y consistente, logrando un diseño limpio y responsivo. Además, implementé React Query para manejar el estado y las solicitudes de datos de forma óptima, mejorando la experiencia del usuario con actualizaciones en tiempo real. Este enfoque permitió combinar diseño atractivo y rendimiento fluido en un entorno móvil.",
      git: "https://github.com/juanca1406/App-Sistema-pos",
      icon: <FaGithub size={36} />,
      image: celu,
    },

  ]

  const filteredPortfolio = selectedCategory === "All"
    ? portafolio
    : portafolio.filter((item) =>
      selectedCategory === "Diseño web" && item.categoria === "web" ||
      selectedCategory === "Diseño móvil" && item.categoria === "movil"
    );


  const handleCategoryClick = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  return (

    <div className="flex">
      <div className="w-1/5 h-screen fixed flex flex-col justify-between p-8 bg-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Portafolio<span className="text-blue-500">.</span>
        </h1>
        <nav className="flex flex-col mt-10 space-y-10">
          <a href="#inicio" className="text-sm font-medium text-gray-900 hover:text-blue-500">
            Inicio
          </a>
          <a href="#quien-soy" className="text-sm font-medium text-gray-900 hover:text-blue-500">
            Quién soy
          </a>
          <a href="#portafolio" className="text-sm font-medium text-gray-900 hover:text-blue-500">
            Portafolio
          </a>
          <a href="#certificados" className="text-sm font-medium text-gray-900 hover:text-blue-500">
            Certificaciones
          </a>
          <a href="#contactos" className="text-sm font-medium text-gray-900 hover:text-blue-500">
            Contacto
          </a>
        </nav>
        <footer className="text-sm text-gray-500 mt-10">
          Copyright © 2024 by{" "}
          <a href="#" className="text-blue-500 hover:underline">
            JM
          </a>
        </footer>
      </div>

      <div id="inicio" className="ml-[20%] w-[80%] h-screen shadow-2xl border">
        <div className="bg-cover bg-center bg-[url('./assets/new113.jpg')] h-screen flex">
          <div className="ml-40 my-auto">
            <h1 className="text-5xl font-bold">Juan Carlos Martinez M</h1>
            <p className="text-lg mt-4">Soy un {cambio}</p>
            <br />
            <a href="#contactos"><button type="submit" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              contactos
            </button></a>
          </div>
        </div>

        <div id="quien-soy" className="flex bg-[url('./assets/5723102.jpg')] gap-4 h-screen items-center justify-center p-8 shadow-2xl border">
          <img src={escritorio} alt="" className="rounded-lg bg-cover bg-center w-[50%] h-[50%] ml-10" p-2 shadow-xl />
          <div className="p-8 bg-white shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold">¿Quién soy?</h2>
            <p className="mt-4 text-gray-600">
              soy Técnico en Análisis de Software y estudiante de Tecnología en Desarrollo de Software (6° semestre). He desarrollado proyectos personales y colaborativos utilizando Django, React y React Native, aplicando metodologías ágiles como Scrum.
              Trabajo regularmente con Git y despliego APIs en Railway. Mi experiencia incluye diseño de interfaces, creación de CRUDs y consumo de APIs tanto en aplicaciones web como móviles. Estoy comprometido con el aprendizaje continuo y la creación de soluciones prácticas e innovadoras.
            </p>
            <br /><br />
            <button type="submit" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Download CV
            </button>
          </div>
        </div>

        <div id="portafolio" className="p-40 bg-[url('./assets/rm222-mind-24.jpg')] shadow-2xl border">
          <h2 className="text-3xl font-bold text-center">Portafolio</h2>
          <br />
          <div className="flex gap-10 justify-center">
            {["All", "Diseño web", "Diseño móvil"].map((category) => (
              <a
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-sm font-medium cursor-pointer ${selectedCategory === category ? "text-blue-500" : ""
                  }`}
              >
                {category}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1  xs:grid-cols-2 sm:grid-cols-2 gap-10 p-8">
            {filteredPortfolio.map((row) => (
              <div className="bg-white shadow-xl rounded-lg p-8">
                <IoCodeOutline size={36} color="primary" />
                <br />
                <h2 className="text-3xl font-bold">{row.titulo}</h2>
                <p className="mt-4 text-gray-600">
                  {row.descripcion}
                </p><br />
                <img src={row.image} alt="" className="cursor-pointer" onClick={() => setSelectedImage(row.image)} />
                <br />
                <a className="flex justify-center" href={row.git}>
                  <FaGithub size={36} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div id="certificados" className="p-40 bg-gray-100">
          <h2 className="text-3xl font-bold text-center">Certificados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
            <div className="bg-white shadow-xl rounded-lg p-8">
              <img src={certificado1} alt="Certificado Ultimate Python" className="rounded-md mb-4 cursor-pointer" onClick={() => setSelectedImage(certificado1)} />
              <h3 className="text-xl font-bold">Ultimate Python</h3>
              <p className="mt-2 text-gray-600">
                Certificado obtenido por completar el curso <b>Ultimate Python</b>, otorgado por <b>Hola Mundo</b>. Emitido el <b>8 de abril de 2024</b>.
              </p>
            </div>
            <div className="bg-white shadow-xl rounded-lg p-8">
              <img src={certificado2} alt="Certificado React" className="rounded-md mb-4 cursor-pointer" onClick={() => setSelectedImage(certificado2)} />
              <h3 className="text-xl font-bold">React - Guía Definitiva</h3>
              <p className="mt-2 text-gray-600">
                Certificado obtenido por completar el curso <b>React - Guía definitiva: hooks, router, redux, next + Proyectos</b>, otorgado por <b>Hola Mundo</b>. Emitido el <b>8 de abril de 2024</b>.
              </p>
            </div>
          </div>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setSelectedImage(null)}
          >
            <img src={selectedImage} alt="Certificado Ampliado" className="rounded-lg max-w-6xl max-h-full" />
          </div>
        )}


        <div id="contactos" className="bg-cover bg-center h-screen flex bg-[url('./assets/5594016.jpg')]">
          <div className="ml-40 my-auto">
            <h1 className="text-5xl font-bold">Contactos</h1>
            <p className="text-lg mt-4">Número de teléfono: 3184620843</p>
            <br /><br />
            <div className="flex gap-6">
              <a href="https://github.com/juanca1406" className="text-blue-500">
                <FaGithub size={36} />
              </a>
              <a href="mailto:juan1406ma@gmail.com" className="text-blue-500">
                <MdEmail size={36} />
              </a>
              <a href="https://www.linkedin.com/in/juan-carlos-martinez-martinez-121a84243/?trk=opento_sprofile_details" className="text-blue-500">
                <FaLinkedin size={36} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

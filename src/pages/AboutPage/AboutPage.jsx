import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import SEOHelmet from "../../components/SEOHelmet/SEOHelmet";
import seoData from "../../utils/seoData";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FiShield, FiHeart, FiStar, FiMapPin, FiUsers, FiCheckCircle, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaWhatsapp, FaRoute, FaHandshake, FaAward } from "react-icons/fa";
import "./AboutPage.css";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState({
    description: "", 
    aboutCarousel: { images: [] },
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutRef = doc(db, "content", "about");
        const aboutDoc = await getDoc(aboutRef);
        if (aboutDoc.exists()) {
          const data = aboutDoc.data();
          setAboutData({
            description: data.description || "",
            aboutCarousel: { images: data.aboutCarousel?.images || [] },
          });
        }

        const whatsappRef = doc(db, "settings", "whatsapp");
        const whatsappDoc = await getDoc(whatsappRef);
        if (whatsappDoc.exists()) {
          setWhatsappNumber(whatsappDoc.data().number || "");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  // Auto-play carrossel
  useEffect(() => {
    const images = aboutData.aboutCarousel?.images || [];
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [aboutData.aboutCarousel?.images]);

  const images = aboutData.aboutCarousel?.images || [];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  const valores = [
    { icon: <FiShield />, title: "Segurança", description: "Motoristas credenciados, veículos revisados e seguro total em todas as viagens." },
    { icon: <FiHeart />, title: "Atendimento Humano", description: "Atendemos cada cliente de forma personalizada e com carinho." },
    { icon: <FaRoute />, title: "Pontualidade", description: "Compromisso com horários para que sua viagem comece sem estresse." },
    { icon: <FaHandshake />, title: "Confiança", description: "Anos de experiência com milhares de clientes satisfeitos." },
    { icon: <FiStar />, title: "Qualidade", description: "Veículos confortáveis e em excelente estado de conservação." },
    { icon: <FaAward />, title: "Experiência", description: "Equipe experiente que conhece cada detalhe dos destinos do Ceará." },
  ];

  const diferenciais = [
    { number: "5+", label: "Anos de experiência" },
    { number: "1000+", label: "Clientes atendidos" },
    { number: "50+", label: "Destinos no Ceará" },
    { number: "4.9", label: "Nota de avaliação" },
  ];

  return (
    <div className="about-page-modern">
      <SEOHelmet
        title={seoData.sobre?.title || "Sobre Nós - DineiTur"}
        description={seoData.sobre?.description || "Conheça a DineiTur, sua agência de transfers e passeios em Fortaleza e Ceará."}
        canonical={seoData.sobre?.canonical || "/about"}
        noindex={seoData.sobre?.noindex}
      />

      <Header />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <Breadcrumb currentPage="Sobre Nós" />
          <div className="about-hero-badge">
            <FiUsers /> Conheça a DineiTur
          </div>
          <h1 className="about-hero-title">
            Sua Viagem Começa<br />
            <span className="title-highlight">Com a Gente</span>
          </h1>
          <p className="about-hero-subtitle">
            Somos uma agência especializada em transfers e passeios no Ceará, oferecendo conforto, segurança e as melhores experiências turísticas.
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="about-story-section">
        <div className="about-container">
          <div className="about-story-grid">
            {/* Carrossel */}
            <div className="about-carousel-wrapper">
              {images.length > 0 ? (
                <div className="about-carousel-modern">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`about-slide ${index === currentSlide ? "active" : ""}`}
                    >
                      <img src={image.url} alt={image.title || "DineiTur"} />
                      {image.title && (
                        <div className="about-slide-caption">{image.title}</div>
                      )}
                    </div>
                  ))}

                  {images.length > 1 && (
                    <>
                      <button className="about-carousel-btn prev" onClick={prevSlide} aria-label="Anterior">
                        <FiChevronLeft />
                      </button>
                      <button className="about-carousel-btn next" onClick={nextSlide} aria-label="Próximo">
                        <FiChevronRight />
                      </button>
                      <div className="about-carousel-dots">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            className={`about-dot ${i === currentSlide ? "active" : ""}`}
                            onClick={() => setCurrentSlide(i)}
                            aria-label={`Slide ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="about-carousel-placeholder">
                  <FiMapPin />
                  <p>Fotos em breve</p>
                </div>
              )}
            </div>

            {/* Texto */}
            <div className="about-story-content">
              <div className="section-label">
                <FiHeart /> Nossa História
              </div>
              <h2 className="about-story-title">
                Transformando Viagens em<br />
                <span className="title-highlight">Memórias Inesquecíveis</span>
              </h2>
              {aboutData.description ? (
                <div className="about-story-text">
                  {aboutData.description.split("\n").map((paragraph, idx) => (
                    paragraph.trim() && <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="about-story-text">
                  <p>
                    A DineiTur nasceu da paixão por mostrar as belezas do Ceará.
                    Com anos de experiência no turismo receptivo, nossa missão é
                    oferecer transfers seguros, passeios memoráveis e um
                    atendimento que faz toda a diferença.
                  </p>
                  <p>
                    Desde a primeira viagem, nos dedicamos a proporcionar
                    experiências únicas — do aeroporto ao hotel, das praias
                    paradisíacas aos parques aquáticos, cada detalhe é pensado
                    para que você aproveite ao máximo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Números / Diferenciais */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="about-stats-grid">
            {diferenciais.map((item, index) => (
              <div key={index} className="about-stat-card">
                <span className="about-stat-number">{item.number}</span>
                <span className="about-stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="about-values-section">
        <div className="about-container">
          <div className="section-header-centered">
            <div className="section-label">
              <FiCheckCircle /> Nossos Valores
            </div>
            <h2>
              Por Que Escolher a<br />
              <span className="title-highlight">DineiTur?</span>
            </h2>
            <p className="section-description">
              Nossos pilares garantem uma experiência de viagem excepcional em cada detalhe.
            </p>
          </div>

          <div className="about-values-grid">
            {valores.map((valor, index) => (
              <div key={index} className="about-value-card">
                <div className="value-icon">{valor.icon}</div>
                <h3>{valor.title}</h3>
                <p>{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="about-cta-section">
        <div className="about-container">
          <div className="about-cta-card">
            <div className="about-cta-content">
              <h2>Pronto Para Sua Próxima Aventura?</h2>
              <p>
                Conheça nossos pacotes de transfers e passeios pelo Ceará.
                Estamos prontos para tornar sua viagem inesquecível!
              </p>
              <div className="about-cta-buttons">
                <Link to="/pacotes" className="about-btn-primary">
                  <FiMapPin />
                  Ver Pacotes
                  <FiArrowRight />
                </Link>
                {whatsappNumber && (
                  <a
                    href={`https://wa.me/55${whatsappNumber.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-btn-whatsapp"
                  >
                    <FaWhatsapp />
                    Fale Conosco
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

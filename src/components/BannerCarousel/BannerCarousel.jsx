import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiMapPin } from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { autoOptimize } from '../../utils/cloudinaryOptimizer';
import './BannerCarousel.css';

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        console.log('🎨 Buscando banners do hero...');
        // Buscar todos os banners e filtrar/ordenar no código para evitar índice composto
        const querySnapshot = await getDocs(collection(db, 'banners'));
        
        const bannersData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(banner => banner.ativo === true) // Filtrar apenas ativos
          .sort((a, b) => (a.ordem || 0) - (b.ordem || 0)); // Ordenar por ordem

        console.log(`✅ ${bannersData.length} banners ativos carregados`);
        // Se não há banners no Firebase, usar banners padrão
        if (bannersData.length === 0) {
          setBanners([
            {
              id: 'default1',
              titulo: 'Explore Destinos Incríveis',
              subtitulo: 'Suas melhores férias começam aqui',
              imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
              botaoTexto: 'Ver Pacotes',
              botaoLink: '/pacotes',
              ativo: true,
              ordem: 1
            },
            {
              id: 'default2',
              titulo: 'Viagens Personalizadas',
              subtitulo: 'Planeje sua viagem dos sonhos',
              imagem: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
              botaoTexto: 'Saiba Mais',
              botaoLink: '/contato',
              ativo: true,
              ordem: 2
            }
          ]);
        } else {
          setBanners(bannersData);
        }
      } catch (err) {
        console.error('❌ Erro ao buscar banners:', err);
        // Banners fallback caso dê erro
        setBanners([
          {
            id: 'fallback1',
            titulo: 'Explore Destinos Incríveis',
            subtitulo: 'Suas melhores férias começam aqui',
            imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
            botaoTexto: 'Ver Pacotes',
            botaoLink: '/pacotes'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto play
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, nextSlide, isPaused]);

  if (loading) {
    return (
      <div className="banner-carousel-loading">
        <LoadingSpinner size="large" text="Carregando banners..." />
      </div>
    );
  }

  // Removido: if (banners.length === 0) return null;
  // Agora sempre mostra pelo menos banners padrão

  return (
    <section 
      className="banner-carousel-hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="banner-slides-container">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`banner-slide ${index === currentSlide ? 'active' : ''} ${
              index === (currentSlide - 1 + banners.length) % banners.length ? 'prev' : ''
            } ${index === (currentSlide + 1) % banners.length ? 'next' : ''}`}
          >
            <div className="banner-image-wrapper">
              <img 
                src={autoOptimize(banner.imagem, 'banner')} 
                alt={banner.titulo}
                className="banner-image"
                width="1920"
                height="800"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchpriority={index === 0 ? 'high' : undefined}
              />
              <div className="banner-overlay"></div>
            </div>

            <div className="banner-content">
              <div className="banner-text-container">
                {banner.localizacao && (
                  <div className="banner-location">
                    <FiMapPin />
                    <span>{banner.localizacao}</span>
                  </div>
                )}
                
                <h1 className="banner-title">{banner.titulo}</h1>
                
                {banner.subtitulo && (
                  <p className="banner-subtitle">{banner.subtitulo}</p>
                )}

                {banner.descricao && (
                  <p className="banner-description">{banner.descricao}</p>
                )}

                <div className="banner-actions">
                  {banner.botaoTexto && banner.botaoLink && (
                    <Link 
                      to={banner.botaoLink} 
                      className="banner-btn-primary"
                    >
                      {banner.botaoTexto}
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  )}
                  
                  {banner.botaoSecundarioTexto && banner.botaoSecundarioLink && (
                    <Link 
                      to={banner.botaoSecundarioLink} 
                      className="banner-btn-secondary"
                    >
                      {banner.botaoSecundarioTexto}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button 
            className="banner-nav-btn banner-nav-prev" 
            onClick={prevSlide}
            aria-label="Banner anterior"
          >
            <FiChevronLeft />
          </button>
          <button 
            className="banner-nav-btn banner-nav-next" 
            onClick={nextSlide}
            aria-label="Próximo banner"
          >
            <FiChevronRight />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="banner-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`banner-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {banners.length > 1 && !isPaused && (
        <div className="banner-progress-bar">
          <div 
            className="banner-progress-fill"
            style={{ animationDuration: '5s' }}
          />
        </div>
      )}
    </section>
  );
};

export default BannerCarousel;

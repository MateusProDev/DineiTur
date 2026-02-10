import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import BannerCarousel from '../../components/BannerCarousel/BannerCarousel';
import PacotesCarousel from '../../components/PacotesCarousel/PacotesCarousel';
import SEOHelmet from '../../components/SEOHelmet/SEOHelmet';
import { seoData } from '../../utils/seoData';
import { 
  FiStar,
  FiClock,
  FiCheckCircle,
  FiNavigation,
  FiShield,
  FiArrowRight,
  FiHeart
} from 'react-icons/fi';
import { FaWhatsapp, FaRegGem } from 'react-icons/fa';
import { IoMdArrowRoundForward } from 'react-icons/io';
import './HomeElegantLuxury.css';

import { autoOptimize } from '../../utils/cloudinaryOptimizer';

const HomeElegantLuxury = () => {
  const navigate = useNavigate();
  const [pacotesPorCategoria, setPacotesPorCategoria] = useState({});
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [services, setServices] = useState([]);
  const [whyChooseUsData, setWhyChooseUsData] = useState([]);

  const categorias = {
    'passeio': 'Experiências Exclusivas',
    'transfers': 'Traslados Premium'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar WhatsApp
        const whatsappDoc = await getDoc(doc(db, 'settings', 'whatsapp'));
        if (whatsappDoc.exists()) {
          setWhatsappNumber(whatsappDoc.data().number || '');
        }

        // Buscar Serviços do Firestore
        const servicesDoc = await getDoc(doc(db, 'content', 'servicesSection'));
        if (servicesDoc.exists() && servicesDoc.data().services) {
          setServices(servicesDoc.data().services);
        } else {
          // Fallback para dados estáticos elegantes
          setServices([
            {
              image: '/aviaoservico.png',
              title: 'Traslados Executivos',
              description: 'Transporte premium com conforto e pontualidade absoluta',
              features: ['Veículos executivos', 'Motoristas qualificados', 'Monitoramento em tempo real']
            },
            {
              image: '/jericoaquaraservico.png',
              title: 'Experiências Privativas',
              description: 'Roteiros personalizados com acesso exclusivo',
              features: ['Guias especializados', 'Acesso VIP', 'Flexibilidade total']
            },
            {
              image: '/fortalezacityservico.png',
              title: 'Tour Concierge',
              description: 'Serviço completo de planejamento e acompanhamento',
              features: ['Planejamento detalhado', 'Assistência 24h', 'Experiências únicas']
            }
          ]);
        }

        // Buscar Why Choose Us do Firestore
        const whyChooseDoc = await getDoc(doc(db, 'content', 'whyChooseSection'));
        if (whyChooseDoc.exists() && whyChooseDoc.data().features) {
          setWhyChooseUsData(whyChooseDoc.data().features);
        } else {
          setWhyChooseUsData([
            {
              icon: <FaRegGem />,
              title: 'Exclusividade Garantida',
              description: 'Experiências únicas fora do comum'
            },
            {
              icon: <FiCheckCircle />,
              title: 'Qualidade Certificada',
              description: 'Padrões internacionais de excelência'
            },
            {
              icon: <FiNavigation />,
              title: 'Roteiros Inteligentes',
              description: 'Planejamento otimizado e eficiente'
            },
            {
              icon: <FiShield />,
              title: 'Segurança Absoluta',
              description: 'Protocolos rigorosos em todas as etapas'
            }
          ]);
        }

        // Buscar Pacotes (sem orderBy para evitar necessidade de índice)
        const pacotesSnapshot = await getDocs(collection(db, 'pacotes'));
        const pacotesData = pacotesSnapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        }));

        console.log('📦 TOTAL DE PACOTES CARREGADOS DO FIRESTORE:', pacotesData.length);
        console.log('📦 Primeiros 3 pacotes:', pacotesData.slice(0, 3).map(p => ({
          id: p.id,
          titulo: p.titulo,
          categoria: p.categoria,
          categorias: p.categorias,
          destaque: p.destaque
        })));

        // Ordenar no código por createdAt desc
        pacotesData.sort((a, b) => {
          const aTime = a.createdAt?.seconds || a.createdAt || 0;
          const bTime = b.createdAt?.seconds || b.createdAt || 0;
          return bTime - aTime;
        });
        
        // Agrupar pacotes
        const passeios = [];
        const transfers = [];
        
        pacotesData.forEach(pacote => {
          const categoriaPrincipal = pacote.categoria || 'passeio';
          const categoriasAdicionais = pacote.categorias || [];
          
          if (categoriaPrincipal === 'passeio' || categoriasAdicionais.includes('passeio')) {
            if (!passeios.find(p => p.id === pacote.id)) {
              passeios.push(pacote);
            }
          }
          
          const isTransfer = categoriaPrincipal.includes('transfer') || 
                            categoriasAdicionais.some(cat => cat.includes('transfer'));
          
          if (isTransfer) {
            if (!transfers.find(p => p.id === pacote.id)) {
              transfers.push(pacote);
            }
          }
        });
        
        console.log('🔍 APÓS AGRUPAMENTO:', {
          totalPasseios: passeios.length,
          totalTransfers: transfers.length
        });
        
        // Limitar a 4 pacotes por categoria para design minimalista
        let passeiosLimitados = passeios.filter(p => p.destaque === true).slice(0, 4);
        let transfersLimitados = transfers.filter(p => p.destaque === true).slice(0, 4);
        
        console.log('⭐ FILTRADOS POR DESTAQUE:', {
          passeiosDestaque: passeiosLimitados.length,
          transfersDestaque: transfersLimitados.length
        });
        
        if (passeiosLimitados.length === 0 && passeios.length > 0) {
          passeiosLimitados = passeios.slice(0, 4);
          console.log('🔄 Sem passeios destaque, pegando primeiros 4');
        }
        if (transfersLimitados.length === 0 && transfers.length > 0) {
          transfersLimitados = transfers.slice(0, 4);
          console.log('🔄 Sem transfers destaque, pegando primeiros 4');
        }
        
        const grouped = {};
        if (passeiosLimitados.length > 0) {
          grouped['passeio'] = passeiosLimitados;
        }
        if (transfersLimitados.length > 0) {
          grouped['transfers'] = transfersLimitados;
        }
        
        console.log('🎯 PACOTES AGRUPADOS PARA HOME:', {
          passeios: passeiosLimitados.length,
          transfers: transfersLimitados.length,
          grouped
        });
        
        setPacotesPorCategoria(grouped);
        
        // Buscar Avaliações (sem orderBy para evitar necessidade de índice)
        const avaliacoesSnapshot = await getDocs(collection(db, 'avaliacoes'));
        const avaliacoesData = avaliacoesSnapshot.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => {
            const aTime = a.createdAt?.seconds || a.createdAt || 0;
            const bTime = b.createdAt?.seconds || b.createdAt || 0;
            return bTime - aTime;
          })
          .slice(0, 5);
        setAvaliacoes(avaliacoesData);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Corrige dependência do useEffect

  useEffect(() => {
    try {
      const fullTitle = seoData.home.title ? `${seoData.home.title} | Elegant Travel` : 'Elegant Travel | Experiências Premium';
      document.title = fullTitle;
    } catch (e) {}
  }, []);

  const handleWhatsApp = (message = '') => {
    const encodedMessage = encodeURIComponent(message);
    const number = whatsappNumber || '5511999999999';
    window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="home-elegant-luxury">
      <SEOHelmet 
        title={seoData.home.title ? `${seoData.home.title} | Elegant Travel` : 'Elegant Travel'}
        description={seoData.home.description || 'Experiências de viagem premium com excelência e exclusividade'}
        canonical={seoData.home.canonical}
        ogType="website"
      />
      
      <Header />
      
      {/* Hero Minimalista */}
      <section className="hero-minimalist">
        <BannerCarousel />
        <div className="hero-overlay"></div>
      </section>

      {/* Seção de Destaques */}
      <section className="highlights-section">
        <div className="container-elegant">
          <div className="section-header-elegant">
            <h2>
              <span className="section-prefix">Destinos Selecionados</span>
              <span className="section-title-main">Para Momentos Únicos</span>
            </h2>
            <p className="section-description-elegant">
              Coleção cuidadosamente selecionada de experiências que transcendem o comum
            </p>
          </div>

          {loading ? (
            <div className="loading-minimalist">
              <div className="loading-dots">
                <div></div><div></div><div></div>
              </div>
            </div>
          ) : Object.keys(pacotesPorCategoria).length === 0 ? (
            <div className="empty-state-elegant">
              <FaRegGem />
              <h3>Novas experiências em preparação</h3>
              <p>Estamos selecionando destinos excepcionais para você</p>
            </div>
          ) : (
            <div className="elegant-carousels">
              {Object.entries(pacotesPorCategoria).map(([categoria, pacotesCategoria]) => (
                <div key={categoria} className="carousel-section-elegant">
                  <div className="carousel-header">
                    <h3>{categorias[categoria] || categoria}</h3>
                    <Link to="/pacotes" className="view-all-link">
                      Ver todos <FiArrowRight />
                    </Link>
                  </div>
                  <PacotesCarousel 
                    pacotes={pacotesCategoria}
                    categoria={categorias[categoria] || categoria}
                    autoPlayInterval={6000}
                    verMaisLink="/pacotes"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Serviços Premium */}
      <section className="services-elegant-section">
        <div className="container-elegant">
          <div className="section-header-elegant center">
            <h2>
              <span className="section-prefix">Nossos Serviços</span>
              <span className="section-title-main">Excelência em Cada Etapa</span>
            </h2>
          </div>

          <div className="services-grid-elegant">
            {services.map((service, index) => (
              <div 
                key={service.id || index} 
                className="service-card-elegant"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="service-image-container">
                  <img 
                    src={autoOptimize(service.image, 'elegantService')}
                    alt={service.title}
                    className="service-image-elegant"
                    loading="lazy"
                  />
                  <div className="service-overlay-elegant"></div>
                  <div className="service-index">0{index + 1}</div>
                </div>
                
                <div className="service-content-elegant">
                  <h3 className="service-title-elegant">{service.title}</h3>
                  <p className="service-description-elegant">{service.description}</p>
                  
                  {service.features && (
                    <ul className="service-features">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex}>
                          <FiCheckCircle />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <button 
                    onClick={() => {
                      if (service.link) {
                        navigate(service.link);
                      } else {
                        const url = `https://wa.me/5585986435640?text=${encodeURIComponent(`Gostaria de saber mais sobre: ${service.title}`)}`;
                        window.open(url, '_blank');
                      }
                    }}
                    className="service-cta-elegant"
                  >
                    <span>Solicitar Detalhes</span>
                    <IoMdArrowRoundForward />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que Escolher - Design de Revista */}
      <section className="why-choose-elegant">
        <div className="container-elegant">
          <div className="why-choose-grid">
            <div className="why-choose-content-elegant">
              <div className="section-header-elegant">
                <h2>
                  <span className="section-prefix">Nossa Filosofia</span>
                  <span className="section-title-main">A Arte de Viajar Bem</span>
                </h2>
              </div>
              
              <div className="philosophy-text">
                <p>
                  Acreditamos que viagens memoráveis são criadas através de detalhes. 
                  Cada experiência é meticulosamente planejada para oferecer não apenas 
                  conforto, mas momentos que ficam gravados na memória.
                </p>
              </div>
              
              <div className="features-grid-elegant">
                {(whyChooseUsData.length > 0 ? whyChooseUsData : []).map((feature, index) => (
                  <div key={index} className="feature-card-elegant">
                    <div className="feature-icon-elegant">
                      {feature.icon}
                    </div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/sobre')}
                className="btn-elegant-outline"
              >
                Conheça Nossa História
              </button>
            </div>
            
            <div className="why-choose-image">
              <div className="image-composition">
                <div className="main-image"></div>
                <div className="secondary-image"></div>
                <div className="tertiary-image"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos Elegantes */}
      {avaliacoes.length > 0 && (
        <section className="testimonials-elegant">
          <div className="container-elegant">
            <div className="testimonials-header">
              <h2>
                <span className="section-prefix">Testemunhos</span>
                <span className="section-title-main">A Confiança dos Nossos Viajantes</span>
              </h2>
            </div>
            
            <div className="testimonials-grid">
              {avaliacoes.slice(0, 3).map((avaliacao, index) => (
                <div key={avaliacao.id} className="testimonial-card-elegant">
                  <div className="testimonial-quote">
                    <FiHeart />
                  </div>
                  
                  <div className="testimonial-stars-elegant">
                    {[...Array(avaliacao.nota || 5)].map((_, i) => (
                      <FiStar key={i} />
                    ))}
                  </div>
                  
                  <blockquote className="testimonial-text-elegant">
                    "{avaliacao.comentario}"
                  </blockquote>
                  
                  <div className="testimonial-author-elegant">
                    <div className="author-initials">
                      {avaliacao.nomeCliente?.split(' ').map(n => n[0]).join('') || 'VS'}
                    </div>
                    <div className="author-info-elegant">
                      <h4>{avaliacao.nomeCliente || 'Viajante Satisfeito'}</h4>
                      <p>{avaliacao.destino || 'Experiência Premium'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final Minimalista */}
      <section className="cta-elegant-final">
        <div className="container-elegant">
          <div className="cta-content-elegant">
            <h2 className="cta-title-elegant">
              Pronto para sua próxima experiência premium?
            </h2>
            <p className="cta-text-elegant">
              Entre em contato para um planejamento personalizado
            </p>
            
            <div className="cta-buttons-elegant">
              <button 
                onClick={() => handleWhatsApp('Gostaria de agendar uma consultoria de viagem')}
                className="btn-elegant-whatsapp"
              >
                <FaWhatsapp />
                Iniciar Conversa
              </button>
              
              <button 
                onClick={() => navigate('/contato')}
                className="btn-elegant-contact"
              >
                Enviar Mensagem
              </button>
            </div>
            
            <div className="cta-footer">
              <p>
                <FiClock /> Resposta em até 15 minutos durante horário comercial
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomeElegantLuxury;
// Script para inicializar a seção de serviços no Firestore
// Execute com: node inicializar-servicos.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwxcShz_SMx7PG8gzTOvjjkG7SbJ7PBcw",
  authDomain: "maiatur.firebaseapp.com",
  projectId: "maiatur",
  storageBucket: "maiatur.firebasestorage.app",
  messagingSenderId: "1037976703161",
  appId: "1:1037976703161:web:124bbc5c66546180d04b68",
  measurementId: "G-PTWQ45MF15"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const servicesData = {
  active: true,
  badge: 'Experiências Personalizadas',
  title: 'Nossos Serviços',
  subtitle: 'Cada detalhe pensado para tornar sua viagem perfeita',
  services: [
    {
      id: 1731340800000,
      title: 'Transfers & Receptivo',
      description: 'Transporte seguro do aeroporto ao hotel com conforto e pontualidade',
      image: '/aviaoservico.png',
      color: '#21A657',
      link: '/pacotes',
      linkText: 'Saiba mais'
    },
    {
      id: 1731340800001,
      title: 'Passeios Privativos',
      description: 'Experiências exclusivas com roteiros personalizados para você',
      image: '/jericoaquaraservico.png',
      color: '#EE7C35',
      link: '/pacotes',
      linkText: 'Saiba mais'
    },
    {
      id: 1731340800002,
      title: 'City Tours',
      description: 'Conheça as principais atrações e cultura local com nossos guias',
      image: '/fortalezacityservico.png',
      color: '#F8C144',
      link: '/pacotes',
      linkText: 'Saiba mais'
    }
  ]
};

async function initializeServices() {
  try {
    console.log('🚀 Inicializando seção de serviços...');
    console.log('📍 Projeto:', firebaseConfig.projectId);
    
    const docRef = doc(db, 'content', 'servicesSection');
    await setDoc(docRef, servicesData);
    
    console.log('\n✅ Seção de serviços inicializada com sucesso!');
    console.log(`📊 ${servicesData.services.length} serviços cadastrados:\n`);
    servicesData.services.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title}`);
      console.log(`      Cor: ${service.color}`);
      console.log(`      Imagem: ${service.image}`);
      console.log(`      Link: ${service.link}\n`);
    });
    
    console.log('🎯 Acesse /admin/services para gerenciar!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inicializar:', error);
    console.error('💡 Verifique se as variáveis de ambiente estão configuradas no arquivo .env');
    process.exit(1);
  }
}

initializeServices();

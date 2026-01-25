const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Configuração do Firebase (usando as mesmas credenciais do projeto)
const firebaseConfig = {
  apiKey: "AIzaSyCLSRUVuJiRR7fJyei4AdaeF8IKCdR_sUY",
  authDomain: "dineiturauth.firebaseapp.com",
  projectId: "dineiturauth",
  storageBucket: "dineiturauth.firebasestorage.app",
  messagingSenderId: "134112466991",
  appId: "1:134112466991:web:c8bd3805b44b4e03a7ceda"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkPacotes() {
  try {
    const pacotesRef = collection(db, 'pacotes');
    const snapshot = await getDocs(pacotesRef);

    console.log('📦 Total de pacotes:', snapshot.size);

    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`📋 ${doc.id}: ${data.titulo} | Destaque: ${data.destaque} | Categoria: ${data.categoria}`);
    });
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    process.exit();
  }
}

checkPacotes();
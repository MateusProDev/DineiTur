const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

// Configuração do Firebase
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

async function marcarPacotesComoDestaque() {
  try {
    const pacotesRef = collection(db, 'pacotes');
    const snapshot = await getDocs(pacotesRef);

    console.log('📦 Marcando pacotes como destaque...');

    const updates = [];
    snapshot.forEach(docSnapshot => {
      const data = docSnapshot.data();
      if (data.destaque !== true) {
        updates.push({
          id: docSnapshot.id,
          titulo: data.titulo
        });
      }
    });

    // Marcar todos como destaque
    for (const pacote of updates) {
      await updateDoc(doc(db, 'pacotes', pacote.id), {
        destaque: true
      });
      console.log(`✅ ${pacote.titulo} marcado como destaque`);
    }

    console.log(`\n🎯 ${updates.length} pacotes marcados como destaque!`);
    console.log('🔄 Reinicie o servidor para ver as mudanças na home.');

  } catch (error) {
    console.error('❌ Erro ao marcar pacotes:', error);
  } finally {
    process.exit();
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  marcarPacotesComoDestaque();
}

module.exports = { marcarPacotesComoDestaque };
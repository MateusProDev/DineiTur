const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCLSRUVuJiRR7fJyei4AdaeF8IKCdR_sUY",
  authDomain: "dineiturauth.firebaseapp.com",
  projectId: "dineiturauth",
  storageBucket: "dineiturauth.firebasestorage.app",
  messagingSenderId: "134112466991",
  appId: "1:134112466991:web:c8bd3805b44b4e03a7ceda",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function listarPacotes() {
  const snapshot = await getDocs(collection(db, 'pacotes'));
  console.log(`\n=== Total de pacotes no Firebase: ${snapshot.size} ===\n`);
  
  const pacotes = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    pacotes.push({ id: doc.id, ...data });
  });
  
  // Mostrar estrutura completa dos 2 primeiros pacotes
  pacotes.slice(0, 2).forEach(p => {
    console.log('\n=== PACOTE COMPLETO ===');
    console.log(JSON.stringify(p, null, 2));
  });

  // Ordenar por categoria e titulo
  pacotes.sort((a, b) => {
    if (a.categoria !== b.categoria) return a.categoria.localeCompare(b.categoria);
    return a.titulo.localeCompare(b.titulo);
  });

  pacotes.forEach(p => {
    console.log(`[${p.categoria}] ${p.titulo} (slug: ${p.slug})`);
  });

  // Separar por tipo
  const transfers = pacotes.filter(p => p.categoria && p.categoria.startsWith('transfer'));
  const passeios = pacotes.filter(p => p.categoria === 'passeio');
  const outros = pacotes.filter(p => !p.categoria.startsWith('transfer') && p.categoria !== 'passeio');

  console.log(`\n--- Transfers: ${transfers.length} ---`);
  transfers.forEach(p => console.log(`  - ${p.titulo}`));
  
  console.log(`\n--- Passeios: ${passeios.length} ---`);
  passeios.forEach(p => console.log(`  - ${p.titulo}`));

  if (outros.length > 0) {
    console.log(`\n--- Outros: ${outros.length} ---`);
    outros.forEach(p => console.log(`  - ${p.titulo} [${p.categoria}]`));
  }

  process.exit(0);
}

listarPacotes().catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});

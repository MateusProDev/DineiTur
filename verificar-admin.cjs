const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, getDoc, setDoc, serverTimestamp } = require('firebase/firestore');

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

async function verificarECriarAdmin() {
  const email = 'dineitur@gmail.com';
  
  console.log('=== Verificando authorizedUsers ===\n');
  
  // Listar todos os docs
  const snapshot = await getDocs(collection(db, 'authorizedUsers'));
  console.log(`Total de docs em authorizedUsers: ${snapshot.size}`);
  snapshot.forEach(doc => {
    console.log(`  Doc ID: "${doc.id}" => ${JSON.stringify(doc.data())}`);
  });
  
  // Verificar se doc com ID = email existe
  const docRef = doc(db, 'authorizedUsers', email);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log(`\n✅ Doc "${email}" existe:`, docSnap.data());
  } else {
    console.log(`\n❌ Doc "${email}" NÃO existe! Criando...`);
    await setDoc(docRef, {
      authorized: true,
      email: email,
      name: 'Administrador DineiTur',
      role: 'admin',
      addedAt: serverTimestamp()
    });
    console.log(`✅ Doc "${email}" criado com sucesso!`);
  }
  
  process.exit(0);
}

verificarECriarAdmin().catch(err => {
  console.error('Erro:', err);
  process.exit(1);
});

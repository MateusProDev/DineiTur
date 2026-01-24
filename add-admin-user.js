// Script para adicionar um usuário admin autorizado no Firestore
// Execute: node add-admin-user.js



require('dotenv').config({ path: '.env.local' });
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

const db = admin.firestore();

async function addAdminUser() {
  const email = 'dineitur@gmail.com';
  const userRef = db.collection('authorizedUsers').doc(email);
  await userRef.set({
    authorized: true,
    email: email,
    name: 'Administrador DineiTur',
    role: 'admin',
    addedAt: admin.firestore.FieldValue.serverTimestamp()
  });
  console.log('✅ Usuário admin adicionado:', email);
}

addAdminUser().catch(console.error);
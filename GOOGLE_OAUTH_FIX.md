# 🔧 CONFIGURAÇÃO GOOGLE OAUTH - GUIA RÁPIDO

## ❌ ERRO ATUAL
O dashboard está mostrando erro "Missing required parameter client_id" porque faltam as credenciais do Google OAuth.

## ✅ SOLUÇÃO: Configurar Google OAuth Client ID

### Passo 1: Acesse Google Cloud Console
1. Vá para: https://console.cloud.google.com/
2. Selecione seu projeto Firebase (dineiturauth)

### Passo 2: Criar OAuth Client ID
1. No menu lateral: **APIs e Serviços** → **Credenciais**
2. Clique: **+ CRIAR CREDENCIAIS** → **ID do cliente OAuth**
3. Tipo: **Aplicativo da Web**
4. Nome: "DineiTur Dashboard SEO"
5. URIs autorizadas:
   - `http://localhost:3000` (desenvolvimento)
   - `https://dineitur.vercel.app` (produção)

### Passo 3: Obter Credenciais
Após criar, copie:
- **Client ID**: (algo como `123456789-abc123.apps.googleusercontent.com`)
- **Client Secret**: (string longa)

### Passo 4: Configurar no Projeto
Edite o arquivo `.env.local` e substitua:

```
REACT_APP_GOOGLE_CLIENT_ID=SEU_CLIENT_ID_REAL_AQUI
REACT_APP_GOOGLE_CLIENT_SECRET=SEU_CLIENT_SECRET_REAL_AQUI
```

### Passo 5: Configurar no Vercel (Produção)
Adicione as mesmas variáveis no Vercel Dashboard:
- https://vercel.com/dashboard → Projeto → Settings → Environment Variables

### Passo 6: Reiniciar e Testar
```bash
npm start
```

Acesse `/admin` e teste o botão "Conectar Google".

## 🔍 Verificação
Abra o console do navegador (F12) e procure por:
- ✅ "Google Identity Services disponível, inicializando..."
- ❌ Se ainda der erro, verifique se as variáveis estão corretas

## 📋 Status Atual
- ❌ OAuth Client ID não configurado
- ❌ Dashboard SEO não funcional
- ✅ Firebase configurado
- ✅ Outros serviços funcionando
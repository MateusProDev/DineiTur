const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, serverTimestamp } = require('firebase/firestore');

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

function gerarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}

// ============================================================
// TRANSFERS (20)
// ============================================================
const transfers = [
  {
    titulo: "Transfer Aeroporto",
    descricaoCurta: "Transfer privativo do Aeroporto de Fortaleza até seu hotel ou do hotel até o aeroporto. Conforto, pontualidade e segurança para começar ou encerrar sua viagem com tranquilidade.",
    descricao: `Sobre este Pacote
🛫 Transfer Privativo Aeroporto – TransferFortalezaTur

Chegou em Fortaleza ou está indo embora? Conte com nosso transfer privativo para o Aeroporto Internacional Pinto Martins. Garantimos pontualidade, conforto e segurança para você e sua família.

🕒 Funcionamento:
Disponível 24 horas, 7 dias por semana
Monitoramos seu voo em tempo real
Aguardamos na área de desembarque com placa de identificação

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Monitoramento do voo

⚠️ Observação Importante:
Transfer exclusivo e privativo para você e seus acompanhantes.
Não realizamos transfer compartilhado.

Sobre o Transfer Aeroporto
O Aeroporto Internacional Pinto Martins fica a aproximadamente 10 km do centro de Fortaleza. Nosso serviço cobre toda a orla de Fortaleza e região metropolitana.

💡 Dica:
Reserve com antecedência para garantir disponibilidade, especialmente em alta temporada e feriados.`
  },
  {
    titulo: "Transfer Aquiraz",
    descricaoCurta: "Transfer privativo entre Fortaleza e Aquiraz. Praias paradisíacas como Porto das Dunas, Prainha e Beach Park a poucos minutos da capital cearense.",
    descricao: `Sobre este Pacote
🏖️ Transfer Privativo Aquiraz – TransferFortalezaTur

Aquiraz é um dos municípios mais turísticos do Ceará, abrigando praias famosas como Porto das Dunas, Prainha, Iguape e o Beach Park. Nosso transfer privativo leva você com conforto e segurança.

🕒 Distância e Tempo:
Aproximadamente 30 km de Fortaleza
Tempo estimado: 40 minutos

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Aquiraz
Aquiraz foi a primeira capital do Ceará e hoje é um dos destinos turísticos mais completos do estado. Com infraestrutura de resorts, parques aquáticos e praias deslumbrantes.

💡 Dica:
Ideal para quem está hospedado em resorts de Aquiraz e precisa de transporte confiável.`
  },
  {
    titulo: "Transfer Beberibe",
    descricaoCurta: "Transfer privativo entre Fortaleza e Beberibe. Conheça Morro Branco, Praia das Fontes e outras praias incríveis do litoral leste cearense.",
    descricao: `Sobre este Pacote
🌊 Transfer Privativo Beberibe – TransferFortalezaTur

Beberibe é a porta de entrada para algumas das praias mais bonitas do litoral leste do Ceará, incluindo Morro Branco, Praia das Fontes e Uruaú. Viaje com conforto em nosso transfer privativo.

🕒 Distância e Tempo:
Aproximadamente 85 km de Fortaleza
Tempo estimado: 1h30

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Beberibe
Município localizado no litoral leste, Beberibe é famosa pelas falésias coloridas de Morro Branco, as fontes naturais da Praia das Fontes e a tranquilidade de suas praias.

💡 Dica:
Combine seu transfer com uma parada estratégica para conhecer as falésias e o artesanato local.`
  },
  {
    titulo: "Transfer Canoa Quebrada",
    descricaoCurta: "Transfer privativo entre Fortaleza e Canoa Quebrada. Viaje com conforto até uma das praias mais famosas do Brasil, com suas falésias avermelhadas e Broadway.",
    descricao: `Sobre este Pacote
🌅 Transfer Privativo Canoa Quebrada – TransferFortalezaTur

Canoa Quebrada é um dos destinos mais icônicos do Ceará e do Brasil. Com falésias avermelhadas, dunas, vida noturna vibrante e a famosa Broadway. Nosso transfer privativo garante sua chegada com conforto e segurança.

🕒 Distância e Tempo:
Aproximadamente 164 km de Fortaleza
Tempo estimado: 2h30

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Canoa Quebrada
Localizada no município de Aracati, Canoa Quebrada é conhecida mundialmente por suas falésias vermelhas, lua e estrela esculpidas na pedra, passeios de buggy e a animada rua Broadway.

💡 Dica:
Reserve com antecedência, especialmente no período de alta temporada (julho e dezembro/janeiro).`
  },
  {
    titulo: "Transfer Cascavel",
    descricaoCurta: "Transfer privativo entre Fortaleza e Cascavel. Acesse praias como Águas Belas e Caponga com conforto e praticidade.",
    descricao: `Sobre este Pacote
🏝️ Transfer Privativo Cascavel – TransferFortalezaTur

Cascavel abriga praias encantadoras como Águas Belas e Caponga. Com nosso transfer privativo, você chega ao destino com conforto, segurança e pontualidade.

🕒 Distância e Tempo:
Aproximadamente 62 km de Fortaleza
Tempo estimado: 1h10

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Cascavel
Cascavel é um município do litoral leste do Ceará, com praias de águas calmas e cenários paradisíacos. A Praia de Águas Belas é um dos pontos mais procurados.

💡 Dica:
Aproveite para combinar a visita com uma parada em Águas Belas, uma verdadeira piscina natural.`
  },
  {
    titulo: "Transfer Cumbuco",
    descricaoCurta: "Transfer privativo entre Fortaleza e Cumbuco. A capital do kitesurf no Brasil fica a apenas 30 km de Fortaleza. Viaje com conforto e segurança.",
    descricao: `Sobre este Pacote
🪁 Transfer Privativo Cumbuco – TransferFortalezaTur

Cumbuco é um dos destinos mais procurados próximos a Fortaleza, famoso pelo kitesurf, passeios de buggy nas dunas e lagoas cristalinas. Nosso transfer privativo leva você com conforto e praticidade.

🕒 Distância e Tempo:
Aproximadamente 30 km de Fortaleza
Tempo estimado: 35 minutos

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Cumbuco
Localizada no município de Caucaia, Cumbuco é a capital brasileira do kitesurf e oferece dunas, lagoas (como a Lagoa do Cauípe), passeios de buggy e uma infraestrutura turística completa.

💡 Dica:
A Lagoa do Cauípe e a Lagoa do Banana são paradas obrigatórias para quem visita Cumbuco.`
  },
  {
    titulo: "Transfer Fortaleza",
    descricaoCurta: "Transfer privativo dentro de Fortaleza. Deslocamento entre hotéis, restaurantes, pontos turísticos e eventos com total conforto e segurança.",
    descricao: `Sobre este Pacote
🏙️ Transfer Privativo Fortaleza – TransferFortalezaTur

Precisa se deslocar dentro de Fortaleza? Nosso transfer privativo cobre toda a cidade: hotéis, restaurantes, shoppings, pontos turísticos e eventos. Viaje com conforto e segurança sem preocupações.

🕒 Funcionamento:
Disponível todos os dias
Atendemos toda a orla e região metropolitana de Fortaleza

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Fortaleza
Fortaleza é a capital do Ceará e oferece praias urbanas incríveis como Praia do Futuro, Meireles e Iracema, além de mercados, centros culturais, gastronomia e vida noturna vibrante.

💡 Dica:
Ideal para deslocamentos entre hotéis, check-in/check-out, jantares e passeios pela cidade.`
  },
  {
    titulo: "Transfer Icaraí de Amontada",
    descricaoCurta: "Transfer privativo entre Fortaleza e Icaraí de Amontada. Praia paradisíaca e tranquila no litoral oeste, perfeita para kitesurf e descanso.",
    descricao: `Sobre este Pacote
🌴 Transfer Privativo Icaraí de Amontada – TransferFortalezaTur

Icaraí de Amontada é um destino rústico e charmoso no litoral oeste do Ceará, ideal para quem busca tranquilidade, natureza preservada e condições perfeitas para kitesurf.

🕒 Distância e Tempo:
Aproximadamente 200 km de Fortaleza
Tempo estimado: 3h30

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Icaraí de Amontada
Vila de pescadores transformada em refúgio turístico, Icaraí de Amontada oferece praias desertas, ventos constantes (ideal para kitesurf), pousadas charmosas e pôr do sol inesquecível.

💡 Dica:
Leve protetor solar e roupas leves – o vento constante é uma marca registrada de Icaraí.`
  },
  {
    titulo: "Transfer Icapuí",
    descricaoCurta: "Transfer privativo entre Fortaleza e Icapuí. Conheça as falésias, manguezais e praias preservadas no extremo leste do Ceará.",
    descricao: `Sobre este Pacote
🦀 Transfer Privativo Icapuí – TransferFortalezaTur

Icapuí é o último município do litoral leste do Ceará, na divisa com o Rio Grande do Norte. Com praias preservadas, falésias, manguezais e lagostas famosas. Nosso transfer privativo garante sua viagem com conforto.

🕒 Distância e Tempo:
Aproximadamente 200 km de Fortaleza
Tempo estimado: 3h

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Icapuí
Icapuí é conhecida como a terra da lagosta, com praias praticamente desertas, falésias impressionantes como Ponta Grossa, manguezais preservados e uma gastronomia incrível à base de frutos do mar.

💡 Dica:
Não deixe de experimentar a lagosta fresca e visitar as falésias de Ponta Grossa – uma das mais bonitas do Brasil.`
  },
  {
    titulo: "Transfer Jericoacoara",
    descricaoCurta: "Transfer privativo entre Fortaleza e Jericoacoara. Viaje com conforto até um dos destinos mais desejados do mundo, com dunas, lagoas e pôr do sol inesquecível.",
    descricao: `Sobre este Pacote
🌅 Transfer Privativo Jericoacoara – TransferFortalezaTur

Jericoacoara é um dos destinos mais desejados do Brasil e do mundo! Com dunas espetaculares, lagoas cristalinas e o famoso pôr do sol na Duna do Pôr do Sol. Nosso transfer privativo garante conforto e segurança na viagem.

🕒 Distância e Tempo:
Aproximadamente 300 km de Fortaleza
Tempo estimado: 4h30 (inclui trecho off-road)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados (4x4 para trecho final)
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.
O trecho final até Jeri é feito em veículo 4x4 adequado para o percurso.

Sobre Jericoacoara
Patrimônio natural protegido, Jericoacoara encanta com a Duna do Pôr do Sol, Pedra Furada, Lagoa do Paraíso, Lagoa Azul e ruas de areia que dão charme especial à vila. Um destino imperdível.

💡 Dica:
Reserve com bastante antecedência, especialmente em alta temporada. O pôr do sol na Duna é experiência obrigatória!`
  },
  {
    titulo: "Transfer Lagoinha",
    descricaoCurta: "Transfer privativo entre Fortaleza e Lagoinha. Praia com falésias, piscinas naturais e paisagens deslumbrantes no litoral oeste cearense.",
    descricao: `Sobre este Pacote
🏖️ Transfer Privativo Lagoinha – TransferFortalezaTur

Lagoinha é uma das praias mais bonitas do litoral oeste do Ceará, com falésias, piscinas naturais e águas cristalinas. Nosso transfer privativo leva você com conforto e segurança.

🕒 Distância e Tempo:
Aproximadamente 120 km de Fortaleza
Tempo estimado: 2h

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Lagoinha
Localizada no município de Paraipaba, Lagoinha é famosa por suas falésias multicoloridas, piscinas naturais formadas na maré baixa e cenário paradisíaco. Uma das praias mais fotogênicas do Ceará.

💡 Dica:
Verifique a tábua de marés antes de ir – na maré baixa as piscinas naturais ficam perfeitas para banho.`
  },
  {
    titulo: "Transfer Morro Branco",
    descricaoCurta: "Transfer privativo entre Fortaleza e Morro Branco. Falésias coloridas, labirintos naturais e artesanato de areia única no litoral leste do Ceará.",
    descricao: `Sobre este Pacote
🌈 Transfer Privativo Morro Branco – TransferFortalezaTur

Morro Branco é famosa mundialmente pelas falésias coloridas e o labirinto natural esculpido pelo vento e chuva. Nosso transfer privativo garante sua chegada com conforto e segurança.

🕒 Distância e Tempo:
Aproximadamente 85 km de Fortaleza
Tempo estimado: 1h30

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Morro Branco
Localizada em Beberibe, Morro Branco é conhecida por suas falésias multicoloridas que formam um labirinto natural impressionante. O artesanato com areia colorida em garrafas é tradição local.

💡 Dica:
Combine com uma visita à Praia das Fontes, que fica a poucos minutos de Morro Branco.`
  },
  {
    titulo: "Transfer Paracuru",
    descricaoCurta: "Transfer privativo entre Fortaleza e Paracuru. Praias com ondas perfeitas para surf e kitesurf, além de cenários naturais encantadores.",
    descricao: `Sobre este Pacote
🏄 Transfer Privativo Paracuru – TransferFortalezaTur

Paracuru é um destino incrível para quem ama esportes aquáticos e praias tranquilas. Com ondas perfeitas para surf e ventos ideais para kitesurf. Nosso transfer privativo leva você com conforto.

🕒 Distância e Tempo:
Aproximadamente 85 km de Fortaleza
Tempo estimado: 1h30

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Paracuru
Paracuru é conhecida como a terra do surf no Ceará, com praias de ondas consistentes e ventos fortes. A Praia da Pedra Rachada é um dos pontos mais famosos, com formações rochosas e piscinas naturais.

💡 Dica:
Se você curte surf, as melhores ondas são entre junho e dezembro. Para kite, o vento é constante quase o ano todo.`
  },
  {
    titulo: "Transfer Parajuru",
    descricaoCurta: "Transfer privativo entre Fortaleza e Parajuru. Praia tranquila e charmosa com dunas, mangue e paisagens preservadas no litoral leste.",
    descricao: `Sobre este Pacote
🌊 Transfer Privativo Parajuru – TransferFortalezaTur

Parajuru é uma praia encantadora e ainda pouco explorada no litoral leste do Ceará. Com dunas, mangue, tranquilidade e cenários naturais preservados. Nosso transfer privativo garante sua viagem com conforto.

🕒 Distância e Tempo:
Aproximadamente 120 km de Fortaleza
Tempo estimado: 2h

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Parajuru
Localizada no município de Beberibe, Parajuru é uma vila de pescadores com dunas, manguezais e praias tranquilas. Ideal para quem busca sossego e contato com a natureza.

💡 Dica:
Experimente o passeio de jangada pelo Rio Pirangi – uma experiência única e relaxante.`
  },
  {
    titulo: "Transfer Pecém",
    descricaoCurta: "Transfer privativo entre Fortaleza e Pecém. Praia com águas calmas e cristalinas, perfeita para famílias, no litoral oeste do Ceará.",
    descricao: `Sobre este Pacote
⚓ Transfer Privativo Pecém – TransferFortalezaTur

Pecém combina porto industrial com praias tranquilas e águas cristalinas. Nosso transfer privativo garante conforto e praticidade para você curtir este destino do litoral oeste.

🕒 Distância e Tempo:
Aproximadamente 60 km de Fortaleza
Tempo estimado: 1h

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Pecém
Localizada no município de São Gonçalo do Amarante, Pecém possui praias com águas calmas e mornas, ideais para famílias com crianças. A infraestrutura local oferece barracas e restaurantes à beira-mar.

💡 Dica:
Ideal para um dia tranquilo de praia com a família. As águas calmas são perfeitas para crianças.`
  },
  {
    titulo: "Transfer Sobral",
    descricaoCurta: "Transfer privativo entre Fortaleza e Sobral. Conheça a cidade histórica do interior do Ceará com conforto e segurança no traslado.",
    descricao: `Sobre este Pacote
🏛️ Transfer Privativo Sobral – TransferFortalezaTur

Sobral é uma das cidades mais importantes do interior do Ceará, com rica história, arquitetura colonial e cultura vibrante. Nosso transfer privativo leva você com total conforto.

🕒 Distância e Tempo:
Aproximadamente 235 km de Fortaleza
Tempo estimado: 3h30

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Sobral
Sobral é famosa pelo Arco do Triunfo, pela história da comprovação da Teoria da Relatividade de Einstein (eclipse de 1919) e pelo centro histórico preservado. Cidade universitária e cultural.

💡 Dica:
Visite o Museu do Eclipse e o centro histórico – Sobral é uma aula de história a céu aberto.`
  },
  {
    titulo: "Transfer Taíba",
    descricaoCurta: "Transfer privativo entre Fortaleza e Taíba. Praia com falésias, ventos perfeitos para kitesurf e atmosfera descontraída no litoral oeste.",
    descricao: `Sobre este Pacote
🪁 Transfer Privativo Taíba – TransferFortalezaTur

Taíba é uma praia charmosa e descontraída, famosa pelo kitesurf, falésias e vibe relaxante. Nosso transfer privativo garante conforto e pontualidade na sua viagem.

🕒 Distância e Tempo:
Aproximadamente 65 km de Fortaleza
Tempo estimado: 1h10

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Taíba
Localizada no município de São Gonçalo do Amarante, Taíba é um point de kitesurfistas e amantes de praias tranquilas. As falésias, o pôr do sol e os restaurantes à beira-mar são atrativos imperdíveis.

💡 Dica:
O pôr do sol visto das falésias de Taíba é um dos mais bonitos do litoral oeste cearense.`
  },
  {
    titulo: "Transfer Trairi",
    descricaoCurta: "Transfer privativo entre Fortaleza e Trairi. Praias como Flecheiras e Mundaú com águas cristalinas e coqueirais no litoral oeste.",
    descricao: `Sobre este Pacote
🌴 Transfer Privativo Trairi – TransferFortalezaTur

Trairi é um município que abriga praias incríveis como Flecheiras e Mundaú, com águas cristalinas, coqueirais e muita tranquilidade. Nosso transfer privativo leva você com conforto.

🕒 Distância e Tempo:
Aproximadamente 120 km de Fortaleza
Tempo estimado: 2h

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Trairi
Trairi reúne praias paradisíacas como Flecheiras (famosa pelas piscinas naturais) e Mundaú (charmosa vila de pescadores). Ideal para quem busca praias tranquilas e preservadas.

💡 Dica:
Flecheiras possui piscinas naturais incríveis na maré baixa – verifique a tábua de marés antes de ir.`
  },
  {
    titulo: "Transfer Porto das Dunas",
    descricaoCurta: "Transfer privativo entre Fortaleza e Porto das Dunas. Acesse o Beach Park e os resorts de Aquiraz com conforto, rapidez e segurança.",
    descricao: `Sobre este Pacote
🎢 Transfer Privativo Porto das Dunas – TransferFortalezaTur

Porto das Dunas é um dos endereços mais nobres do litoral cearense, abrigando o famoso Beach Park e resorts de alto padrão. Nosso transfer privativo leva você com praticidade.

🕒 Distância e Tempo:
Aproximadamente 25 km de Fortaleza
Tempo estimado: 30 minutos

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Porto das Dunas
Porto das Dunas é um bairro nobre de Aquiraz, com praia de águas mornas, infraestrutura completa de resorts e o Beach Park, maior parque aquático da América Latina.

💡 Dica:
Se vai ao Beach Park, reserve o transfer com horário de abertura do parque para aproveitar o dia inteiro.`
  },
  {
    titulo: "Transfer Canindé",
    descricaoCurta: "Transfer privativo entre Fortaleza e Canindé. Visite a terra de São Francisco das Chagas, importante centro de peregrinação religiosa do Ceará.",
    descricao: `Sobre este Pacote
⛪ Transfer Privativo Canindé – TransferFortalezaTur

Canindé é o segundo maior centro de peregrinação religiosa do Brasil, atrás apenas de Aparecida-SP. A cidade recebe milhões de romeiros por ano em devoção a São Francisco das Chagas. Nosso transfer privativo garante sua viagem com conforto.

🕒 Distância e Tempo:
Aproximadamente 120 km de Fortaleza
Tempo estimado: 1h45

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de horário

⚠️ Observação Importante:
Não realizamos transfer compartilhado.
Apenas Transfer Privativo exclusivo para você e seus acompanhantes.

Sobre Canindé
Canindé é conhecida mundialmente como a terra de São Francisco das Chagas. A Basílica, o Museu de Ex-votos e as festividades religiosas (especialmente em outubro) atraem fiéis de todo o Brasil.

💡 Dica:
A festa de São Francisco acontece em outubro – reserve com muita antecedência nesse período.`
  }
];

// ============================================================
// PASSEIOS (16 que faltam - Canoa Quebrada e Morro Branco já existem)
// ============================================================
const passeios = [
  {
    titulo: "Passeio Águas Belas",
    descricaoCurta: "Descubra a paradisíaca Praia de Águas Belas em Cascavel! Piscinas naturais de águas cristalinas e mornas, cenário perfeito para um dia inesquecível no litoral leste cearense.",
    descricao: `Sobre este Pacote
🌊 Passeio Privativo Águas Belas – TransferFortalezaTur

Águas Belas é uma das praias mais encantadoras do litoral leste do Ceará. Com piscinas naturais formadas na maré baixa, águas cristalinas e mornas, é o destino perfeito para um dia de relaxamento.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Águas Belas
Localizada em Cascavel (62 km de Fortaleza), Águas Belas surpreende com suas piscinas naturais de águas cristalinas formadas entre os recifes na maré baixa. O cenário é paradisíaco e ideal para fotos.

🌟 O que você vai conhecer:
Piscinas naturais de Águas Belas
Recifes de corais com vida marinha
Praia de areia branca e águas calmas
Barracas com gastronomia local

💡 Dica:
Verifique a tábua de marés! Na maré baixa as piscinas naturais ficam perfeitas para banho e snorkel.`
  },
  {
    titulo: "Passeio Barra Nova",
    descricaoCurta: "Conheça Barra Nova, uma praia rústica e preservada em Cascavel. Encontro do rio com o mar, dunas e tranquilidade absoluta no litoral leste do Ceará.",
    descricao: `Sobre este Pacote
🏝️ Passeio Privativo Barra Nova – TransferFortalezaTur

Barra Nova é uma praia rústica, preservada e encantadora em Cascavel. O encontro do Rio Choró com o mar cria cenários incríveis com dunas, mangue e praias quase desertas.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Barra Nova
Barra Nova fica em Cascavel, a cerca de 65 km de Fortaleza. É onde o Rio Choró encontra o mar, formando um cenário único com dunas, manguezais e praias praticamente desertas.

🌟 O que você vai conhecer:
Encontro do Rio Choró com o mar
Dunas e manguezais preservados
Praia semi-deserta de areias brancas
Passeio de jangada (opcional, não incluso)

💡 Dica:
Leve repelente e protetor solar – a natureza preservada é o grande atrativo de Barra Nova.`
  },
  {
    titulo: "Passeio Beach Park",
    descricaoCurta: "Viva a emoção do Beach Park, o maior parque aquático da América Latina! Transfer privativo ida e volta de Fortaleza com conforto e praticidade.",
    descricao: `Sobre este Pacote
🎢 Passeio Privativo Beach Park – TransferFortalezaTur

O Beach Park é o maior parque aquático da América Latina e um dos destinos mais procurados do Ceará! Com nosso transfer privativo, você chega e volta com conforto, sem preocupações.

🕒 Duração do Passeio:
O dia inteiro
Saída: horário a combinar (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: horário a combinar (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.
Ingresso do Beach Park NÃO incluso.

Sobre o Passeio Beach Park
Localizado em Porto das Dunas, Aquiraz (25 km de Fortaleza), o Beach Park oferece toboáguas radicais, piscinas de ondas, rio lento, área infantil e muito mais.

🌟 Atrações do Beach Park:
Insano (um dos toboáguas mais altos do mundo)
Vaikuntudo, Arrepius, Kalafrio
Arca de Noé (área infantil)
Praia particular
Restaurantes e lounges

💡 Dica:
Compre os ingressos antecipadamente pelo site oficial do Beach Park para garantir disponibilidade e melhores preços.`
  },
  {
    titulo: "Passeio City-Tour 4h",
    descricaoCurta: "Conheça os principais pontos turísticos de Fortaleza em um city-tour privativo de 4 horas. Praias, cultura, história e gastronomia em um roteiro completo.",
    descricao: `Sobre este Pacote
🏙️ Passeio Privativo City-Tour 4h – TransferFortalezaTur

Descubra Fortaleza em um city-tour privativo de 4 horas! Conheça os principais pontos turísticos, praias icônicas, mercados e atrações culturais da capital cearense com conforto e flexibilidade.

🕒 Duração do Passeio:
4 horas
Saída: horário a combinar (buscamos no hotel/pousada/condomínio)
Roteiro flexível conforme seus interesses

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Roteiro personalizado

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o City-Tour Fortaleza
Fortaleza é uma cidade vibrante com praias urbanas, mercados tradicionais, centros culturais e gastronomia incrível. O city-tour passa pelos pontos mais emblemáticos.

🌟 Principais paradas do roteiro:
Beira Mar de Fortaleza
Praia de Iracema e Ponte dos Ingleses
Mercado Central de Fortaleza
Centro Dragão do Mar de Arte e Cultura
Catedral Metropolitana
Praia do Futuro
Feirinha de Artesanato da Beira Mar

💡 Dica:
O roteiro é flexível! Informe ao motorista seus interesses e ele personaliza as paradas para você.`
  },
  {
    titulo: "Passeio Cumbuco",
    descricaoCurta: "Explore Cumbuco: dunas, lagoas cristalinas, kitesurf e buggy! Um dos destinos mais emocionantes e completos próximos a Fortaleza.",
    descricao: `Sobre este Pacote
🪁 Passeio Privativo Cumbuco – TransferFortalezaTur

Cumbuco é sinônimo de adrenalina e diversão! Dunas, lagoas cristalinas, passeios de buggy e o melhor kitesurf do Brasil. Tudo isso a apenas 30 km de Fortaleza, com nosso transfer privativo.

🕒 Duração do Passeio:
O dia inteiro
Saída: 08h00 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Cumbuco
Cumbuco fica no município de Caucaia, a 30 km de Fortaleza. É a capital do kitesurf no Brasil e oferece dunas emocionantes, lagoas (Cauípe e Banana) e passeios de buggy.

🌟 Atrações e Experiências:
Lagoa do Cauípe (tirolesa e esquibunda)
Lagoa do Banana
Passeio de Buggy nas dunas
Kitesurf e Windsurf
Barracas à beira-mar

Atividades opcionais (não inclusas):
Passeio de Buggy
Kitesurf / aulas
Tirolesa na Lagoa do Cauípe

💡 Dica:
O passeio de buggy pelas dunas com parada nas lagoas é imperdível! Contrate diretamente no local.`
  },
  {
    titulo: "Passeio Flecheiras",
    descricaoCurta: "Descubra Flecheiras, uma praia paradisíaca com piscinas naturais cristalinas, coqueirais e tranquilidade no litoral oeste cearense.",
    descricao: `Sobre este Pacote
🐠 Passeio Privativo Flecheiras – TransferFortalezaTur

Flecheiras é uma das praias mais bonitas e preservadas do litoral oeste do Ceará. Famosa por suas piscinas naturais de águas cristalinas, coqueirais e atmosfera tranquila de vila de pescadores.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Flecheiras
Localizada no município de Trairi (120 km de Fortaleza), Flecheiras surpreende com piscinas naturais incríveis formadas entre os recifes na maré baixa. A vila de pescadores mantém o charme rústico.

🌟 O que você vai conhecer:
Piscinas naturais de águas cristalinas
Vila de pescadores tradicional
Coqueirais e praias de areia branca
Gastronomia à base de frutos do mar

💡 Dica:
Consulte a tábua de marés! As piscinas naturais de Flecheiras são melhores na maré baixa.`
  },
  {
    titulo: "Passeio Icaraízinho/Moitas",
    descricaoCurta: "Conheça Icaraízinho de Amontada e Moitas, praias selvagens e preservadas com dunas, falésias e a autenticidade do litoral oeste cearense.",
    descricao: `Sobre este Pacote
🌅 Passeio Privativo Icaraízinho/Moitas – TransferFortalezaTur

Icaraízinho de Amontada e Moitas são praias selvagens e ainda pouco exploradas do litoral oeste do Ceará. Dunas, falésias, ventos constantes e uma atmosfera de liberdade total.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h00 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 17h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Icaraízinho/Moitas
Localizadas no município de Amontada (200 km de Fortaleza), estas praias preservam a autenticidade do litoral cearense com dunas, falésias, coqueirais e vento constante – paraíso do kitesurf.

🌟 O que você vai conhecer:
Praia de Icaraízinho de Amontada
Praia de Moitas
Dunas e falésias preservadas
Vila de pescadores autêntica
Cenários perfeitos para kitesurf

💡 Dica:
Leve protetor solar reforçado e roupas leves – o vento forte e o sol intenso são marcas registradas da região.`
  },
  {
    titulo: "Passeio Icapuí",
    descricaoCurta: "Explore Icapuí, a terra da lagosta! Falésias de Ponta Grossa, praias desertas e manguezais preservados no extremo leste do Ceará.",
    descricao: `Sobre este Pacote
🦀 Passeio Privativo Icapuí – TransferFortalezaTur

Icapuí é o último município do litoral cearense, na divisa com o Rio Grande do Norte. Famosa pelas falésias de Ponta Grossa, praias desertas, manguezais e a melhor lagosta do Ceará.

🕒 Duração do Passeio:
O dia inteiro
Saída: 06h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 18h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Icapuí
Localizada a 200 km de Fortaleza, Icapuí surpreende com praias praticamente desertas, as impressionantes falésias de Ponta Grossa, manguezais preservados e gastronomia à base de lagosta e frutos do mar.

🌟 O que você vai conhecer:
Falésias de Ponta Grossa (uma das mais bonitas do Brasil)
Praias desertas e preservadas
Manguezais e ecossistemas marinhos
Gastronomia local (lagosta fresca!)
Tremembé (comunidade quilombola)

💡 Dica:
Não deixe de provar a lagosta fresca de Icapuí – é considerada uma das melhores do Brasil!`
  },
  {
    titulo: "Passeio Ipark Campestre",
    descricaoCurta: "Diversão garantida no iPark Campestre! Parque temático com atrações para toda a família em Aquiraz, a poucos minutos de Fortaleza.",
    descricao: `Sobre este Pacote
🎡 Passeio Privativo iPark Campestre – TransferFortalezaTur

O iPark Campestre é um parque temático incrível em Aquiraz com atrações para toda a família. Diversão, aventura e natureza em um só lugar! Nosso transfer privativo garante sua ida e volta com conforto.

🕒 Duração do Passeio:
O dia inteiro
Saída: horário a combinar (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: horário a combinar (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.
Ingresso do iPark NÃO incluso.

Sobre o iPark Campestre
Localizado em Aquiraz (30 km de Fortaleza), o iPark Campestre é um parque temático com atrações variadas: tirolesa, arvorismo, quadriciclo, piscinas, tobogãs e muito mais.

🌟 Atrações do iPark:
Tirolesa e arvorismo
Quadriciclo e off-road
Piscinas e tobogãs aquáticos
Área kids
Restaurante no parque

💡 Dica:
Compre os ingressos com antecedência pelo site oficial do iPark para garantir os melhores preços.`
  },
  {
    titulo: "Passeio Jericoacoara",
    descricaoCurta: "Viva a magia de Jericoacoara! Dunas, lagoas cristalinas, Pedra Furada e o pôr do sol mais famoso do Brasil. Um destino imperdível no Ceará.",
    descricao: `Sobre este Pacote
🌅 Passeio Privativo Jericoacoara – TransferFortalezaTur

Jericoacoara é um dos destinos mais desejados do mundo! Dunas espetaculares, lagoas de águas cristalinas, Pedra Furada e o pôr do sol mais famoso do Brasil. Viva essa experiência com nosso passeio privativo.

🕒 Duração do Passeio:
2 dias / 1 noite (ou day-use conforme preferência)
Saída: 06h00 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: conforme programação escolhida

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados (4x4 para trecho final)
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.
Hospedagem e passeios internos em Jeri NÃO inclusos.

Sobre o Passeio Jericoacoara
Localizada a 300 km de Fortaleza, Jeri é um paraíso cercado por dunas com ruas de areia, lagoas cristalinas e paisagens de tirar o fôlego.

🌟 O que você vai conhecer:
Duna do Pôr do Sol (espetáculo diário)
Pedra Furada (cartão-postal de Jeri)
Lagoa do Paraíso (águas cristalinas e redes)
Lagoa Azul
Árvore da Preguiça
Ruas de areia da vila

💡 Dica:
Reserve no mínimo 2 dias para aproveitar Jeri. O pôr do sol na Duna é experiência obrigatória!`
  },
  {
    titulo: "Passeio Mundaú",
    descricaoCurta: "Descubra Mundaú, uma charmosa vila de pescadores com praias paradisíacas, coqueirais e piscinas naturais no litoral oeste do Ceará.",
    descricao: `Sobre este Pacote
🐚 Passeio Privativo Mundaú – TransferFortalezaTur

Mundaú é uma encantadora vila de pescadores no litoral oeste do Ceará, com praias de águas cristalinas, coqueirais intermináveis e atmosfera tranquila. Um verdadeiro paraíso preservado.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Mundaú
Localizada no município de Trairi (130 km de Fortaleza), Mundaú é uma vila de pescadores charmosa com praias praticamente desertas, coqueirais e gastronomia de frutos do mar.

🌟 O que você vai conhecer:
Praia de Mundaú com coqueirais
Piscinas naturais na maré baixa
Vila de pescadores tradicional
Gastronomia local (peixe e frutos do mar frescos)

💡 Dica:
Mundaú é perfeita para quem busca paz e contato com a natureza. Ideal para casais e famílias.`
  },
  {
    titulo: "Passeio Paracuru",
    descricaoCurta: "Explore Paracuru: surf, kitesurf, Pedra Rachada e praias incríveis! Um destino completo para amantes de esportes aquáticos no litoral oeste.",
    descricao: `Sobre este Pacote
🏄 Passeio Privativo Paracuru – TransferFortalezaTur

Paracuru é a terra do surf no Ceará! Com ondas perfeitas, ventos constantes e a famosa Pedra Rachada, é o destino ideal para amantes de esportes aquáticos e praias naturais.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Paracuru
Localizada a 85 km de Fortaleza, Paracuru oferece praias com ondas perfeitas para surf, ventos ideais para kitesurf e a impressionante Pedra Rachada com piscinas naturais.

🌟 O que você vai conhecer:
Pedra Rachada (formação rochosa com piscinas naturais)
Praias com ondas para surf
Points de kitesurf
Vila de Paracuru com cultura local

💡 Dica:
A Pedra Rachada fica ainda mais bonita na maré baixa – verifique a tábua de marés antes de ir.`
  },
  {
    titulo: "Passeio 3 Praias Incríveis",
    descricaoCurta: "Conheça 3 praias incríveis do litoral cearense em um único dia! Roteiro exclusivo com as melhores paisagens, piscinas naturais e falésias do Ceará.",
    descricao: `Sobre este Pacote
🌊 Passeio Privativo 3 Praias Incríveis – TransferFortalezaTur

Um roteiro exclusivo que combina 3 das praias mais bonitas do litoral cearense em um único dia! Piscinas naturais, falésias, águas cristalinas e paisagens de tirar o fôlego.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h00 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 17h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.
O roteiro das 3 praias pode variar conforme condições climáticas e de maré.

Sobre o Passeio 3 Praias Incríveis
Um combo perfeito para quem quer conhecer o melhor do litoral cearense em um único dia. Passamos por 3 praias selecionadas com os cenários mais impressionantes da região.

🌟 Possíveis praias do roteiro:
Morro Branco (falésias coloridas)
Praia das Fontes (fontes naturais)
Águas Belas (piscinas naturais)
E outras conforme combinado

💡 Dica:
Converse com nosso motorista para personalizar o roteiro conforme seus interesses e a maré do dia!`
  },
  {
    titulo: "Passeio 3 Praias em 1 dia",
    descricaoCurta: "Aproveite 3 praias paradisíacas em apenas 1 dia! Roteiro otimizado para conhecer o máximo do litoral cearense com conforto e praticidade.",
    descricao: `Sobre este Pacote
🏖️ Passeio Privativo 3 Praias em 1 Dia – TransferFortalezaTur

Maximize sua experiência no Ceará conhecendo 3 praias paradisíacas em apenas 1 dia! Roteiro pensado para você aproveitar o melhor do litoral com nosso transfer privativo.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h00 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 17h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.
O roteiro pode ser personalizado conforme sua preferência.

Sobre o Passeio 3 Praias em 1 Dia
Roteiro otimizado para quem tem pouco tempo e quer conhecer o máximo possível. Combinamos 3 praias próximas entre si para um dia completo de belezas naturais.

🌟 Sugestões de roteiros:
Roteiro Leste: Morro Branco + Praia das Fontes + Águas Belas
Roteiro Oeste: Cumbuco + Taíba + Pecém
Ou monte seu roteiro personalizado!

💡 Dica:
Informe suas preferências ao reservar e montamos o roteiro perfeito para o seu grupo!`
  },
  {
    titulo: "Passeio Lagoinha",
    descricaoCurta: "Encante-se com Lagoinha! Falésias multicoloridas, piscinas naturais e águas cristalinas em uma das praias mais fotogênicas do litoral oeste cearense.",
    descricao: `Sobre este Pacote
📸 Passeio Privativo Lagoinha – TransferFortalezaTur

Lagoinha é uma das praias mais fotogênicas do Ceará! Falésias multicoloridas, piscinas naturais cristalinas e cenário paradisíaco fazem deste destino uma experiência inesquecível.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Lagoinha
Localizada no município de Paraipaba (120 km de Fortaleza), Lagoinha é famosa por suas falésias coloridas, piscinas naturais formadas na maré baixa e por ser uma das praias mais bonitas do Ceará.

🌟 O que você vai conhecer:
Falésias multicoloridas de Lagoinha
Piscinas naturais de águas cristalinas
Mirante com vista panorâmica
Barracas com gastronomia local
Passeio de buggy (opcional, não incluso)

💡 Dica:
Programe sua visita para a maré baixa – as piscinas naturais de Lagoinha são um espetáculo da natureza!`
  },
  {
    titulo: "Passeio Praia das Fontes",
    descricaoCurta: "Descubra a Praia das Fontes em Beberibe! Fontes de água doce brotando das falésias, grutas naturais e cenários únicos no litoral leste cearense.",
    descricao: `Sobre este Pacote
💧 Passeio Privativo Praia das Fontes – TransferFortalezaTur

A Praia das Fontes é única no mundo! Fontes de água doce brotam das falésias diretamente na praia, criando cenários espetaculares. Um passeio obrigatório para quem visita o Ceará.

🕒 Duração do Passeio:
O dia inteiro
Saída: 07h30 (buscamos no hotel/pousada/condomínio na orla de Fortaleza)
Retorno: 16h (retorno ao local de hospedagem)

✅ O que está incluso:
Veículo privativo exclusivo para o seu grupo
Motorista profissional credenciado
Ar-condicionado
Veículos revisados e higienizados
Flexibilidade total de agendamento

⚠️ Observação Importante:
Não realizamos passeio compartilhado.
Apenas Passeio Privativo exclusivo para você e seus acompanhantes.

Sobre o Passeio Praia das Fontes
Localizada em Beberibe (85 km de Fortaleza), a Praia das Fontes é famosa pelas fontes de água doce que brotam das falésias. O cenário inclui grutas, formações rochosas e praia de areia branca.

🌟 O que você vai conhecer:
Fontes de água doce nas falésias
Gruta da Mãe d'Água
Falésias e formações rochosas
Praia de areia branca e águas calmas
Passeio de buggy (opcional, não incluso)

💡 Dica:
Combine com uma visita a Morro Branco, que fica a poucos minutos – são destinos complementares perfeitos!`
  }
];

// ============================================================
// FUNÇÃO PRINCIPAL
// ============================================================
async function criarPacotes() {
  console.log('🚀 Iniciando criação dos pacotes...\n');
  
  let criados = 0;
  let erros = 0;

  // Criar Transfers
  console.log('=== CRIANDO TRANSFERS ===\n');
  for (const transfer of transfers) {
    try {
      const newDocRef = doc(collection(db, 'pacotes'));
      const slug = gerarSlug(transfer.titulo);
      
      const pacoteData = {
        id: newDocRef.id,
        titulo: transfer.titulo,
        descricao: transfer.descricao,
        descricaoCurta: transfer.descricaoCurta,
        slug: slug,
        categoria: "transfer_chegada_saida",
        categorias: ["transfer_chegada", "transfer_saida", "transfer_chegada_saida"],
        preco: 0,
        precoOriginal: 0,
        mostrarPreco: false,
        imagens: [],
        destaque: true,
        isIdaEVolta: true,
        precoIda: 0,
        precoVolta: 0,
        precoIdaVolta: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(newDocRef, pacoteData);
      console.log(`✅ Transfer criado: ${transfer.titulo} (${slug}) - ID: ${newDocRef.id}`);
      criados++;
    } catch (err) {
      console.error(`❌ Erro ao criar ${transfer.titulo}:`, err.message);
      erros++;
    }
  }

  // Criar Passeios
  console.log('\n=== CRIANDO PASSEIOS ===\n');
  for (const passeio of passeios) {
    try {
      const newDocRef = doc(collection(db, 'pacotes'));
      const slug = gerarSlug(passeio.titulo);
      
      const pacoteData = {
        id: newDocRef.id,
        titulo: passeio.titulo,
        descricao: passeio.descricao,
        descricaoCurta: passeio.descricaoCurta,
        slug: slug,
        categoria: "passeio",
        categorias: ["passeio"],
        preco: 0,
        precoOriginal: 0,
        mostrarPreco: false,
        imagens: [],
        destaque: true,
        isIdaEVolta: false,
        precoIda: 0,
        precoVolta: 0,
        precoIdaVolta: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(newDocRef, pacoteData);
      console.log(`✅ Passeio criado: ${passeio.titulo} (${slug}) - ID: ${newDocRef.id}`);
      criados++;
    } catch (err) {
      console.error(`❌ Erro ao criar ${passeio.titulo}:`, err.message);
      erros++;
    }
  }

  console.log(`\n========================================`);
  console.log(`📊 RESUMO:`);
  console.log(`   ✅ Criados: ${criados}`);
  console.log(`   ❌ Erros: ${erros}`);
  console.log(`   📦 Total tentados: ${transfers.length + passeios.length}`);
  console.log(`========================================\n`);
  
  process.exit(0);
}

criarPacotes().catch(err => {
  console.error('❌ Erro fatal:', err);
  process.exit(1);
});

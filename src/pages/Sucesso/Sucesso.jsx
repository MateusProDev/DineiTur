// pages/sucesso.js
import React from 'react';
import SEOHelmet from '../../components/SEOHelmet/SEOHelmet';

const Sucesso = () => {
  return (
    <>
      <SEOHelmet
        title="Pagamento realizado com sucesso | DineiTur"
        description="Seu pagamento foi realizado com sucesso. Obrigado por reservar com a DineiTur!"
      />
      <div>
        <h1>Pagamento realizado com sucesso!</h1>
        <p>Obrigado pela sua compra.</p>
      </div>
    </>
  );
};

export default Sucesso;

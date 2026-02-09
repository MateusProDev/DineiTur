import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
  Slide
} from '@mui/material';
import {
  CheckCircle,
  Phone,
  Schedule,
  LocationOn,
  Payment,
  Info,
  WhatsApp,
  Star,
  Security,
  SupportAgent,
  Visibility
} from '@mui/icons-material';
import { useWhatsAppNumber } from '../../hooks/useWhatsAppNumber';
import './OrientacoesReservaModal.css';

const OrientacoesReservaModal = ({ open, onClose, reservaData }) => {
  const navigate = useNavigate();
  const { phoneNumber, loading: whatsappLoading } = useWhatsAppNumber();

  const handleWhatsAppContact = () => {
    const message = `Olá! Acabei de fazer uma reserva no site da DineiTur e gostaria de tirar algumas dúvidas. 

*Dados da Reserva:*
• Nome: ${reservaData?.nome || 'Não informado'}
• Data: ${reservaData?.data || 'Não informado'}
• Horário: ${reservaData?.hora || 'Não informado'}
• Destino: ${reservaData?.pacoteTitulo || 'Não informado'}

Aguardo retorno!`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleViewReservations = () => {
    // Fecha o modal primeiro
    onClose();
    // Usa React Router para navegação em vez de window.location
    setTimeout(() => {
      navigate('/usuario/painel');
    }, 300);
  };

  // Formatar número para exibição
  const formatPhoneForDisplay = (phone) => {
    if (!phone) return '(11) 99999-9999';
    
    // Remove o código do país (55) se existir
    let formattedPhone = phone.replace(/^55/, '');
    
    // Formata para (XX) XXXXX-XXXX
    if (formattedPhone.length === 11) {
      return `(${formattedPhone.slice(0, 2)}) ${formattedPhone.slice(2, 7)}-${formattedPhone.slice(7)}`;
    }
    
    return phone;
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "up",
        timeout: 600
      }}
      PaperProps={{
        className: 'orientacoes-modal-paper'
      }}
    >
      <DialogTitle className="orientacoes-modal-header">
        <Box display="flex" alignItems="center" gap={2}>
          <CheckCircle className="success-icon" />
          <Box>
            <Typography variant="h5" className="title-main">
              🎉 Reserva Criada com Sucesso!
            </Typography>
            <Typography variant="subtitle1" className="title-sub">
              Agora você está mais próximo da sua aventura perfeita!
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent className="orientacoes-modal-content">
        {/* Status da Reserva */}
        <Alert 
          severity="success" 
          className="status-alert"
          icon={<CheckCircle />}
        >
          <Typography variant="h6">
            ✅ Sua reserva foi registrada e está sendo processada
          </Typography>
          <Typography variant="body2">
            Status atual: <Chip label="PENDENTE" color="warning" size="small" />
          </Typography>
        </Alert>

        {/* Resumo da Reserva Criada */}
        <Box className="section">
          <Typography variant="h6" className="section-title">
            📄 Resumo da Sua Reserva
          </Typography>
          
          <Box className="reservation-summary">
            <List className="summary-list">
              <ListItem className="summary-item">
                <ListItemIcon>
                  <Typography className="summary-label">👤</Typography>
                </ListItemIcon>
                <ListItemText
                  primary="Nome"
                  secondary={reservaData?.nome || 'Não informado'}
                />
              </ListItem>
              
              <ListItem className="summary-item">
                <ListItemIcon>
                  <Typography className="summary-label">📅</Typography>
                </ListItemIcon>
                <ListItemText
                  primary="Data da Viagem"
                  secondary={reservaData?.data || 'A definir'}
                />
              </ListItem>
              
              <ListItem className="summary-item">
                <ListItemIcon>
                  <Typography className="summary-label">⏰</Typography>
                </ListItemIcon>
                <ListItemText
                  primary="Horário"
                  secondary={reservaData?.hora || 'A definir'}
                />
              </ListItem>
              
              <ListItem className="summary-item">
                <ListItemIcon>
                  <Typography className="summary-label">🎯</Typography>
                </ListItemIcon>
                <ListItemText
                  primary="Destino"
                  secondary={reservaData?.pacoteTitulo || 'Não informado'}
                />
              </ListItem>
              
              <ListItem className="summary-item">
                <ListItemIcon>
                  <Typography className="summary-label">💳</Typography>
                </ListItemIcon>
                <ListItemText
                  primary="Forma de Pagamento"
                  secondary={reservaData?.pagamento?.toUpperCase() || 'Não informado'}
                />
              </ListItem>
            </List>
          </Box>
        </Box>

        <Divider className="section-divider" />

        {/* Próximos Passos */}
        <Box className="section">
          <Typography variant="h6" className="section-title">
            📋 Próximos Passos
          </Typography>
          
          <List className="steps-list">
            <ListItem className="step-item">
              <ListItemIcon>
                <Box className="step-number">1</Box>
              </ListItemIcon>
              <ListItemText
                primary="Análise da Reserva"
                secondary="Nossa equipe irá analisar sua solicitação e verificar disponibilidade"
              />
            </ListItem>
            
            <ListItem className="step-item">
              <ListItemIcon>
                <Box className="step-number">2</Box>
              </ListItemIcon>
              <ListItemText
                primary="Designação do Motorista"
                secondary="Um de nossos motoristas profissionais será designado para sua viagem"
              />
            </ListItem>
            
            <ListItem className="step-item">
              <ListItemIcon>
                <Box className="step-number">3</Box>
              </ListItemIcon>
              <ListItemText
                primary="Confirmação e Contato"
                secondary="Você receberá uma confirmação com os dados do motorista e veículo"
              />
            </ListItem>
          </List>
        </Box>

        <Divider className="section-divider" />

        {/* Informações Importantes */}
        <Box className="section">
          <Typography variant="h6" className="section-title">
            ⚠️ Informações Importantes
          </Typography>
          
          <List className="info-list">
            <ListItem className="info-item">
              <ListItemIcon>
                <Schedule color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Prazo de Confirmação"
                secondary="Confirmaremos sua reserva em até 2 horas durante horário comercial"
              />
            </ListItem>
            
            <ListItem className="info-item">
              <ListItemIcon>
                <Phone color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Contato do Motorista"
                secondary="Você receberá o contato do motorista 1 hora antes da viagem"
              />
            </ListItem>
            
            <ListItem className="info-item">
              <ListItemIcon>
                <LocationOn color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Ponto de Encontro"
                secondary="Certifique-se de estar no local de origem 10 minutos antes do horário"
              />
            </ListItem>
            
            <ListItem className="info-item">
              <ListItemIcon>
                <Payment color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Forma de Pagamento"
                secondary={`Pagamento via: ${reservaData?.pagamento?.toUpperCase() || 'Não informado'}`}
              />
            </ListItem>
          </List>
        </Box>

        <Divider className="section-divider" />

        {/* Diferenciais da Empresa */}
        <Box className="section">
          <Typography variant="h6" className="section-title">
            ⭐ Por que escolher a DineiTur?
          </Typography>
          
          <Box className="features-grid">
            <Box className="feature-card">
              <Security className="feature-icon" />
              <Typography variant="subtitle2">Segurança</Typography>
              <Typography variant="body2">Motoristas verificados e veículos vistoriados</Typography>
            </Box>
            
            <Box className="feature-card">
              <Star className="feature-icon" />
              <Typography variant="subtitle2">Qualidade</Typography>
              <Typography variant="body2">Mais de 1000 clientes satisfeitos</Typography>
            </Box>
            
            <Box className="feature-card">
              <SupportAgent className="feature-icon" />
              <Typography variant="subtitle2">Suporte</Typography>
              <Typography variant="body2">Atendimento dedicado via WhatsApp</Typography>
            </Box>
            
            <Box className="feature-card">
              <CheckCircle className="feature-icon" />
              <Typography variant="subtitle2">Confiança</Typography>
              <Typography variant="body2">Empresa licenciada e regulamentada</Typography>
            </Box>
          </Box>
        </Box>

        <Divider className="section-divider" />

        {/* Contato de Emergência */}
        <Alert severity="info" className="contact-alert">
          <Typography variant="h6" gutterBottom>
            📞 Precisa de Ajuda?
          </Typography>
          <Typography variant="body2" gutterBottom>
            Nossa equipe está sempre disponível para esclarecer dúvidas e oferecer suporte.
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              startIcon={<WhatsApp />}
              onClick={handleWhatsAppContact}
              className="whatsapp-button"
              fullWidth
            >
              Falar no WhatsApp Agora
            </Button>
          </Box>
        </Alert>

        {/* Dica Final */}
        <Box className="tip-box">
          <Info className="tip-icon" />
          <Typography variant="body2" className="tip-text">
            💡 <strong>Dica:</strong> Salve este número em seus contatos: {formatPhoneForDisplay(phoneNumber)}. 
            Assim você pode entrar em contato conosco facilmente!
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions className="orientacoes-modal-footer">
        <Button 
          onClick={handleViewReservations}
          variant="outlined" 
          startIcon={<Visibility />}
          className="view-reservations-button"
        >
          Ver Minhas Reservas
        </Button>
        <Button 
          onClick={onClose} 
          variant="outlined" 
          color="primary"
          className="close-button"
        >
          Entendi, obrigado!
        </Button>
        <Button
          onClick={handleWhatsAppContact}
          variant="contained"
          startIcon={<WhatsApp />}
          className="contact-button"
        >
          Entrar em Contato
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrientacoesReservaModal;

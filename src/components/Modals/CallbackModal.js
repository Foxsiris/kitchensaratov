import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiUser, FiSend } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

/* ============================
   OVERLAY
   ============================ */
const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${p => p.theme.spacing.md};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 8px;
    align-items: flex-end;
  }
`;

/* ============================
   MODAL BOX
   ============================ */
const ModalBox = styled(motion.div)`
  background: ${p => p.theme.colors.primary};
  max-width: 820px;
  width: 100%;
  max-height: 92vh;
  overflow-y: auto;
  position: relative;
  display: grid;
  grid-template-columns: 1.3fr 1fr;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    max-width: 100%;
    max-height: 90vh;
    border-radius: 16px 16px 0 0;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.2s;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    color: ${p => p.theme.colors.white};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }
`;

/* ============================
   LEFT: FORM
   ============================ */
const FormSide = styled.div`
  padding: 48px 44px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 40px 20px 24px;
  }
`;

const ModalTitle = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.white};
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 10px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
    line-height: 1.3;
  }
`;

const ModalSubtitle = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.6;
  margin-bottom: 32px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
    margin-bottom: 24px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    gap: 14px;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  position: absolute;
  top: -8px;
  left: 12px;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.35);
  background: ${p => p.theme.colors.primary};
  padding: 0 6px;
  z-index: 2;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${p => p.theme.colors.white};
  font-size: ${p => p.theme.fontSizes.sm};
  font-family: inherit;
  transition: border-color 0.2s;
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 13px 14px;
    font-size: 14px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${p => p.theme.colors.white};
  font-size: ${p => p.theme.fontSizes.sm};
  font-family: inherit;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.2s;
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 13px 14px;
    font-size: 14px;
    min-height: 72px;
  }
`;

const PrivacyNote = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.25);
  line-height: 1.5;
  margin-top: 4px;
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.primary};
  border: none;
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: all 0.25s;
  margin-top: 8px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 15px;
    font-size: 10px;
    letter-spacing: 0.14em;
  }
`;

/* ============================
   RIGHT: CONSULTANT
   ============================ */
const ConsultantSide = styled.div`
  background: ${p => p.theme.colors.secondary};
  padding: 48px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 24px 20px;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    gap: 16px;
  }
`;

const Avatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80') center/cover no-repeat;
  border: 2px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 72px;
    height: 72px;
  }
`;

const ConsultantName = styled.div`
  font-family: ${p => p.theme.fonts.primary};
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: ${p => p.theme.colors.white};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const ConsultantRole = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  color: rgba(255, 255, 255, 0.4);
  margin-top: -12px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 11px;
    margin-top: -10px;
  }
`;

const MessengerLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 8px;
`;

const MessengerLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.25);
  margin-bottom: 2px;
`;

const MessengerBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: ${p => p.theme.colors.white};
  text-decoration: none;
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 500;
  letter-spacing: 0.06em;
  transition: all 0.2s;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    border-color: rgba(255, 255, 255, 0.35);
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 12px;
    font-size: 11px;
  }
`;

const PhoneNumber = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${p => p.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: color 0.2s;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${p => p.theme.colors.white};
  }

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

/* ============================
   SUCCESS
   ============================ */
const SuccessView = styled(motion.div)`
  grid-column: 1 / -1;
  padding: 64px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: 48px 24px;
    gap: 12px;
  }
`;

const SuccessIcon = styled.div`
  width: 64px;
  height: 64px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.white};
  font-size: 28px;
  margin-bottom: 8px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    width: 56px;
    height: 56px;
    font-size: 24px;
    margin-bottom: 4px;
  }
`;

const SuccessTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: 400;
  color: ${p => p.theme.colors.white};

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

const SuccessText = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  max-width: 340px;

  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    font-size: 13px;
    max-width: 100%;
  }
`;

/* ============================
   COMPONENT
   ============================ */
const CallbackModal = () => {
  const { activeModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isOpen = activeModal === 'callback';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
      closeModal();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalBox
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseBtn onClick={closeModal}>
              <FiX size={18} />
            </CloseBtn>

            {isSuccess ? (
              <SuccessView
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SuccessIcon>&#10003;</SuccessIcon>
                <SuccessTitle>Заявка отправлена</SuccessTitle>
                <SuccessText>
                  Спасибо! Директор шоурума свяжется с вами в ближайшее время
                  для обсуждения деталей проекта.
                </SuccessText>
              </SuccessView>
            ) : (
              <>
                {/* LEFT: form */}
                <FormSide>
                  <ModalTitle>
                    Запросите расчёт стоимости вашей кухни или мебели
                  </ModalTitle>
                  <ModalSubtitle>
                    Директор шоурума лично проконсультирует вас по стоимости и деталям проекта
                  </ModalSubtitle>

                  <Form onSubmit={handleSubmit}>
                    <InputRow>
                      <InputWrapper>
                        <InputLabel>Имя</InputLabel>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ваше имя"
                          required
                        />
                      </InputWrapper>
                      <InputWrapper>
                        <InputLabel>Телефон</InputLabel>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+7 (___) ___-__-__"
                          required
                        />
                      </InputWrapper>
                    </InputRow>

                    <InputWrapper>
                      <InputLabel>E-mail</InputLabel>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <InputLabel>Сообщение</InputLabel>
                      <TextArea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Расскажите о ваших пожеланиях..."
                      />
                    </InputWrapper>

                    <PrivacyNote>
                      Я ознакомлен с Политикой конфиденциальности и даю согласие на обработку персональных данных
                    </PrivacyNote>

                    <SubmitBtn
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Отправляем...' : 'Узнайте стоимость вашей кухни'}
                    </SubmitBtn>
                  </Form>
                </FormSide>

                {/* RIGHT: consultant */}
                <ConsultantSide>
                  <Avatar />
                  <ConsultantName>Иванова Анна</ConsultantName>
                  <ConsultantRole>Директор шоурума</ConsultantRole>

                  <PhoneNumber href="tel:+79000000000">
                    <FiPhone size={13} />
                    +7 (900) 000-00-00
                  </PhoneNumber>

                  <MessengerLinks>
                    <MessengerLabel>Связаться в:</MessengerLabel>
                    <MessengerBtn href="https://wa.me/79000000000" target="_blank" rel="noopener noreferrer">
                      <FiUser size={14} />
                      WhatsApp
                    </MessengerBtn>
                    <MessengerBtn href="https://t.me/username" target="_blank" rel="noopener noreferrer">
                      <FiSend size={14} />
                      Telegram
                    </MessengerBtn>
                  </MessengerLinks>
                </ConsultantSide>
              </>
            )}
          </ModalBox>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CallbackModal;

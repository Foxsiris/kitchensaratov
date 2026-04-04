import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiPhone, FiMail, FiCheck } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 8, 10, 0.58);
  backdrop-filter: blur(14px) saturate(1.05);
  -webkit-backdrop-filter: blur(14px) saturate(1.05);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0;
    align-items: flex-end;
  }

  @media (prefers-reduced-motion: reduce) {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['3xl']};
  max-width: 560px;
  width: 100%;
  max-height: min(90vh, 720px);
  overflow-y: auto;
  position: relative;
  border-radius: 22px;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.04),
    0 28px 80px rgba(0, 0, 0, 0.14),
    0 10px 32px rgba(0, 0, 0, 0.08);
  cursor: default;
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    max-height: 92vh;
    border-radius: 22px 22px 0 0;
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
    box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.12);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.light};
  border: 1px solid ${props => props.theme.colors.border};
  font-size: 1.25rem;
  color: ${props => props.theme.colors.grayDark};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    border-color: rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
`;

const ModalHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};
  padding-right: 52px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.spacing.xl};
    padding-right: 48px;
  }
`;

const ModalTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const ModalSubtitle = styled.p`
  color: ${props => props.theme.colors.grayDark};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.65;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

const BenefitsList = styled.div`
  background: ${props => props.theme.colors.light};
  border: none;
  border-radius: 14px;
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.04);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.lg};
    border-radius: 12px;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.grayDark};
  font-size: ${props => props.theme.fontSizes.sm};

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: ${props => props.theme.colors.primary};
    flex-shrink: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 13px;
    gap: 8px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    gap: ${props => props.theme.spacing.md};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${props => props.theme.colors.grayDark};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: ${props => props.theme.transitions.fast};
  -webkit-tap-highlight-color: transparent;
  background: ${props => props.theme.colors.white};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.colors.grayLight};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 12px;
    font-size: 14px;
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  font-size: ${props => props.theme.fontSizes.sm};
  background: ${props => props.theme.colors.white};
  transition: ${props => props.theme.transitions.fast};
  border-radius: 10px;
  appearance: auto;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
    outline: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 12px;
    font-size: 14px;
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  width: 100%;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);

  &:hover {
    background: ${props => props.theme.colors.dark};
    border-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.white};
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.22);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 14px ${props => props.theme.spacing.lg};
    font-size: 11px;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.6;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
    font-size: 13px;
    border-radius: 12px;
  }
`;

const InstallmentModal = () => {
  const { activeModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    amount: '',
    period: '12',
    income: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isOpen = activeModal === 'installment';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: '', phone: '', email: '', amount: '', period: '12', income: '' });
      closeModal();
    }, 3000);
  };

  const benefits = [
    'Рассрочка 0% на 12 месяцев',
    'Первый взнос от 30%',
    'Без справок о доходах',
    'Решение за 15 минут',
    'Одобрение 95% заявок'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          onClick={closeModal}
        >
          <ModalContent
            role="dialog"
            aria-modal="true"
            aria-labelledby="installment-modal-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.34, 1.02, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton type="button" onClick={closeModal} aria-label="Закрыть окно">
              <FiX aria-hidden />
            </CloseButton>

            <ModalHeader>
              <ModalTitle id="installment-modal-title">Оформить рассрочку</ModalTitle>
              <ModalSubtitle>
                Получите кухню в рассрочку без переплат и скрытых комиссий
              </ModalSubtitle>
            </ModalHeader>

            <BenefitsList>
              {benefits.map((benefit, index) => (
                <BenefitItem key={index}>
                  <FiCheck size={14} />
                  {benefit}
                </BenefitItem>
              ))}
            </BenefitsList>

            {isSuccess ? (
              <SuccessMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Заявка отправлена! Менеджер свяжется с вами в течение 15 минут.
              </SuccessMessage>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label><FiUser size={12} /> Имя</Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ваше имя"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label><FiPhone size={12} /> Телефон</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label><FiMail size={12} /> Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label>Сумма покупки</Label>
                    <Input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Сумма в рублях"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Срок рассрочки</Label>
                    <Select
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="6">6 месяцев</option>
                      <option value="12">12 месяцев</option>
                      <option value="18">18 месяцев</option>
                      <option value="24">24 месяца</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Отправляем...' : 'Подать заявку'}
                </SubmitButton>
              </Form>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default InstallmentModal;

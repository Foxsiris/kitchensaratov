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
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0;
    align-items: flex-end;
  }
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['3xl']};
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    max-height: 92vh;
    border-radius: 20px 20px 0 0;
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.lg} ${props => props.theme.spacing.lg};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  background: none;
  border: none;
  font-size: 1.25rem;
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: 16px;
    right: 16px;
  }
`;

const ModalHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: ${props => props.theme.spacing.xl};
  }
`;

const ModalTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};
  font-weight: 400;
  margin-bottom: ${props => props.theme.spacing.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.xl};
  }
`;

const ModalSubtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 13px;
  }
`;

const BenefitsList = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.lg};
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
  font-size: ${props => props.theme.fontSizes.sm};
  transition: ${props => props.theme.transitions.fast};
  -webkit-tap-highlight-color: transparent;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
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
  border-radius: 0;
  appearance: auto;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
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
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  width: 100%;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.primary};
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
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  font-size: ${props => props.theme.fontSizes.sm};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
    font-size: 13px;
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeModal}>
              <FiX />
            </CloseButton>

            <ModalHeader>
              <ModalTitle>Оформить рассрочку</ModalTitle>
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

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPhone, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';
import { useModal } from '../../hooks/useModal';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md};
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['2xl']};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray};
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const ModalIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  color: white;
  font-size: ${props => props.theme.fontSizes['2xl']};
`;

const ModalTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ModalSubtitle = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray};
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray};
  }
`;

const SubmitButton = styled(motion.button)`
  background: ${props => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${props => props.theme.colors.success};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: center;
  font-weight: 500;
`;

const CallbackModal = () => {
  const { activeModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isOpen = activeModal === 'callback';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Сброс формы через 3 секунды
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
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
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeModal}>
              <FiX />
            </CloseButton>

            <ModalHeader>
              <ModalIcon>
                <FiPhone />
              </ModalIcon>
              <ModalTitle>Заказать обратный звонок</ModalTitle>
              <ModalSubtitle>
                Оставьте свои контакты, и мы свяжемся с вами в течение 15 минут
              </ModalSubtitle>
            </ModalHeader>

            {isSuccess ? (
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Спасибо! Мы свяжемся с вами в ближайшее время.
              </SuccessMessage>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>
                    <FiUser />
                    Ваше имя
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Введите ваше имя"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiPhone />
                    Телефон
                  </Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiMail />
                    Email (необязательно)
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiMessageSquare />
                    Сообщение (необязательно)
                  </Label>
                  <TextArea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Расскажите о ваших пожеланиях..."
                  />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Отправляем...' : 'Заказать звонок'}
                </SubmitButton>
              </Form>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CallbackModal;

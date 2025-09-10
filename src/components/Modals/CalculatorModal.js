import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPieChart, FiMaximize, FiHome } from 'react-icons/fi';
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
  max-width: 700px;
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

const CalculatorForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['2xl']};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
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

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.md};
  background: white;
  transition: ${props => props.theme.transitions.fast};

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.dark};
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors.primary};
`;

const ResultSection = styled.div`
  background: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  text-align: center;
  margin-top: ${props => props.theme.spacing['2xl']};
`;

const ResultTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PriceDisplay = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const PriceRange = styled.div`
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const CalculateButton = styled(motion.button)`
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
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const CalculatorModal = () => {
  const { activeModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    style: 'modern',
    material: 'mdf',
    appliances: [],
    additional: []
  });
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  const isOpen = activeModal === 'calculator';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const field = name.includes('appliances') ? 'appliances' : 'additional';
      setFormData(prev => ({
        ...prev,
        [field]: checked 
          ? [...prev[field], value]
          : prev[field].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculatePrice = () => {
    const { length, width, style, material, appliances, additional } = formData;
    
    if (!length || !width) {
      alert('Пожалуйста, укажите размеры кухни');
      return;
    }

    const area = parseFloat(length) * parseFloat(width);
    
    // Базовая стоимость за м²
    let basePrice = 0;
    switch (material) {
      case 'mdf': basePrice = 15000; break;
      case 'ldsp': basePrice = 12000; break;
      case 'wood': basePrice = 25000; break;
      case 'plastic': basePrice = 10000; break;
      default: basePrice = 15000; break;
    }

    // Коэффициент стиля
    let styleMultiplier = 1;
    switch (style) {
      case 'classic': styleMultiplier = 1.2; break;
      case 'modern': styleMultiplier = 1.0; break;
      case 'loft': styleMultiplier = 1.1; break;
      case 'scandinavian': styleMultiplier = 1.05; break;
      default: styleMultiplier = 1.0; break;
    }

    let totalPrice = area * basePrice * styleMultiplier;

    // Дополнительные приборы
    const appliancePrices = {
      'dishwasher': 25000,
      'oven': 30000,
      'hob': 20000,
      'refrigerator': 40000,
      'microwave': 15000
    };

    appliances.forEach(appliance => {
      totalPrice += appliancePrices[appliance] || 0;
    });

    // Дополнительные услуги
    const additionalPrices = {
      'installation': 15000,
      'delivery': 5000,
      'design': 10000,
      'warranty': 5000
    };

    additional.forEach(service => {
      totalPrice += additionalPrices[service] || 0;
    });

    setCalculatedPrice({
      base: Math.round(totalPrice * 0.7),
      total: Math.round(totalPrice)
    });
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
                <FiPieChart />
              </ModalIcon>
              <ModalTitle>Калькулятор стоимости кухни</ModalTitle>
              <ModalSubtitle>
                Рассчитайте примерную стоимость вашей кухни за несколько минут
              </ModalSubtitle>
            </ModalHeader>

            <CalculatorForm>
              <FormSection>
                <SectionTitle>
                  <FiMaximize />
                  Размеры кухни
                </SectionTitle>

                <FormGroup>
                  <Label>Длина (м)</Label>
                  <Input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    placeholder="3.5"
                    step="0.1"
                    min="1"
                    max="10"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Ширина (м)</Label>
                  <Input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    placeholder="2.5"
                    step="0.1"
                    min="1"
                    max="10"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Стиль</Label>
                  <Select
                    name="style"
                    value={formData.style}
                    onChange={handleInputChange}
                  >
                    <option value="modern">Современный</option>
                    <option value="classic">Классический</option>
                    <option value="loft">Лофт</option>
                    <option value="scandinavian">Скандинавский</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Материал</Label>
                  <Select
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                  >
                    <option value="mdf">МДФ</option>
                    <option value="ldsp">ЛДСП</option>
                    <option value="wood">Массив дерева</option>
                    <option value="plastic">Пластик</option>
                  </Select>
                </FormGroup>
              </FormSection>

              <FormSection>
                <SectionTitle>
                  <FiHome />
                  Дополнительно
                </SectionTitle>

                <FormGroup>
                  <Label>Встроенная техника</Label>
                  <CheckboxGroup>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="appliances-dishwasher"
                        value="dishwasher"
                        onChange={handleInputChange}
                      />
                      Посудомоечная машина
                    </CheckboxItem>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="appliances-oven"
                        value="oven"
                        onChange={handleInputChange}
                      />
                      Духовой шкаф
                    </CheckboxItem>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="appliances-hob"
                        value="hob"
                        onChange={handleInputChange}
                      />
                      Варочная панель
                    </CheckboxItem>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="appliances-refrigerator"
                        value="refrigerator"
                        onChange={handleInputChange}
                      />
                      Холодильник
                    </CheckboxItem>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="appliances-microwave"
                        value="microwave"
                        onChange={handleInputChange}
                      />
                      Микроволновка
                    </CheckboxItem>
                  </CheckboxGroup>
                </FormGroup>

                <FormGroup>
                  <Label>Дополнительные услуги</Label>
                  <CheckboxGroup>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="additional-installation"
                        value="installation"
                        onChange={handleInputChange}
                      />
                      Монтаж
                    </CheckboxItem>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="additional-delivery"
                        value="delivery"
                        onChange={handleInputChange}
                      />
                      Доставка
                    </CheckboxItem>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="additional-design"
                        value="design"
                        onChange={handleInputChange}
                      />
                      Дизайн-проект
                    </CheckboxItem>
                    <CheckboxItem>
                      <Checkbox
                        type="checkbox"
                        name="additional-warranty"
                        value="warranty"
                        onChange={handleInputChange}
                      />
                      Расширенная гарантия
                    </CheckboxItem>
                  </CheckboxGroup>
                </FormGroup>
              </FormSection>
            </CalculatorForm>

            <CalculateButton
              onClick={calculatePrice}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPieChart />
              Рассчитать стоимость
            </CalculateButton>

            {calculatedPrice && (
              <ResultSection>
                <ResultTitle>Примерная стоимость</ResultTitle>
                <PriceDisplay>
                  {calculatedPrice.base.toLocaleString()} ₽
                </PriceDisplay>
                <PriceRange>
                  от {calculatedPrice.base.toLocaleString()} ₽ до {calculatedPrice.total.toLocaleString()} ₽
                </PriceRange>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  * Точная стоимость рассчитывается после замера и выбора материалов
                </p>
              </ResultSection>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CalculatorModal;

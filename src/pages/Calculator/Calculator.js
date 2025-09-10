import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPieChart, FiMaximize, FiHome, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CalculatorContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23ffffff" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="%23ffffff" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing['2xl']} ${props => props.theme.spacing.md};
  position: relative;
  z-index: 1;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PageSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const CalculatorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['3xl']};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
  }
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    border-radius: 2px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
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
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
    transform: translateY(-2px);
    background: white;
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
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
    transform: translateY(-2px);
    background: white;
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
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors.primary};
`;

const CalculateButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ResultSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  position: sticky;
  top: 100px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.primary});
  }
`;

const ResultTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PriceDisplay = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  font-weight: 700;
  background: linear-gradient(135deg, ${props => props.theme.colors.secondary} 0%, ${props => props.theme.colors.primary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${props => props.theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const PriceRange = styled.div`
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ActionButton = styled.button`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${props => props.theme.transitions.fast};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};

  &.primary {
    background: ${props => props.theme.colors.gradient};
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.shadows.lg};
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};

    &:hover {
      background: ${props => props.theme.colors.primary};
      color: white;
    }
  }
`;

const Calculator = () => {
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    style: 'modern',
    material: 'mdf',
    appliances: [],
    additional: []
  });
  const [calculatedPrice, setCalculatedPrice] = useState(null);

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
    <CalculatorContainer>
      <Container>
        <PageHeader>
          <BackButton to="/">
            <FiArrowLeft />
            Вернуться на главную
          </BackButton>
          
          <PageTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiPieChart />
            Калькулятор стоимости кухни
          </PageTitle>
          
          <PageSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Рассчитайте примерную стоимость вашей кухни за несколько минут
          </PageSubtitle>
        </PageHeader>

        <CalculatorContent>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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

            <CalculateButton
              onClick={calculatePrice}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPieChart />
              Рассчитать стоимость
            </CalculateButton>
            </FormSection>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ResultSection>
              <ResultTitle>Примерная стоимость</ResultTitle>
            
            {calculatedPrice ? (
              <>
                <PriceDisplay>
                  {calculatedPrice.base.toLocaleString()} ₽
                </PriceDisplay>
                <PriceRange>
                  от {calculatedPrice.base.toLocaleString()} ₽ до {calculatedPrice.total.toLocaleString()} ₽
                </PriceRange>
                <ResultDescription>
                  * Точная стоимость рассчитывается после замера и выбора материалов
                </ResultDescription>
                <ActionButtons>
                  <ActionButton className="primary">
                    Заказать проект
                  </ActionButton>
                  <ActionButton className="secondary">
                    Получить консультацию
                  </ActionButton>
                </ActionButtons>
              </>
            ) : (
              <>
                <PriceDisplay style={{ color: '#95A5A6', fontSize: '1.5rem' }}>
                  Заполните форму
                </PriceDisplay>
                <ResultDescription>
                  Укажите параметры кухни и нажмите "Рассчитать стоимость"
                </ResultDescription>
              </>
            )}
            </ResultSection>
          </motion.div>
        </CalculatorContent>
      </Container>
    </CalculatorContainer>
  );
};

export default Calculator;

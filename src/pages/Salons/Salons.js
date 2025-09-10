import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiClock, FiMail, FiNavigation } from 'react-icons/fi';

const SalonsContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: ${props => props.theme.spacing['4xl']} 0;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${props => props.theme.fontSizes['5xl']};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: white;
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const SalonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const SalonCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const SalonImage = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${props => props.theme.transitions.normal};

  ${SalonCard}:hover & {
    transform: scale(1.05);
  }
`;

const SalonContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const SalonTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SalonDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.dark};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ContactIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.md};
  width: 20px;
  display: flex;
  justify-content: center;
`;

const ContactLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Button = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
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
      box-shadow: ${props => props.theme.shadows.md};
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

const MapSection = styled.section`
  background: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing['4xl']} 0;
`;

const MapContainer = styled.div`
  height: 500px;
  background: ${props => props.theme.colors.gray};
  border-radius: ${props => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing['2xl']};
`;

const MapPlaceholder = styled.div`
  text-align: center;
`;

const MapIcon = styled.div`
  font-size: ${props => props.theme.fontSizes['4xl']};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const WorkingHours = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
`;

const HoursTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const HoursList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const HoursItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.light};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Day = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
`;

const Time = styled.span`
  color: ${props => props.theme.colors.gray};
`;

const Salons = () => {
  const salons = [
    {
      id: 1,
      title: 'Салон на Московской',
      description: 'Наш главный салон с полным ассортиментом кухонь и выставочными образцами.',
      address: 'ул. Московская, 123',
      phone: '+7 (900) 000-00-01',
      email: 'moscow@kitchensaratov.ru',
      workingHours: 'Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      coordinates: { lat: 51.5406, lng: 46.0086 }
    },
    {
      id: 2,
      title: 'Салон в ТЦ "Мега"',
      description: 'Современный салон в торговом центре с удобной парковкой и доступностью.',
      address: 'ТЦ "Мега", 2 этаж, павильон 45',
      phone: '+7 (900) 000-00-02',
      email: 'mega@kitchensaratov.ru',
      workingHours: 'Ежедневно: 10:00-22:00',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      coordinates: { lat: 51.5406, lng: 46.0086 }
    },
    {
      id: 3,
      title: 'Салон на Волжской',
      description: 'Уютный салон в центре города с индивидуальным подходом к каждому клиенту.',
      address: 'ул. Волжская, 67',
      phone: '+7 (900) 000-00-03',
      email: 'volga@kitchensaratov.ru',
      workingHours: 'Пн-Пт: 9:00-19:00, Сб: 10:00-17:00, Вс: выходной',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      coordinates: { lat: 51.5406, lng: 46.0086 }
    }
  ];

  const workingHours = [
    { day: 'Понедельник - Пятница', time: '9:00 - 20:00' },
    { day: 'Суббота', time: '10:00 - 18:00' },
    { day: 'Воскресенье', time: '10:00 - 16:00' }
  ];

  return (
    <SalonsContainer>
      <HeroSection>
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Наши салоны
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Посетите наши салоны, чтобы увидеть кухни вживую, 
            получить консультацию дизайнера и выбрать идеальный вариант для вашего дома.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Выберите удобный салон
          </SectionTitle>

          <SalonsGrid>
            {salons.map((salon, index) => (
              <SalonCard
                key={salon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SalonImage>
                  <Image src={salon.image} alt={salon.title} />
                </SalonImage>
                
                <SalonContent>
                  <SalonTitle>{salon.title}</SalonTitle>
                  <SalonDescription>{salon.description}</SalonDescription>
                  
                  <ContactInfo>
                    <ContactItem>
                      <ContactIcon>
                        <FiMapPin />
                      </ContactIcon>
                      <span>{salon.address}</span>
                    </ContactItem>
                    
                    <ContactItem>
                      <ContactIcon>
                        <FiPhone />
                      </ContactIcon>
                      <ContactLink href={`tel:${salon.phone}`}>
                        {salon.phone}
                      </ContactLink>
                    </ContactItem>
                    
                    <ContactItem>
                      <ContactIcon>
                        <FiMail />
                      </ContactIcon>
                      <ContactLink href={`mailto:${salon.email}`}>
                        {salon.email}
                      </ContactLink>
                    </ContactItem>
                    
                    <ContactItem>
                      <ContactIcon>
                        <FiClock />
                      </ContactIcon>
                      <span>{salon.workingHours}</span>
                    </ContactItem>
                  </ContactInfo>

                  <ActionButtons>
                    <Button className="primary">
                      <FiNavigation />
                      Построить маршрут
                    </Button>
                    <Button className="secondary">
                      <FiPhone />
                      Позвонить
                    </Button>
                  </ActionButtons>
                </SalonContent>
              </SalonCard>
            ))}
          </SalonsGrid>
        </Container>
      </ContentSection>

      <MapSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Как нас найти
          </SectionTitle>

          <MapContainer>
            <MapPlaceholder>
              <MapIcon>
                <FiMapPin />
              </MapIcon>
              <div>Интерактивная карта</div>
              <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '8px' }}>
                Здесь будет отображаться карта с расположением наших салонов
              </div>
            </MapPlaceholder>
          </MapContainer>

          <WorkingHours>
            <HoursTitle>Режим работы</HoursTitle>
            <HoursList>
              {workingHours.map((schedule, index) => (
                <HoursItem key={index}>
                  <Day>{schedule.day}</Day>
                  <Time>{schedule.time}</Time>
                </HoursItem>
              ))}
            </HoursList>
          </WorkingHours>
        </Container>
      </MapSection>
    </SalonsContainer>
  );
};

export default Salons;

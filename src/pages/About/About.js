import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTruck, FiShield, FiClock, FiHeart } from 'react-icons/fi';

const AboutContainer = styled.div`
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

const StorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
  }
`;

const StoryText = styled.div`
  h3 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  p {
    font-size: ${props => props.theme.fontSizes.md};
    line-height: 1.8;
    color: ${props => props.theme.colors.dark};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const StoryImage = styled.div`
  height: 400px;
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ValuesSection = styled.div`
  background: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing['4xl']} 0;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ValueIcon = styled.div`
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

const ValueTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ValueDescription = styled.p`
  color: ${props => props.theme.colors.gray};
  line-height: 1.6;
`;

const TeamSection = styled.div`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: white;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const TeamMember = styled(motion.div)`
  text-align: center;
  background: white;
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const MemberPhoto = styled.div`
  width: 150px;
  height: 150px;
  background: ${props => props.theme.colors.gradient};
  border-radius: 50%;
  margin: 0 auto ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.theme.fontSizes['3xl']};
  font-weight: 600;
`;

const MemberName = styled.h4`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const MemberPosition = styled.p`
  color: ${props => props.theme.colors.gray};
  font-weight: 500;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MemberDescription = styled.p`
  color: ${props => props.theme.colors.dark};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.6;
`;

const StatsSection = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing['4xl']} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
  text-align: center;
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    font-weight: 700;
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    opacity: 0.9;
  }
`;

const About = () => {
  const values = [
    {
      icon: <FiAward />,
      title: 'Качество',
      description: 'Используем только проверенные материалы от ведущих производителей'
    },
    {
      icon: <FiUsers />,
      title: 'Команда',
      description: 'Опытные дизайнеры и мастера с многолетним стажем работы'
    },
    {
      icon: <FiTruck />,
      title: 'Сервис',
      description: 'Полный цикл услуг: от дизайна до установки и гарантийного обслуживания'
    },
    {
      icon: <FiShield />,
      title: 'Гарантия',
      description: 'Предоставляем расширенную гарантию на все изделия и работы'
    },
    {
      icon: <FiClock />,
      title: 'Сроки',
      description: 'Соблюдаем договорные сроки и всегда информируем о ходе работ'
    },
    {
      icon: <FiHeart />,
      title: 'Индивидуальность',
      description: 'Каждый проект уникален и создается с учетом ваших пожеланий'
    }
  ];

  const team = [
    {
      name: 'Анна Петрова',
      position: 'Главный дизайнер',
      description: 'Опыт работы 8 лет. Специализируется на современных и скандинавских стилях.',
      initial: 'А'
    },
    {
      name: 'Михаил Соколов',
      position: 'Технический директор',
      description: 'Инженер с 12-летним стажем. Отвечает за качество производства.',
      initial: 'М'
    },
    {
      name: 'Елена Козлова',
      position: 'Менеджер проектов',
      description: 'Координирует все этапы работы с клиентами от замеров до установки.',
      initial: 'Е'
    },
    {
      name: 'Дмитрий Волков',
      position: 'Мастер-установщик',
      description: 'Опытный монтажник с 10-летним стажем. Гарантирует качественную установку.',
      initial: 'Д'
    }
  ];

  const stats = [
    { number: '500+', label: 'Довольных клиентов' },
    { number: '10+', label: 'Лет на рынке' },
    { number: '1000+', label: 'Реализованных проектов' },
    { number: '24/7', label: 'Поддержка клиентов' }
  ];

  return (
    <AboutContainer>
      <HeroSection>
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            О компании "Кухни Саратов"
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Мы создаем кухни мечты уже более 10 лет, сочетая традиции мастерства 
            с современными технологиями и индивидуальным подходом к каждому клиенту.
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
            Наша история
          </SectionTitle>

          <StorySection>
            <StoryText>
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                С чего все начиналось
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Компания "Кухни Саратов" была основана в 2014 году группой энтузиастов, 
                которые хотели изменить подход к созданию кухонь в нашем городе. 
                Мы начали с небольшой мастерской и мечты создавать не просто мебель, 
                а пространства, где семьи проводят самые важные моменты своей жизни.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                За годы работы мы выросли в полноценную компанию с собственным 
                производством, дизайн-студией и командой профессионалов. 
                Но главное - мы сохранили индивидуальный подход к каждому проекту 
                и стремление создавать кухни, которые действительно радуют наших клиентов.
              </motion.p>
            </StoryText>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <StoryImage>
                <Image 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Наша мастерская"
                />
              </StoryImage>
            </motion.div>
          </StorySection>
        </Container>
      </ContentSection>

      <ValuesSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Наши ценности
          </SectionTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ValueIcon>
                  {value.icon}
                </ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </Container>
      </ValuesSection>

      <TeamSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Наша команда
          </SectionTitle>
          <TeamGrid>
            {team.map((member, index) => (
              <TeamMember
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <MemberPhoto>
                  {member.initial}
                </MemberPhoto>
                <MemberName>{member.name}</MemberName>
                <MemberPosition>{member.position}</MemberPosition>
                <MemberDescription>{member.description}</MemberDescription>
              </TeamMember>
            ))}
          </TeamGrid>
        </Container>
      </TeamSection>

      <StatsSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ color: 'white' }}
          >
            Наши достижения
          </SectionTitle>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </StatItem>
            ))}
          </StatsGrid>
        </Container>
      </StatsSection>
    </AboutContainer>
  );
};

export default About;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar, FiMessageSquare } from 'react-icons/fi';

const TestimonialsContainer = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionSubtitle = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray};
  max-width: 600px;
  margin: 0 auto;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing['2xl']};
`;

const TestimonialCard = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.xl};
  position: relative;
  box-shadow: ${props => props.theme.shadows.md};
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.primary};
  opacity: 0.3;
  font-size: ${props => props.theme.fontSizes['3xl']};
`;

const Rating = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Star = styled.div`
  color: ${props => props.theme.colors.accent};
  font-size: ${props => props.theme.fontSizes.lg};
`;

const TestimonialText = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.6;
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-style: italic;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.gradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.lg};
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const AuthorTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray};
`;

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: 'Очень довольна результатом! Кухня получилась именно такой, как я мечтала. Качество материалов отличное, монтаж выполнен профессионально. Рекомендую всем!',
      author: {
        name: 'Анна Петрова',
        title: 'Домохозяйка',
        avatar: 'А'
      }
    },
    {
      id: 2,
      rating: 5,
      text: 'Заказывали кухню для нового дома. Дизайнер учла все наши пожелания, предложила отличные решения. Сроки соблюдены, цена адекватная. Спасибо!',
      author: {
        name: 'Михаил Соколов',
        title: 'Инженер',
        avatar: 'М'
      }
    },
    {
      id: 3,
      rating: 5,
      text: 'Отличная компания! Помогли выбрать стиль, подобрали материалы в рамках бюджета. Кухня радует уже второй год, никаких нареканий.',
      author: {
        name: 'Елена Козлова',
        title: 'Учитель',
        avatar: 'Е'
      }
    },
    {
      id: 4,
      rating: 5,
      text: 'Профессиональный подход на всех этапах. От консультации до установки - все четко и качественно. Кухня превзошла ожидания!',
      author: {
        name: 'Дмитрий Волков',
        title: 'Предприниматель',
        avatar: 'Д'
      }
    }
  ];

  return (
    <TestimonialsContainer>
      <Container>
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Отзывы клиентов
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Что говорят о нас наши довольные клиенты
          </SectionSubtitle>
        </SectionHeader>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <QuoteIcon>
                <FiMessageSquare />
              </QuoteIcon>
              
              <Rating>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i}>
                    <FiStar />
                  </Star>
                ))}
              </Rating>
              
              <TestimonialText>
                "{testimonial.text}"
              </TestimonialText>
              
              <Author>
                <AuthorAvatar>
                  {testimonial.author.avatar}
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>{testimonial.author.name}</AuthorName>
                  <AuthorTitle>{testimonial.author.title}</AuthorTitle>
                </AuthorInfo>
              </Author>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsContainer>
  );
};

export default Testimonials;

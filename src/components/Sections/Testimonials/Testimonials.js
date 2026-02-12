import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const TestimonialsContainer = styled.section`
  padding: ${props => props.theme.spacing['5xl']} 0;
  background: ${props => props.theme.colors.light};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const Overline = styled(motion.div)`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${props => props.theme.colors.gray};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary};
  font-weight: 400;
  letter-spacing: -0.02em;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing['2xl']};
  border: 1px solid ${props => props.theme.colors.border};
  transition: ${props => props.theme.transitions.normal};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Rating = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Star = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const TestimonialText = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes.xl};
  line-height: 1.6;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: 400;
  font-style: italic;
`;

const Divider = styled.div`
  width: 40px;
  height: 1px;
  background: ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const AuthorAvatar = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 400;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.sm};
  letter-spacing: 0.02em;
`;

const AuthorTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.gray};
  letter-spacing: 0.02em;
`;

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: 'Очень довольна результатом! Кухня получилась именно такой, как я мечтала. Качество материалов отличное, монтаж выполнен профессионально.',
      author: {
        name: 'Анна Петрова',
        title: 'Домохозяйка',
        avatar: 'А'
      }
    },
    {
      id: 2,
      rating: 5,
      text: 'Заказывали кухню для нового дома. Дизайнер учла все наши пожелания, предложила отличные решения. Сроки соблюдены, цена адекватная.',
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
      text: 'Профессиональный подход на всех этапах. От консультации до установки — всё чётко и качественно. Кухня превзошла ожидания!',
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
          <Overline
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Отзывы
          </Overline>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Что говорят наши клиенты
          </SectionTitle>
        </SectionHeader>

        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Rating>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i}>
                    <FiStar fill="currentColor" />
                  </Star>
                ))}
              </Rating>
              
              <TestimonialText>
                &laquo;{testimonial.text}&raquo;
              </TestimonialText>

              <Divider />
              
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

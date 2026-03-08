import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { FiLock } from 'react-icons/fi';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.colors.light};
  padding: 24px;
`;

const Card = styled.form`
  width: 100%;
  max-width: 380px;
  background: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.border};
  border-radius: 12px;
  padding: 40px 32px;
  text-align: center;
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
`;

const Title = styled.h1`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes['2xl']};
  font-weight: 400;
  margin: 0 0 8px;
`;

const Subtitle = styled.p`
  color: ${(p) => p.theme.colors.gray};
  font-size: ${(p) => p.theme.fontSizes.sm};
  margin: 0 0 28px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${(p) => (p.$error ? '#c00' : p.theme.colors.border)};
  border-radius: 6px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-family: inherit;
  box-sizing: border-box;
  text-align: center;
  letter-spacing: 0.1em;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(p) => (p.$error ? '#c00' : p.theme.colors.primary)};
  }
`;

const ErrorMsg = styled.div`
  color: #c00;
  font-size: ${(p) => p.theme.fontSizes.xs};
  margin-top: 8px;
  min-height: 18px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.primary};
  border-radius: 6px;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: transparent;
    color: ${(p) => p.theme.colors.primary};
  }
`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Введите пароль');
      return;
    }
    if (login(password)) {
      navigate('/admin', { replace: true });
    } else {
      setError('Неверный пароль');
      setPassword('');
    }
  };

  return (
    <Page>
      <Card onSubmit={handleSubmit}>
        <IconWrap>
          <FiLock size={24} />
        </IconWrap>
        <Title>Вход в панель администрирования</Title>
        <Subtitle>Введите пароль администратора</Subtitle>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          placeholder="Пароль"
          $error={!!error}
          autoFocus
        />
        <ErrorMsg>{error}</ErrorMsg>
        <Button type="submit">Войти</Button>
      </Card>
    </Page>
  );
};

export default AdminLogin;

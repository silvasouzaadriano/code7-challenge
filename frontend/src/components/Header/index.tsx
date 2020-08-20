import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import logoImg from '../../assets/logo.jpg';

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <div>
          <img src={logoImg} alt="Gerenciador de Dividas" />
          <h1>MyBooks</h1>
        </div>
      </Link>
    </Container>
  );
};

export default Header;

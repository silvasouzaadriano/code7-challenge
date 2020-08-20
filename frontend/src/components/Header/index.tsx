import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <div>
          <h1>Gerenciador de Dívidas</h1>
        </div>
      </Link>
    </Container>
  );
};

export default Header;

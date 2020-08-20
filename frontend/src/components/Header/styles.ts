import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 65vw;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  h1 {
    font-size: 1.8rem;
    color: #3a3a3a;
    line-height: 3.5rem;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 425px) {
      font-size: 1.4rem;
    }
  }
`;

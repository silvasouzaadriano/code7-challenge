import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 50rem;
  display: flex;
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
    width: 3.25rem;
    height: 3.25rem;
  }

  h1 {
    font-size: 2rem;
    margin-left: 1rem;
    color: #3a3a3a;
    line-height: 3.5rem;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#04d361')};
    }
  }
`;

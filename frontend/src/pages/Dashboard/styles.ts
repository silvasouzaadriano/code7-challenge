import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
  max-width: 65vw;
  display: flex;
  align-items: center;
  margin-top: 3.125rem;

  button {
    width: 7rem;
    height: 2.5rem;
    background: #04d361;
    border-radius: 8px;
    border: 0;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    flex-wrap: wrap;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Container = styled.div`
  max-width: 65vw;
  margin-top: 3.125rem;
  a {
    display: block;
    text-decoration: none;
    transition: transform 0.2s;
    &:hover {
      transform: translateX(0.625rem);
    }
  }
`;

export const Content = styled.div`
  margin-top: 0.625rem;
  display: block;
  overflow: hidden;
  word-break: break-all;
  max-height: 6.25rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.625rem;

  main {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 1.2rem;
      color: #3d3d4d;
      margin-right: 0.625rem;
    }
  }

  aside {
    margin-top: 0.3125rem;
    display: flex;
    justify-content: space-between;

    p {
      align-items: left;
      font-size: 1.2rem;
      color: #a8a8b3;
      margin-top: 0.3125rem;
    }
    svg {
      margin-left: auto;
      /* margin-right: -10px; */
      color: #cdcdb6;
      font-size-adjust: 1.25rem;
    }
  }
`;

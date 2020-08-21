import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
  max-width: 65vw;
  margin-top: 0.9375rem;

  h1 {
    font-size: 1.3rem;

    @media (max-width: 425px) {
      font-size: 1.2rem;
    }
  }
`;

export const Debit = styled.div`
  margin-top: 0.625rem;
  display: block;
  overflow: hidden;
  word-break: break-all;
  max-height: 6.25rem;
  background-color: #fff;
  border-radius: 0.3125rem;
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

    span {
      color: #a8a8b3;
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
    div {
      display: flex;
      flex-direction: row;
      margin-left: 0.625rem;

      button {
        background-color: #04d361;
        font-size: 0.625rem;
        font-weight: bold;
        width: 4rem;
        height: 1.5rem;
        text-align: center;
        margin-left: 0.3125rem;

        transition: background-color 0.2s;

        &:hover {
          background: ${shade(0.2, '#04d361')};
        }
      }
    }
  }
`;

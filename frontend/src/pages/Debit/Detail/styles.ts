import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
  max-width: 65rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.124rem;

  h1 {
    font-size: 1.5rem;

    @media (max-width: 425px) {
      font-size: 1.2rem;
    }
  }

  a {
    display: flex;
    align-items: center;

    color: #3a3a3a;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#04d361')};
    }

    @media (max-width: 425px) {
      font-size: 0.8rem;
      margin-right: 0rem;
    }
  }

  svg {
    margin-right: 1rem;
    color: #04d361;
  }
`;

export const DebitContainer = styled.div`
  margin-top: 1.25rem;
  overflow: hidden;
  word-break: break-all;

  span {
    font-size: 1.3rem;
    font-weight: 700;

    @media (max-width: 425px) {
      font-size: 1.2rem;
    }
  }

  p {
    margin-top: 0.3125rem;
    margin-bottom: 1.24rem;
    font-size: 1.2rem;
    font-weight: 100;

    @media (max-width: 425px) {
      font-size: 1rem;
    }
  }

  .buttons {
    display: flex;
    align-items: center;

    button {
      width: 9rem;
      height: 2.5rem;
      background-color: #04d361;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      margin-right: 0.9375rem;

      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#04d361')};
      }
    }
  }

  .head {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const DebitDetailModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  padding: 1.25rem;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ebf8ff;

  button {
    background-color: #04d361;
    font-size: 0.75rem;
    width: 3.125rem;
    height: 1.25rem;
    font-weight: bold;
    text-align: center;
    margin-left: 0.375rem;
    padding: 0.125rem;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const HeaderDebitList = styled.div`
  max-width: 65vw;
  margin-top: 0.9375rem;

  h1 {
    font-size: 1.3rem;

    @media (max-width: 425px) {
      font-size: 1.2rem;
    }
  }
`;

export const DebitList = styled.div`
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

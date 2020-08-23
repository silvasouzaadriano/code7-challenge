import styled from 'styled-components';
import { shade, lighten } from 'polished';

export const Title = styled.div`
  max-width: 65rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.124rem;

  h1 {
    font-size: 1.5rem;

    @media (max-width: 425px) {
      font-size: 1rem;
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

    @media (max-width: 425px) {
      margin-right: 0.5rem;
    }
  }

  button {
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }
`;

export const Content = styled.div`
  margin-top: 3.124rem;

  select {
    margin-bottom: 0.625rem;
    background: #f5f5f5;
    padding: 1rem;
    width: 100%;
    color: ${lighten(0.5, '#020202')};
    font-weight: 700;
    border: 0;

    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }

    option {
      font-weight: 700;
    }
  }

  input {
    color: ${lighten(0.5, '#020202')};
    font-size: 0.875rem;
    font-weight: 700;
  }

  input[type='date']:not(.has-value):before {
    color: ${lighten(0.5, '#020202')};
    content: attr(placeholder) !important;
    margin-right: 0.5rem;
  }

  input[type='date']:focus:before {
    content: '' !important;
  }

  button {
    background-color: #04d361;
    transition: background-color 0.2s;
    font-size: 1rem;
    font-weight: 700;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

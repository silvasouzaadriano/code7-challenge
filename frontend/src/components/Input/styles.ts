import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrorred: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #F5F5F5;
  border: 0.0626rem solid #BCE0FD;
  padding: 1rem;
  width: 100%;
  color: #BCE0FD;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.625rem;
  }

  svg {
    margin-right: 1rem;
  }

  ${(props) =>
    props.isErrorred &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #020202;
      border: 0.125rem solid #bce0fd;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #020202;
    `}

  input {
    background: transparent;
    color: #020202;
    flex: 1;
    border: 0;

    &::placeholder {
      font-size: 0.875rem;
      color: ${lighten(0.5, '#020202')};
      font-weight: 700;
    }
  }


`;

export const Error = styled(Tooltip)`
  height: 1.25rem;
  margin-left: 1rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f5f5f5;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

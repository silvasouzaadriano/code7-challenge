import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.button`
  background: #020202;
  height: 3.5rem;
  border-radius: 0.625rem;
  border: 0;
  padding: 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #f5f5f5;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background: ${lighten(0.2, '#020202')};
  }
`;

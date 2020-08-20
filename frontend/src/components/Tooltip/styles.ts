import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    background: #bce0fd;
    color: #020202;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.865rem;
    font-weight: 500;
    width: 11.25rem;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 0.75rem);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      border-style: solid;
      border-color: #bce0fd transparent;
      border-width: 6px 6px 0 0.375rem;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

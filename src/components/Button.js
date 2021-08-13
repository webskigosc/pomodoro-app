import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  --primary-color: hsl(35, 34%, 67%);
  --green-color: hsl(90, 57%, 51%);
  --red-color: hsl(2, 77%, 58%);

  display: inline-block;
  background: transparent;
  border-style: solid;
  border-width: 2px;
  padding: 6px;
  transition: opacity 300ms ease-in-out;
  margin: 6px;
  color: var(--primary-color);
  border-color: var(--primary-color);

  &:not(:disabled):hover {
    cursor: pointer;
    opacity: 0.6;
  }

  &:disabled {
    color: var(--primary-color);
    border-color: var(--primary-color);
    border-width: 1px;
    font-weight: 300;
    opacity: 0.2;
  }

  svg {
    fill: currentColor;
  }

  ${(props) =>
    props.rounded &&
    css`
      border-radius: 50%;
    `}

  ${(props) =>
    props.size === 'sm' &&
    css`
      height: 32px;
      width: 32px;
      padding: 6px;
      font-size: 16px;
    `}

  ${(props) =>
    props.size === 'md' &&
    css`
      height: 48px;
      width: 48px;
      padding: 10px;
      font-size: 18px;
    `}

   ${(props) =>
    props.size === 'xl' &&
    css`
      height: 64px;
      width: 64px;
      padding: 12px;
      font-size: 22px;
    `}

    ${(props) =>
    props.color === 'green' &&
    css`
      color: var(--green-color);
      border-color: var(--green-color);
    `}

    ${(props) =>
    props.color === 'red' &&
    css`
      color: var(--red-color);
      border-color: var(--red-color);
    `}
`;

function Button({ children, onClick, disabled, color, size = 'md' }) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      rounded
      color={color}
      size={size}
    >
      {children}
    </StyledButton>
  );
}

export default Button;

import styled, { css, keyframes } from "styled-components";

const loadingAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
}
`;

export const Loader = styled.div`
  border: 3px solid hsla(185, 100%, 62%, 0.2);
  border-top-color: #3cefff;
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation-name: ${loadingAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export const StyledLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
`;

export const StyledButton = styled.button<{
  size: "small" | "normal";
  mr?: number;
  ml?: number;
}>`
  margin-left: 10px;
  padding: ${(props) => (props.size === "small" ? "0.5rem" : "1.5rem")};
  width: ${(props) => (props.size === "small" ? "5rem" : "20rem")};
  background: var(--secondary-color);
  color: #ffffff;
  border-radius: 6px;
  font-size: ${(props) => (props.size === "small" ? "1rem" : "1.5rem")};
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
  ${(props) =>
    props.ml &&
    css`
      margin-left: ${props.ml}rem;
    `}
  &:hover {
    background: var(--secondary-color);
  }
`;

export const StyledText = styled.p<{
  color: string;
}>`
  font-size: 1.4rem;
  color: ${(props) => props.color};
`;

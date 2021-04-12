import styled, { keyframes } from "styled-components";

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

export const StyledButton = styled.button`
  margin-left: 10px;
  padding: 1.5rem;
  width: 20rem;
  background: var(--secondary-color);
  color: #ffffff;
  border-radius: 6px;
  font-size: 1.5rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.23s;
  &:hover {
    background: var(--secondary-color);
  }
`;

export const StyledText = styled.p`
  font-size: 1.4rem;
`;

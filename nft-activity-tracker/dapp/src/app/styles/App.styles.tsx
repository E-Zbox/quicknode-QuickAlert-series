import styled from "styled-components";

export const MainApp = styled.main`
  --padding: calc(var(--ten-px) * 1.4);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding);
`;

export const AppContainer = styled.div`
  --margin: calc(var(--ten-px) * 1.4);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: stretch;
  margin-top: var(--margin);
`;

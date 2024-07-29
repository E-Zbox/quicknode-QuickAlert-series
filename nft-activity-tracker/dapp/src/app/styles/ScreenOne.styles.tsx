import styled from "styled-components";

export const MainScreenOne = styled.main`
  position: relative;
  height: 100%;
  flex-grow: 1;
  display: grid;
  grid-template-rows: 1fr;
  overflow: hidden;
  border-radius: 10px;
  ${({
    theme: {
      color: { black01, blue03 },
    },
  }) => `
        background-color: ${blue03}98;

        &::before {
            content: "";
            left: 0px;
            top: 0px;
            position: absolute;
            height: 100%;
            width: 100%;
            background-color: ${black01}9c;
            z-index: -1;
        }
    `}
`;

export const TransactionTable = styled.main`
  height: 82.5vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
`;

export const TransactionContainer = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({
    theme: {
      color: { blue02 },
    },
  }) => `${blue02}15`};
`;

export const MainTxHeader = styled.main`
  height: 60px;
  width: 100%;
  display: grid;
  grid-template-columns: 50px 0.5fr 0.5fr 150px;
  padding: 0px calc(var(--ten-px) * 2);
  grid-template-rows: 1fr;
  background-color: ${({
    theme: {
      color: { blue01 },
    },
  }) => `${blue01}25`};
`;

export const TxHeader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const TxHeaderTitle = styled.h4`
  font-family: "Source Sans Pro";
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
`;

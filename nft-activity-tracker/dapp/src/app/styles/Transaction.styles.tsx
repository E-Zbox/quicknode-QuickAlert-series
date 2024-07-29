import styled from "styled-components";

interface ITransaction {
  $compactView: boolean;
}

interface IGridText {
  $shrinkText: boolean;
}

export const MainTransaction = styled.main<ITransaction>`
  width: 100%;
  ${({ $compactView }) =>
    $compactView
      ? `
        height: 60px;
        display: grid;
        grid-template-columns: 50px 0.5fr 0.5fr 150px;
        place-content: center;
        padding: 0px var(--ten-px);
        border-bottom: 1px solid #ddd2;
    `
      : `
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: var(--ten-px);
      background-color: #0004;
      `}
`;

export const ToggleIcon = styled.main<ITransaction>`
  --size: 30px;
  height: var(--size);
  width: var(--size);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({
    theme: {
      color: { red01 },
    },
  }) => `${red01}70`};
  border-radius: 5px;

  div {
    --size: 13px;
    height: 2px;
    width: var(--size);
    opacity: 0.68;
    scale: 0.87;
    background-color: ${({
      theme: {
        color: { purple01 },
      },
    }) => purple01};

    ${({ $compactView }) =>
      $compactView
        ? `
        &:nth-of-type(1) {
            rotate: -45deg;
            transform: translate(2px, 4px);
        }

        &:nth-of-type(2) {
            rotate: 45deg;
            transform: translate(-4px, 2px);
        }
    `
        : `
        &:nth-of-type(1) {
            rotate: 45deg;
            transform: translate(5px, -5px);
            transform: translate(5px, -3px);
        }

        &:nth-of-type(2) {
            rotate: -45deg;
            transform: translate(0px, -2px);
            transform: translate(-1px, -4px);
        }
    `}
  }
`;

export const GridText = styled.h4<IGridText>`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Source Sans Pro";
  font-size: ${({ $shrinkText }) => ($shrinkText ? `0.9rem` : `1.2rem`)};
  font-weight: bold;
`;

export const VerboseTitle = styled.h4`
  font-family: "Open Sans";
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({
    theme: {
      color: { blue01 },
    },
  }) => blue01};
  margin-left: calc(var(--ten-px) * 1.5);
`;

export const VerboseRow = styled.div`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 60px;
  margin-bottom: calc(var(--ten-px));
  padding-bottom: calc(var(--ten-px));
  padding-left: calc(var(--ten-px) * 2);
  border-bottom: 1px solid #ddd3;

  &:last-child {
    margin-bottom: none;
  }
`;

export const VerboseRowField = styled.h4`
  font-size: 0.95rem;
  opacity: 0.678;
`;

export const VerboseRowValue = styled.h4`
  font-size: 1.295rem;
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HexToDecimal = styled.div`
  font-size: 0.95rem;
  width: fit-content;
  background-color: ${({
    theme: {
      color: { red01 },
    },
  }) => red01};
  cursor: pointer;
  border-radius: 5px;
  margin-left: calc(var(--seven-px) * 2);
  padding: var(--three-px) calc(var(--three-px) * 2);
`;

export const EthereumIcon = styled.img`
  --size: 16px;
  height: var(--size);
  width: var(--size);
  margin-right: var(--ten-px);
`;

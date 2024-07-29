import styled from "styled-components";

interface IToggle {
  $selected: boolean;
}

export const MainSelectedAddress = styled.main`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 0px var(--seven-px);
  margin-bottom: 3px;
  cursor: pointer;
  ${({
    theme: {
      color: { black01, blue01 },
    },
  }) => `
        background-color: ${blue01}30;
        box-shadow: 1px -1px 5px ${blue01}15 inset;
    `}
`;

export const AddressText = styled.h4`
  font-family: "Nunito Sans";
  font-size: 0.87rem;
  font-weight: 400;
`;

export const MainToggle = styled.main<IToggle>`
  --height: 20px;
  --padding: var(--three-px);
  position: relative;
  height: var(--height);
  width: calc(var(--height) * 1.7);
  border-radius: 30px;
  padding: var(--padding);

  & > div {
    --size: calc(var(--height) - calc(var(--padding) * 2));
    position: absolute;
    top: 50%;
    height: var(--size);
    width: var(--size);
    border-radius: 30px;
    transform: translateY(-50%);
  }

  ${({
    $selected,
    theme: {
      color: { blue01, purple01 },
    },
  }) =>
    $selected
      ? `
      background-color: ${blue01};

    & > div {
        right: calc(var(--padding));
        background-color: #fff;
    }
  `
      : `
      background-color: #9a9b9a;

    & > div {
        left: calc(var(--padding));
        background-color: #fff;
    }
`}
`;

export const ToggleCircle = styled.div``;

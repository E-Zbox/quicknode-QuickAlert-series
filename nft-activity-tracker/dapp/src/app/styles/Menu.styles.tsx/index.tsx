import styled from "styled-components";

interface IMainMenu {
  $showMenu: boolean;
}

export const MainMenu = styled.main<IMainMenu>`
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 4px;
  overflow: hidden;
  ${({
    $showMenu,
    theme: {
      color: { black01 },
    },
  }) =>
    $showMenu
      ? `
        width: 300px;
        padding: calc(var(--ten-px) * 3) calc(var(--ten-px) * 2);
        margin-right: calc(var(--ten-px) * 2);
        background: linear-gradient(to right, ${black01}C8, ${black01}C8);
    `
      : `
        width: 1px;
        background: linear-gradient(to right, ${black01}98, ${black01}48);

        * {
            opacity: 0;
            visibility: none;
        }
    `}

  & > * {
    margin-bottom: 20px;
  }
`;

export const MenuTitle = styled.h4`
  font-family: "Nunito Sans";
  font-size: 1.4rem;
  font-weight: 500;
  width: 100%;
  text-align: left;
  color: ${({
    theme: {
      color: { purple01 },
    },
  }) => purple01};
`;

export const MainSearch = styled.div`
  position: relative;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px var(--seven-px);

  &::after {
    content: "";
    left: 0px;
    bottom: 0px;
    position: absolute;
    height: 1px;
    width: 100%;
    border-radius: 10px;
    background-color: ${({
      theme: {
        color: { purple01 },
      },
    }) => `${purple01}84`};
  }
`;

export const SearchLogo = styled.img`
  --size: 21px;
  height: var(--size);
  width: var(--size);
  opacity: 0.58;
`;

export const SearchInput = styled.input`
  height: 32px;
  width: 100%;
  outline: none;
  background: none;
  border: none;
  font-size: 1.1rem;
  margin-left: var(--seven-px);

  ${({
    theme: {
      color: { purple01 },
    },
  }) => `
    color: ${purple01};

  &::placeholder {
    font-size: 1rem;
    color: ${purple01}64;
  }
  `}
`;

import styled from "styled-components";

interface IMenuButton {
  $showMenu: boolean;
}

export const MainNav = styled.main`
  position: relative;
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: var(--margin);
  padding-left: calc(var(--ten-px) * 2);
  border-radius: 4px;
  ${({
    theme: {
      color: { black01, purple01 },
    },
  }) => `
    box-shadow: 0px 0px 5px ${purple01}34;
    background-color: ${black01}c5;
    `}
  background: none;
  box-shadow: none;
  border-radius: 0px;
`;

export const Logo = styled.img`
  position: absolute;
  height: 80%;
  width: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const MenuButton = styled.div<IMenuButton>`
  --size: 50px;
  height: var(--size);
  width: var(--size);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: var(--seven-px);
  scale: 0.95;
  ${({
    $showMenu,
    theme: {
      color: { purple01, red01 },
    },
  }) => `
  background-color: ${$showMenu ? `${red01}56` : `${red01}26`};
    div {
        height: 2px;
        width: 100%;
        border-radius: 10px;
        background-color: ${purple01};

        ${
          !$showMenu
            ? ``
            : `
            &:nth-of-type(1) {
                background-color: ${red01};
                rotate: 45deg;
                transform: translate(7px, 7px);
            }
            
            &:nth-of-type(2) {
                opacity: 0.02;
            }

            &:nth-of-type(3) {
                background-color: ${red01};
                rotate: -45deg;
                transform: translate(4px, -7px);
            }
        `
        }
    }
  `}

  &:hover {
    scale: 1;
  }

  &:active {
    scale: 0.98;
  }
`;

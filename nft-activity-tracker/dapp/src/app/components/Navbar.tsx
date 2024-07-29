"use strict";
import React from "react";
// store
import { useAppStore } from "@/store";
// styles
import { Logo, MainNav, MenuButton } from "../styles/Navbar.styles";
// utils
import { screens } from "@/utils/data";

const Navbar = () => {
  const { showMenu, toggleShowMenu } = useAppStore(
    ({ showMenu, toggleShowMenu }) => ({ showMenu, toggleShowMenu })
  );

  const {
    default: {
      assets: { appLogo },
    },
  } = screens;

  return (
    <MainNav>
      <MenuButton $showMenu={showMenu} onClick={toggleShowMenu}>
        <div></div>
        <div></div>
        <div></div>
      </MenuButton>
      <Logo src={appLogo.src} />
    </MainNav>
  );
};

export default Navbar;

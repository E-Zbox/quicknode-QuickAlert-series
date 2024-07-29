"use strict";
// components
import SelectedAddress from "./SelectedAddress";
// store
import { useAppStore } from "@/store";
// styles
import {
  MainMenu,
  MainSearch,
  MenuTitle,
  SearchInput,
  SearchLogo,
} from "../../styles/Menu.styles.tsx";
// utils
import { screens } from "@/utils/data";
import {
  FlexContainer,
  ScrollerContainer,
} from "../../styles/shared/Container.styles";

const Menu = () => {
  const {
    default: {
      assets: { searchIcon },
    },
  } = screens;

  const { menuItems, showMenu } = useAppStore(({ menuItems, showMenu }) => ({
    menuItems,
    showMenu,
  }));

  return (
    <MainMenu $showMenu={showMenu}>
      <MenuTitle>Alert Subscription</MenuTitle>
      <MainSearch>
        <SearchLogo src={searchIcon.src} />
        <SearchInput placeholder="Filter address subscriptions..." />
      </MainSearch>
      <ScrollerContainer
        $bgColor="#4442"
        $height={"55vh"}
        $overflow="scroll"
        $miscellaneous="box-sizing: border-box;"
      >
        <FlexContainer $flexWrap="wrap">
          {menuItems.map(({ selected, title }, key) => (
            <SelectedAddress key={key} selected={selected} title={title} />
          ))}
        </FlexContainer>
      </ScrollerContainer>
    </MainMenu>
  );
};

export default Menu;

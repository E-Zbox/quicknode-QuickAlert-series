"use strict";
import { ChangeEvent, useEffect, useState } from "react";
// components
import SelectedAddress from "./SelectedAddress";
// store
import { useAppStore, useTransactionStore } from "@/store";
// styles
import { Loader } from "@/app/styles/Loader.styles";
import {
  MainMenu,
  MainSearch,
  MenuTitle,
  SearchInput,
  SearchLogo,
} from "../../styles/Menu.styles.tsx";
import {
  FlexContainer,
  ScrollerContainer,
} from "../../styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

const Menu = () => {
  const {
    default: {
      assets: { loaderGif, searchIcon },
    },
  } = screens;

  const { menuItems, showMenu } = useAppStore(({ menuItems, showMenu }) => ({
    menuItems,
    showMenu,
  }));

  const { loading, searchQuery, setSearchQuery } = useTransactionStore(
    ({ loading, searchQuery, setSearchQuery }) => ({
      loading,
      searchQuery,
      setSearchQuery,
    })
  );

  const [formState, setFormState] = useState({ input_search: "" });

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (loading && searchQuery == formState.input_search) {
      return;
    }

    setFormState({ input_search: value });
  };

  const handleSubmit = () => {
    const { input_search: searchText } = formState;

    if (searchText.length == 0 || loading) {
      return;
    }

    const regex = /^0x[a-fA-F0-9]{40}$/;

    if (!regex.test(searchText)) {
      alert(`"${searchText}" is not a valid Ethereum wallet address!`);
      return;
    }

    setSearchQuery(searchText);
  };

  return (
    <MainMenu $showMenu={showMenu}>
      <MenuTitle>Alert Subscription</MenuTitle>
      <MainSearch>
        {loading && searchQuery === formState.input_search ? (
          <Loader src={loaderGif.src} $size="40px" />
        ) : (
          <SearchLogo src={searchIcon.src} onClick={handleSubmit} />
        )}
        <SearchInput
          id="input_search"
          name="input_search"
          placeholder="Filter address subscriptions..."
          value={formState.input_search}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
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

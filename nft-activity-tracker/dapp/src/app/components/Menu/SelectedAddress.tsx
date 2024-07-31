"use client";
import React from "react";
// store
import { useAppStore, useTransactionStore } from "@/store";
// styles
import {
  AddressText,
  MainSelectedAddress,
  MainToggle,
  ToggleCircle,
} from "@/app/styles/Menu.styles.tsx/SelectedAddress";
import { Loader } from "@/app/styles/Loader.styles";
// utils
import { screens } from "@/utils/data";

interface ISelectedAddressProps {
  selected: boolean;
  title: string;
}

const SelectedAddress = ({ selected, title }: ISelectedAddressProps) => {
  const { toggleMenuItemSelectedField } = useAppStore(
    ({ toggleMenuItemSelectedField }) => ({ toggleMenuItemSelectedField })
  );

  const { loading, setLoading, searchQuery, setSearchQuery } =
    useTransactionStore(
      ({ loading, setLoading, searchQuery, setSearchQuery }) => ({
        loading,
        setLoading,
        searchQuery,
        setSearchQuery,
      })
    );

  const {
    default: {
      assets: { loaderGif },
    },
  } = screens;

  const handleClick = () => {
    if (selected) return;

    setSearchQuery(title);

    // toggleMenuItemSelectedField(title);
  };

  const displayText = title.toUpperCase();
  return (
    <MainSelectedAddress title={displayText}>
      <AddressText>{displayText.substring(0, 20)}...</AddressText>
      {loading && searchQuery === title ? (
        <Loader src={loaderGif.src} $size="40px" />
      ) : (
        <MainToggle $selected={selected} onClick={handleClick}>
          <ToggleCircle />
        </MainToggle>
      )}
    </MainSelectedAddress>
  );
};

export default SelectedAddress;

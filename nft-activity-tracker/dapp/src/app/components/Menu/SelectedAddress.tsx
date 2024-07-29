"use client";
import React from "react";
// store
import { useAppStore } from "@/store";
// styles
import {
  AddressText,
  MainSelectedAddress,
  MainToggle,
  ToggleCircle,
} from "@/app/styles/Menu.styles.tsx/SelectedAddress";

interface ISelectedAddressProps {
  selected: boolean;
  title: string;
}

const SelectedAddress = ({ selected, title }: ISelectedAddressProps) => {
  const { toggleMenuItemSelectedField } = useAppStore(
    ({ toggleMenuItemSelectedField }) => ({ toggleMenuItemSelectedField })
  );
  const handleClick = () => {
    if (selected) return;

    toggleMenuItemSelectedField(title);
  };

  const displayText = title.toUpperCase();
  return (
    <MainSelectedAddress title={displayText}>
      <AddressText>{displayText.substring(0, 20)}...</AddressText>
      <MainToggle $selected={selected} onClick={handleClick}>
        <ToggleCircle />
      </MainToggle>
    </MainSelectedAddress>
  );
};

export default SelectedAddress;

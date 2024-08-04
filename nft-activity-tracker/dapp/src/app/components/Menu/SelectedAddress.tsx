"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// store
import { useAppStore, useTransactionStore } from "@/store";
// styles
import {
  AddressText,
  CopyIcon,
  MainSelectedAddress,
  MainToggle,
  ToggleCircle,
} from "@/app/styles/Menu.styles.tsx/SelectedAddress";
import { Loader } from "@/app/styles/Loader.styles";
// utils
import { screens } from "@/utils/data";
import { FlexContainer } from "@/app/styles/shared/Container.styles";

interface ISelectedAddressProps {
  selected: boolean;
  title: string;
}

const SelectedAddress = ({ selected, title }: ISelectedAddressProps) => {
  const { toggleMenuItemSelectedField } = useAppStore(
    ({ toggleMenuItemSelectedField }) => ({ toggleMenuItemSelectedField })
  );

  const [justCopiedState, setJustCopiedState] = useState(false);

  const { loading, searchQuery, setSearchQuery } = useTransactionStore(
    ({ loading, setLoading, searchQuery, setSearchQuery }) => ({
      loading,
      setLoading,
      searchQuery,
      setSearchQuery,
    })
  );

  const {
    default: {
      assets: { copyIcon, loaderGif, tickIcon },
    },
  } = screens;

  const handleCopyClick = () => {
    if (justCopiedState) return;

    const type = "text/plain";

    const blob = new Blob([title], { type });

    const data = new ClipboardItem({ [type]: blob });

    navigator.clipboard.write([data]).then((res) => {
      setJustCopiedState(true);
    });
  };

  const handleToggleClick = () => {
    if (selected) return;

    setSearchQuery(title);
  };

  useEffect(() => {
    if (justCopiedState) {
      setTimeout(() => {
        setJustCopiedState(false);
      }, 2000);
    }
  }, [justCopiedState]);

  const displayText = title.toUpperCase();

  return (
    <MainSelectedAddress title={displayText}>
      <FlexContainer
        $flexDirection="row"
        $alignItems="center"
        $width="fit-content"
      >
        <AddressText>{displayText.substring(0, 20)}...</AddressText>
        <CopyIcon
          src={justCopiedState ? tickIcon.src : copyIcon.src}
          $interactable={!justCopiedState}
          onClick={handleCopyClick}
        />
      </FlexContainer>
      {loading && searchQuery === title ? (
        <Loader src={loaderGif.src} $size="40px" />
      ) : (
        <MainToggle $selected={selected} onClick={handleToggleClick}>
          <ToggleCircle />
        </MainToggle>
      )}
    </MainSelectedAddress>
  );
};

export default SelectedAddress;

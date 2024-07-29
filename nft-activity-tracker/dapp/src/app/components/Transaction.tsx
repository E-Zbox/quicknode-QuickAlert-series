"use strict";
import { useEffect, useState } from "react";
// store
import { ITransaction, useAppStore } from "@/store";
// styles
import {
  EthereumIcon,
  GridText,
  HexToDecimal,
  MainTransaction,
  ToggleIcon,
  VerboseRow,
  VerboseRowField,
  VerboseRowValue,
  VerboseTitle,
} from "../styles/Transaction.styles";
import { FlexContainer } from "../styles/shared/Container.styles";
// utils
import { screens } from "@/utils/data";

const Transaction = ({
  blockHash,
  blockNumber: _blockNumber,
  from,
  gas: _gas,
  gasPrice,
  to,
  value,
}: ITransaction) => {
  const [compactView, setCompactView] = useState(true);
  const [blockNumberIsDecimal, setBlockNumberIsDecimal] = useState(false);
  const [gasIsDecimal, setGasIsDecimal] = useState(false);

  const { showMenu } = useAppStore(({ showMenu }) => ({ showMenu }));

  const {
    default: {
      assets: { ethereumIcon },
    },
  } = screens;

  if (compactView) {
    return (
      <MainTransaction
        $compactView={true}
        onClick={() => setCompactView((prevState) => !prevState)}
      >
        <ToggleIcon $compactView={compactView}>
          <div></div>
          <div></div>
        </ToggleIcon>
        <GridText $shrinkText={showMenu}>{from}</GridText>
        <GridText $shrinkText={showMenu}>{to}</GridText>
        <GridText $shrinkText={showMenu}>{_blockNumber}</GridText>
      </MainTransaction>
    );
  }

  const blockNumber = blockNumberIsDecimal
    ? Number(_blockNumber)
    : _blockNumber;
  const gas = gasIsDecimal ? Number(_gas) : _gas;

  return (
    <MainTransaction $compactView={compactView}>
      <FlexContainer $flexDirection="row" $miscellaneous="margin-bottom: 30px;">
        <ToggleIcon
          $compactView={compactView}
          onClick={() => setCompactView((prevState) => !prevState)}
        >
          <div></div>
          <div></div>
        </ToggleIcon>
        <VerboseTitle>Detailed Tx</VerboseTitle>
      </FlexContainer>
      <VerboseRow>
        <VerboseRowField>Block Hash</VerboseRowField>
        <VerboseRowValue>{blockHash}</VerboseRowValue>
      </VerboseRow>
      <VerboseRow>
        <VerboseRowField>Block Number</VerboseRowField>
        <VerboseRowValue>
          {blockNumber}
          <HexToDecimal
            onClick={() => setBlockNumberIsDecimal((prevState) => !prevState)}
          >
            {blockNumberIsDecimal ? "hex" : "dec"}
          </HexToDecimal>
        </VerboseRowValue>
      </VerboseRow>
      <VerboseRow>
        <VerboseRowField>From</VerboseRowField>
        <VerboseRowValue>{from}</VerboseRowValue>
      </VerboseRow>
      <VerboseRow>
        <VerboseRowField>Gas</VerboseRowField>
        <VerboseRowValue>
          {gas}
          <HexToDecimal
            onClick={() => setGasIsDecimal((prevState) => !prevState)}
          >
            {gasIsDecimal ? "hex" : "dec"}
          </HexToDecimal>
        </VerboseRowValue>
      </VerboseRow>
      <VerboseRow>
        <VerboseRowField>Value</VerboseRowField>
        <VerboseRowValue>
          <EthereumIcon src={ethereumIcon.src} />
          {Number(value)} ETH
        </VerboseRowValue>
      </VerboseRow>
    </MainTransaction>
  );
};

export default Transaction;

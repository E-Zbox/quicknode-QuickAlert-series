"use strict";
// store
import { useTransactionStore } from "@/store";
// styles
import {
  MainScreenOne,
  MainTxHeader,
  TransactionContainer,
  TransactionTable,
  TxHeader,
  TxHeaderTitle,
} from "../styles/ScreenOne.styles";
import Transaction from "../components/Transaction";

const ScreenOne = () => {
  const { selectedAddress, txState } = useTransactionStore(
    ({ selectedAddress, txState }) => ({ selectedAddress, txState })
  );
  return (
    <MainScreenOne>
      <TransactionTable>
        <TransactionContainer>
          <MainTxHeader>
            <TxHeader>
              <TxHeaderTitle>#</TxHeaderTitle>
            </TxHeader>
            <TxHeader>
              <TxHeaderTitle>From</TxHeaderTitle>
            </TxHeader>
            <TxHeader>
              <TxHeaderTitle>To</TxHeaderTitle>
            </TxHeader>
            <TxHeader>
              <TxHeaderTitle>Block Number</TxHeaderTitle>
            </TxHeader>
          </MainTxHeader>
          {txState[selectedAddress]?.map((item, key) => (
            <Transaction key={key} {...item} />
          ))}
        </TransactionContainer>
      </TransactionTable>
    </MainScreenOne>
  );
};

export default ScreenOne;

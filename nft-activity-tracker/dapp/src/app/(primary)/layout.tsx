"use client";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { io } from "socket.io-client";
// components
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
// socket
import {
  getNotificationExpression,
  isAlive,
  onEvents,
  updateNotificationExpression,
} from "@/api";
// store
import { useAppStore, useTransactionStore } from "@/store";
// styles
import { AppContainer, MainApp } from "../styles/App.styles";
// utils
import { IMenuItem } from "@/utils/menu";

const NEXT_PUBLIC_WEBHOOK_ENDPOINT = process.env.NEXT_PUBLIC_WEBHOOK_ENDPOINT;

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    menuItems,
    setMenuItems,
    socket,
    setSocket,
    socketConnected,
    setSocketConnected,
    toggleMenuItemSelectedField,
  } = useAppStore(
    ({
      menuItems,
      setMenuItems,
      socket,
      setSocket,
      socketConnected,
      setSocketConnected,
      toggleMenuItemSelectedField,
    }) => ({
      menuItems,
      setMenuItems,
      socket,
      setSocket,
      socketConnected,
      setSocketConnected,
      toggleMenuItemSelectedField,
    })
  );

  const { searchQuery, setSearchQuery, setLoading, setTxState, updateTxState } =
    useTransactionStore(
      ({
        searchQuery,
        setSearchQuery,
        setLoading,
        setTxState,
        updateTxState,
      }) => ({
        searchQuery,
        setSearchQuery,
        setLoading,
        setTxState,
        updateTxState,
      })
    );

  const menuItemsRef = useRef() as MutableRefObject<IMenuItem[]>;

  const {
    connection_success,
    streams_timestamp,
    transaction_address,
    transaction_success,
    updated_watch_address,
  } = onEvents;

  const transactionAddressListener = (payload: any) => {
    const { data } = payload;
    const selectedMenuItems = menuItemsRef.current.find(
      (item) => item.selected
    )!;

    if (selectedMenuItems) {
      const updatedMenuItems = data.map((title: string) => ({
        selected: title.toLowerCase() === selectedMenuItems.title.toLowerCase(),
        title,
      }));

      setMenuItems(updatedMenuItems);
    }
  };

  const transactionSuccessListener = (payload: any) => {
    updateTxState(payload);
  };

  useEffect(() => {
    // initial load

    getNotificationExpression().then((res) => {
      const { data, error, success } = res;

      if (!success) {
        console.log(error);
        return;
      }

      let splittedExpression = data.split(" == ");

      const title = splittedExpression[
        splittedExpression.length - 1
      ].replaceAll("'", "");

      setMenuItems([
        {
          selected: true,
          title,
        },
      ]);
    });

    isAlive().then((res) => console.log(res));
  }, []);

  useEffect(() => {
    // establish socket connection
    if (!NEXT_PUBLIC_WEBHOOK_ENDPOINT) {
      throw new Error(`Missing 'NEXT_PUBLIC_WEBHOOK_ENDPOINT' in environment`);
    }

    if (menuItems.length == 1 && !socketConnected) {
      setSocket(
        io(NEXT_PUBLIC_WEBHOOK_ENDPOINT, {
          autoConnect: true,
          path: "/socket.io/v1",
          reconnectionDelayMax: 10000,
        })
      );
    }

    menuItemsRef.current = menuItems;
  }, [menuItems]);

  useEffect(() => {
    function onConnect() {
      setSocketConnected(true);

      socket.on(connection_success, (payload) => {
        console.log(payload);
      });

      socket.on(transaction_success, transactionSuccessListener);

      socket.on(transaction_address, transactionAddressListener);

      socket.on(updated_watch_address, (payload) => {
        setMenuItems([{ title: payload, selected: true }]);
      });
    }

    function onDisconnect() {
      console.log("socket.on disconnect");
      setSocketConnected(false);
    }

    if (!socketConnected && menuItems.length == 1) {
      socket.on("connect", onConnect);
    }

    socket.on("disconnect", onDisconnect);

    return () => {
      if (socket) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (searchQuery.length == 0) {
      setLoading(false);
      return;
    }

    setLoading(true);

    socket.off(transaction_address, transactionAddressListener);

    socket.off(transaction_success, transactionSuccessListener);

    updateNotificationExpression(searchQuery).then((res) => {
      const { data, error, success } = res;

      if (!success) {
        console.log(error);
        setSearchQuery("");
        return;
      }

      toggleMenuItemSelectedField(searchQuery);

      setSearchQuery("");

      setTxState({ [searchQuery]: [] });

      socket.on(transaction_address, transactionAddressListener);

      socket.on(transaction_success, transactionSuccessListener);
    });
  }, [searchQuery]);

  return (
    <MainApp>
      <Navbar />
      <AppContainer>
        <Menu />
        {children}
      </AppContainer>
    </MainApp>
  );
}

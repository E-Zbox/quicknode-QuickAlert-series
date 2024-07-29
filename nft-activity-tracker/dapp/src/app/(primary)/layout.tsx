"use client";
import React, { useEffect } from "react";
import { Socket, io } from "socket.io-client";
// components
import Navbar from "../components/Navbar";
// socket
import { isAlive, onEvents } from "@/socket";
// store
import { useAppStore, useTransactionStore } from "@/store";
// styles
import { AppContainer, MainApp } from "../styles/App.styles";
import Menu from "../components/Menu";

const NEXT_PUBLIC_SOCKET_ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;

export default function PrimaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { menuItems, setMenuItems, socketConnected, setSocketConnected } =
    useAppStore(
      ({ menuItems, setMenuItems, socketConnected, setSocketConnected }) => ({
        menuItems,
        setMenuItems,
        socketConnected,
        setSocketConnected,
      })
    );

  const { updateTxState } = useTransactionStore(({ updateTxState }) => ({
    updateTxState,
  }));

  useEffect(() => {
    // establish socket connection
    if (!NEXT_PUBLIC_SOCKET_ENDPOINT) {
      throw new Error(`Missing 'NEXT_PUBLIC_SOCKET_ENDPOINT' in environment`);
    }

    isAlive().then((res) => console.log(res));

    const socket = io(NEXT_PUBLIC_SOCKET_ENDPOINT, {
      autoConnect: true,
      path: "/socket.io/v1",
      reconnectionDelayMax: 10000,
    });

    function onConnect() {
      console.log("socket.on connect");
      setSocketConnected(true);

      const {
        connection_success,
        streams_timestamp,
        transaction_success,
        updated_watch_address,
      } = onEvents;

      socket.on(connection_success, (payload) => {
        console.log("payload connection_success");
        console.log(payload);
      });

      socket.on(streams_timestamp, (payload) => {
        console.log("payload streams_timestamp");
        console.log(payload);
      });

      socket.on(transaction_success, (payload) => {
        console.log("payload transaction_success");
        console.log(payload);
        updateTxState(payload);
      });

      socket.on(updated_watch_address, (payload) => {
        const { data } = payload;
        console.log({ data });
        const selectedMenuItems = menuItems.find((item) => item.selected)!;

        const updatedMenuItems = data.map((title: string) => ({
          selected:
            title.toLowerCase() === selectedMenuItems.title.toLowerCase(),
          title,
        }));

        setMenuItems(updatedMenuItems);
      });
    }

    function onDisconnect() {
      console.log("socket.on disconnect");
      setSocketConnected(false);
    }

    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);

    socket.on("disconnect", onDisconnect);

    return () => {
      if (socket) {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    console.log({ socketConnected });
    if (socketConnected) {
      isAlive().then((res) => console.log(res));
    }
  }, [socketConnected]);

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

"use client";
import React from "react";
import Head from "next/head";
import WalletConnect from "../components/WalletConnect";
import TodoList from "../components/TodoList";
import { useWallet } from "../context/WalletContext";

export default function Home() {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Decentralized Todo App</title>
        <meta
          name="description"
          content="A decentralized todo application built with Ethereum"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Decentralized Todo App</h1>
          <p className="text-gray-600">
            Store your tasks on the Ethereum blockchain
          </p>
        </header>

        <WalletConnect />

        {isConnected ? (
          <TodoList />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-lg text-gray-700 mb-4">
              Connect your wallet to access your decentralized todo list
            </p>
            <p className="text-sm text-gray-500">
              Make sure you are connected to the Sepolia testnet
            </p>
          </div>
        )}
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>Blockchain-Powered Todo App &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

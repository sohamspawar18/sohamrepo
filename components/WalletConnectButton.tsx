'use client'

import React, { useEffect, useState } from 'react'

export default function WalletConnectButton({ hasProvider, account, isSepolia, onConnect, onSwitch }: { hasProvider: boolean, account: string | null, isSepolia: boolean, onConnect: () => Promise<void>, onSwitch: () => Promise<void> }) {
  const short = (a: string) => a.slice(0, 6) + '…' + a.slice(-4);
  // Hydration-safe: render a stable placeholder on server and first client paint
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) {
    return <div aria-hidden style={{ width: 140, height: 32 }} />;
  }
  if (!hasProvider) {
    return <a href="https://metamask.io/" target="_blank" rel="noreferrer" style={{ background: '#111827', color: 'white', padding: '6px 10px', borderRadius: 4, textDecoration: 'none' }}>Install Wallet</a>;
  }
  if (!account) {
    return <button onClick={onConnect} style={{ background: '#111827', color: 'white', padding: '6px 10px', borderRadius: 4 }}>Connect Wallet</button>;
  }
  if (account && !isSepolia) {
    return <button onClick={onSwitch} style={{ background: '#7c3aed', color: 'white', padding: '6px 10px', borderRadius: 4 }}>Switch to Sepolia</button>;
  }
  return <div style={{ fontSize: 12, color: '#065f46', fontWeight: 600 }}>Connected: {short(account)}</div>;
}

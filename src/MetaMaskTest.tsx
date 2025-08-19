import { crossTestnet } from '@to-nexus/sdk/react';
import { addMinutes } from 'date-fns';
import { getAddress } from 'ethers';
import { useState } from 'react';
import { generateNonce, SiweMessage } from 'siwe';

const MetaMaskTest = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [siweMessage, setSiweMessage] = useState<SiweMessage | undefined>(
    undefined
  );
  const [signature, setSignature] = useState<string | undefined>(undefined);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // Convert the address to checksum format (EIP-55)
        const checksumAddress = getAddress(accounts[0]);
        setAccount(checksumAddress);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Create authentication message
  const createMessage = () => {
    console.log('account:', account);
    if (!account) {
      alert('Please connect your wallet first');
      return;
    }

    const checksumAddress = getAddress(account);
    const authenticationNonce = {
      address: checksumAddress,
      nonce: generateNonce(),
      expirationTime: addMinutes(new Date(), 10),
      message:
        "I accept the NFT Market's Terms of Service: https://crossnft.io/terms/service",
    };

    const siweMessage = new SiweMessage({
      domain: window.location.hostname,
      address: checksumAddress,
      uri: window.location.origin,
      version: '1',
      chainId: crossTestnet.id,
      nonce: authenticationNonce.nonce,
      statement: authenticationNonce.message,
      expirationTime: new Date(
        authenticationNonce.expirationTime
      ).toISOString(),
    });

    setSiweMessage(siweMessage);
  };

  // Sign message
  const signMessage = async () => {
    if (!siweMessage) {
      alert('Please create a message first');
      return;
    }

    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [siweMessage.prepareMessage(), account],
      });
      setSignature(signature);
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  // Verify message
  const verifyMessage = async () => {
    if (!signature || !siweMessage) {
      alert('Please sign the message first');
      return;
    }

    try {
      const fields = await siweMessage.verify({
        signature: signature,
      });
      console.log('Verification result:', fields);
      alert('Message verified successfully!');
    } catch (error) {
      console.error('Verification error:', error);
      alert('Verification failed!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MetaMask Sign Message Test</h1>

      <div style={{ marginBottom: '20px' }}>
        <div>Account: {account || 'Not connected'}</div>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          Message: {siweMessage?.prepareMessage()}
        </div>
        <div>Signature: {signature}</div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          maxWidth: '200px',
        }}
      >
        <button onClick={connectWallet}>
          {account ? 'Connected' : 'Connect Wallet'}
        </button>

        <button onClick={createMessage}>Create Message</button>

        <button onClick={signMessage}>Sign Message</button>

        <button onClick={verifyMessage}>Verify Message</button>
      </div>
    </div>
  );
};

export default MetaMaskTest;

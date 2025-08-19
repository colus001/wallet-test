import {
  ConnectionController,
  crossTestnet,
  useAppKit,
  useAppKitAccount,
} from '@to-nexus/sdk/react';
// import { useAppKit } from '@to-nexus/sdk/react';
import { addMinutes } from 'date-fns';
import { useState } from 'react';
import { generateNonce, SiweMessage } from 'siwe';

const Home = () => {
  const [siweMessage, setSiweMessage] = useState<SiweMessage | undefined>(
    undefined
  );
  const [signature, setSignature] = useState<string | undefined>(undefined);
  const account = useAppKitAccount();
  const appKit = useAppKit();

  return (
    <div>
      <h1>Home</h1>
      <div>Account: {account?.address}</div>
      <div>SIWE Message: {siweMessage?.prepareMessage()}</div>
      <div>Signature: {signature}</div>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          maxWidth: '200px',
        }}
      >
        <button
          onClick={() => {
            if (account?.isConnected) {
              alert('Already connected');
            } else {
              appKit.connect();
            }
          }}
        >
          {account?.isConnected ? 'Connected' : 'Connect'}
        </button>

        <button
          onClick={() => {
            if (!account?.address) {
              alert('Please connect your wallet first');
              return;
            }

            setSiweMessage(createAuthenticationNonce(account.address));
          }}
        >
          Create Message
        </button>

        <button
          onClick={async () => {
            if (!siweMessage) {
              alert('Please sign the message first');
              return;
            }

            const result = await ConnectionController.signMessage({
              message: siweMessage.prepareMessage(),
            });

            setSignature(result);
          }}
        >
          Sign Message
        </button>

        <button
          onClick={async () => {
            if (!signature || !siweMessage) {
              alert('Please sign the message first');
              return;
            }

            try {
              const fields = await new SiweMessage(
                siweMessage?.prepareMessage()
              ).verify({
                signature: signature,
              });
              console.log('fields:', fields);
            } catch (error) {
              console.error('error:', error);
            }
          }}
        >
          Verify Message
        </button>
      </div>
    </div>
  );
};

export default Home;

function createAuthenticationNonce(address: string) {
  const authenticationNonce = {
    address,
    nonce: generateNonce(),
    expirationTime: addMinutes(new Date(), 10),
    message:
      "I accept the NFT Market's Terms of Service: https://crossnft.io/terms/service",
  };

  const siweMessage = new SiweMessage({
    domain: window.location.hostname,
    address,
    uri: window.location.origin,
    version: '1',
    chainId: crossTestnet.id,
    nonce: authenticationNonce.nonce,
    statement: authenticationNonce.message,
    expirationTime: new Date(authenticationNonce.expirationTime).toISOString(),
  });

  return siweMessage;
}

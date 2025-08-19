import {
  ConnectionController,
  useAppKit,
  useAppKitAccount,
} from '@to-nexus/sdk/react';
// import { useAppKit } from '@to-nexus/sdk/react';
import { useState } from 'react';
import { SiweMessage } from 'siwe';
import { createAuthenticationNonce } from './assets/message';

const CrossTest = () => {
  const [siweMessage, setSiweMessage] = useState<SiweMessage | undefined>(
    undefined
  );
  const [signature, setSignature] = useState<string | undefined>(undefined);
  const account = useAppKitAccount();
  const appKit = useAppKit();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cross Test</h1>

      <div style={{ marginBottom: '20px' }}>
        <div>Account: {account?.address}</div>
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
              console.log(
                'siweMessage?.prepareMessage():',
                siweMessage?.prepareMessage()
              );
              const fields = await new SiweMessage(
                siweMessage?.prepareMessage()
              ).verify({
                signature,
              });
              console.log('fields:', fields);
              alert('Signature verified');
            } catch (error) {
              console.error('error:', error);
              alert('Invalid signature');
            }
          }}
        >
          Verify Message
        </button>
      </div>
    </div>
  );
};

export default CrossTest;

import { crossTestnet } from '@to-nexus/sdk/react';
import { generateNonce, SiweMessage } from 'siwe';

export function createAuthenticationNonce(address: string) {
  const authenticationNonce = {
    address,
    nonce: generateNonce(),
    // expirationTime: addMinutes(new Date(), 10),
    expirationTime: new Date('2025-08-30T12:00:00.000Z'),
    message:
      "I accept the NFT Market's Terms of Service: https://crossnft.io/terms/service",
  };

  const siweMessage = new SiweMessage({
    domain: window.location.hostname,
    address,
    uri: window.location.origin,
    version: '1',
    chainId: crossTestnet.id,
    // nonce: authenticationNonce.nonce,
    nonce: '1234567890',
    statement: authenticationNonce.message,
    issuedAt: new Date('2025-08-20T12:00:00.000Z').toISOString(),
    expirationTime: new Date(authenticationNonce.expirationTime).toISOString(),
  });

  return siweMessage;
}

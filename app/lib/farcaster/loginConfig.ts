"use client"

import { createAppClient, viemConnector } from '@farcaster/auth-client';

export const appClient = createAppClient({
   relay: 'https://relay.farcaster.xyz',
   ethereum: viemConnector(),
});


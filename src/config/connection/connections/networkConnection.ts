import { Network } from "@web3-react/network";
import { initializeConnector } from "@web3-react/core";
import {
  CHAINS_ID,
  SUPPORTED_CHAINS,
  CHAIN_IDS_TO_NAMES,
  RpcConfigChainList,
} from "@/config/network/chainInfo";
import AppJsonRpcProvider from "../rpc/AppJsonRpcProvider";
import ConfiguredJsonRpcProvider from "../rpc/ConfiguredJsonRpcProvider";
import { Connection, ConnectionType } from "../types";

const APP_RPC_URLS: Record<SUPPORTED_CHAINS, string[]> = {
  [CHAINS_ID.BITLAYER]: [...RpcConfigChainList[CHAINS_ID.BITLAYER].rpcUrls],
  [CHAINS_ID.BITLAYER_TESTNET]: [
    ...RpcConfigChainList[CHAINS_ID.BITLAYER_TESTNET].rpcUrls,
  ],
};

function getAppProvider(chainId: SUPPORTED_CHAINS) {
  return new AppJsonRpcProvider(
    APP_RPC_URLS[chainId].map(
      (url) =>
        new ConfiguredJsonRpcProvider(url, {
          chainId,
          name: CHAIN_IDS_TO_NAMES[chainId],
        }),
    ),
  );
}

/** These are the only JsonRpcProviders used directly by the interface. */
export const RPC_PROVIDERS = {
  [CHAINS_ID.BITLAYER]: getAppProvider(CHAINS_ID.BITLAYER),
  [CHAINS_ID.BITLAYER_TESTNET]: getAppProvider(CHAINS_ID.BITLAYER_TESTNET),
} satisfies Record<SUPPORTED_CHAINS, AppJsonRpcProvider>;

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions) =>
    new Network({
      actions,
      urlMap: RPC_PROVIDERS,
      defaultChainId: CHAINS_ID.BITLAYER,
    }),
);

export const networkConnection: Connection = {
  getProviderInfo: () => ({ name: "Network" }),
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
  shouldDisplay: () => false,
};

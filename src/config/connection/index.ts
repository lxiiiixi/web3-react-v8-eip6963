import { Connection, ConnectionType, ProviderInfo } from "./types";
import { EIP6963 } from "./eip6963";
import { initializeConnector } from "@web3-react/core";

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`);
}

const [eip6963, eip6963hooks] = initializeConnector<EIP6963>(
  (actions) => new EIP6963({ actions, onError }),
);

type InjectedConnection = Connection & {
  /** Returns a copy of the connection with metadata & activation for a specific extension/provider */
  wrap: (providerInfo: ProviderInfo) => Connection | undefined;
  /** Sets which extension/provider the connector should activate */
  selectRdns(rdns: string): void;
};

export const eip6963Connection: InjectedConnection = {
  getProviderInfo: () =>
    eip6963.provider.currentProviderDetail?.info ?? { name: `Browser Wallet` },
  selectRdns: (rdns: string) => eip6963.selectProvider(rdns),
  connector: eip6963,
  hooks: eip6963hooks,
  type: ConnectionType.EIP_6963_INJECTED,
  shouldDisplay: () => false, // Since we display each individual eip6963 wallet, we shouldn't display this generic parent connection
  wrap(providerInfo: ProviderInfo) {
    const { rdns } = providerInfo;
    if (!rdns) return undefined;
    return {
      ...this,
      getProviderInfo: () => providerInfo,
      overrideActivate() {
        eip6963.selectProvider(rdns); // Select the specific eip6963 provider before activating
        return false;
      },
      shouldDisplay: () => true, // Individual eip6963 wallets should always be displayed
    };
  },
};

export const connections = [eip6963Connection];

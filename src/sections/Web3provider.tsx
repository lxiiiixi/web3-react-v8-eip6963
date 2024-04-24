import { ReactNode } from "react";
import { Connector } from "@web3-react/types";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { connections } from "@/config/connection";

export default function Web3Provider({ children }: { children: ReactNode }) {
  const connectors = connections.map<[Connector, Web3ReactHooks]>(
    ({ hooks, connector }) => [connector, hooks],
  );

  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
}

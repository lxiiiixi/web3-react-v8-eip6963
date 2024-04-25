import { useMemo } from "react";
import { useInjectedProviderDetails } from "@/config/connection/eip6963/providers";
import { eip6963Connection } from "@/config/connection/connections/eip6963Connection";
import { Connection } from "@/config/connection/types";
import WalletConnectBtn from "@/sections/WalletConnectBtn";

export function useEIP6963Connections() {
  const eip6963Injectors = useInjectedProviderDetails();
  const eip6963Enabled = true;

  return useMemo(() => {
    if (!eip6963Enabled)
      return { eip6963Connections: [], showDeprecatedMessage: false };

    const eip6963Connections = eip6963Injectors.flatMap(
      (injector) => eip6963Connection.wrap(injector.info) ?? [],
    );

    return { eip6963Connections };
  }, [eip6963Injectors, eip6963Enabled]);
}

function getOrderedConnections(connections: Connection[]) {
  const list: JSX.Element[] = [];
  for (const c of connections) {
    if (!c.shouldDisplay()) continue;
    const { name } = c.getProviderInfo();

    const option = <WalletConnectBtn key={name} connection={c} />;

    list.push(option);
  }

  return list;
}

export function useOrderedConnections() {
  const { eip6963Connections } = useEIP6963Connections();

  // can do some sorting here....

  return { orderedConnections: getOrderedConnections(eip6963Connections) };
}

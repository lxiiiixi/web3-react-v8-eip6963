import { Connector } from "@web3-react/types";
import { ConnectionType } from "./types";
import { useEffect } from "react";
import { useRecentConnection } from "./useRecentConnection";

async function connect(connector: Connector, type: ConnectionType) {
  // We intentionally omit setting a non-ok status on this trace, as it is expected to fail.
  // The trace here is intended to capture duration and throughput, not status.
  console.log("Tring to connect by", type, "......");
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
    return true;
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
    return false;
  }
}

export const useEagerlyConnect = () => {
  const { getRecentConnectionMeta } = useRecentConnection();
  const connection = getRecentConnectionMeta();
  console.log("Last connected by", connection?.walletName);

  useEffect(() => {
    // if (connection?.connector && connection.connector instanceof Connector) {
    //   connect(connection?.connector, ConnectionType.EIP_6963_INJECTED);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

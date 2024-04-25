import { Connector } from "@web3-react/types";
import { ConnectionType } from "./types";
import { useEffect } from "react";
import { useRecentConnection } from "./useRecentConnection";
import { getConnection } from ".";
import { useWeb3React } from "@web3-react/core";
import { useActivationState } from "@/hooks/useTryActivate";
import { eip6963Connection } from "./connections/eip6963Connection";

async function connect(connector: Connector, type: ConnectionType) {
  console.log("Tring to connect by", type, "connection eagerly......");

  try {
    console.log("connector connectEagerly..............", connector);
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
  const { isActive, chainId } = useWeb3React();
  const { tryActivation } = useActivationState();

  useEffect(() => {
    const connectionMeta = getRecentConnectionMeta();
    // try to connect with the most recent connection
    if (connectionMeta && connectionMeta?.type) {
      const connection = getConnection(connectionMeta?.type);

      // All EIP6963 wallets share one Connection object, `eip6963Connection`
      // To activate the same EIP6963 wallet as the last session, we need to `select` the rdns of the recent connection
      if (connectionMeta.rdns)
        eip6963Connection.selectRdns(connectionMeta.rdns);

      if (connection) {
        console.log("Last connected by", connection);
        // connect(connection.connector, ConnectionType.EIP_6963_INJECTED);
        tryActivation(
          connection,
          () => {
            console.log("Connected onSuccess");
          },
          chainId,
        );
      } else {
        console.warn("unsupported connector");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const networkConnection = getConnection(ConnectionType.NETWORK);
    if (!isActive && networkConnection && networkConnection.connector) {
      connect(networkConnection.connector, ConnectionType.NETWORK);
    }
  }, [isActive]);
};

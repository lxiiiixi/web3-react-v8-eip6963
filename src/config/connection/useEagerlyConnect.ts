import { Connector } from "@web3-react/types";
import { ConnectionType } from "./types";
import { useEffect } from "react";
import { useRecentConnection } from "./useRecentConnection";
import { getConnection } from ".";

async function connect(connector: Connector, type: ConnectionType) {
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
  const connectionMeta = getRecentConnectionMeta();
  console.log("Last connected by", connectionMeta, connectionMeta?.walletName);

  const networkConnection = getConnection(ConnectionType.NETWORK);
  if (networkConnection && networkConnection.connector) {
    console.log("Try to connect with network connection....");
    connect(networkConnection.connector, ConnectionType.NETWORK);
  }

  useEffect(() => {
    // try to connect with the most recent connection
    if (connectionMeta && connectionMeta?.type) {
      const connection = getConnection(connectionMeta?.type);
      if (connection && connection.connector) {
        connect(connection.connector, ConnectionType.EIP_6963_INJECTED);
      } else {
        console.warn("unsupported connector");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

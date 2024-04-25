import { Connector } from "@web3-react/types";
import { eip6963Connection } from "./connections/eip6963Connection";
import { ConnectionType } from "./types";
import { networkConnection } from "./connections/networkConnection";

export const connections = [eip6963Connection, networkConnection];

export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = connections.find(
      (connection) => connection.connector === c,
    );
    if (!connection) {
      throw Error("unsupported connector");
    }
    return connection;
  } else {
    switch (c) {
      case ConnectionType.EIP_6963_INJECTED:
        return eip6963Connection;
      case ConnectionType.NETWORK:
        return networkConnection;
    }
  }
}

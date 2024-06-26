import { useWeb3React } from "@web3-react/core";
import { useOrderedConnections } from "@/hooks/useConnections";
import Button from "@/componnents/Button";
import Card from "@/componnents/Card";
import { getConnection } from "@/config/connection";
import { substrAddress } from "@/utils/handleString";
import { CHAIN_IDS_TO_NAMES } from "@/config/network/chainInfo";
import { useEagerlyConnect } from "@/config/connection/useEagerlyConnect";

function Home() {
  const { orderedConnections } = useOrderedConnections();
  const { isActive, isActivating, account, chainId, connector } =
    useWeb3React();
  const connection = getConnection(connector);

  useEagerlyConnect();

  // console.log(activationState);
  console.log(useWeb3React());
  // console.log(useActiveWeb3React());

  const handleDisconnect = () => {
    connector.deactivate?.();
    connector.resetState();
  };

  if (isActive && account && chainId && connection) {
    const connectionInfo = connection?.getProviderInfo();
    const { name, icon } = connectionInfo;

    const chainName =
      chainId in CHAIN_IDS_TO_NAMES
        ? CHAIN_IDS_TO_NAMES[chainId as keyof typeof CHAIN_IDS_TO_NAMES]
        : null;
    return (
      <div className="h-[450px] w-[340px]">
        <Card
          frontText={<p className="text-lg">{substrAddress(account, 8, 9)}</p>}
        >
          <div className=" text-sm">
            <h3 className="mt-3 text-2xl">Connected</h3>
            <p className="flex-between mt-3">
              ChainId{" "}
              <span className="font-bold">
                {" "}
                {chainId} {chainName ? `(${chainName})` : ""}{" "}
              </span>
            </p>
            <p className="flex-between mt-3">
              Connection Type
              <span className="font-bold"> {connection?.type}</span>
            </p>
            <p className="flex-between mt-3">
              Wallet
              <span className="flex-center gap-2 font-bold">
                <img
                  className="block h-[20px] w-[20px]"
                  src={icon}
                  alt={name}
                />{" "}
                {name}
              </span>
            </p>
          </div>
          <Button onClick={handleDisconnect} className="mt-3">
            Disconnect
          </Button>
        </Card>
      </div>
    );
  }

  if (isActivating) {
    return <div>Connecting...</div>;
  }

  return <div className="flex flex-col gap-10">{orderedConnections}</div>;
}

export default Home;

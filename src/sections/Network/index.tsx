import { useWeb3React } from "@web3-react/core";
import { RpcConfigChainList } from "@/config/network/chainInfo";
import Button from "@/componnents/Button";

export default function Network() {
  const { chainId, connector } = useWeb3React();
  const isOnBitLayer = chainId === 200901;
  const isOnBitLayerTest = chainId === 200810;

  if (!chainId) {
    return;
  }

  if (!isOnBitLayerTest || !isOnBitLayer) {
    const handleSwitchNetwork = async (
      chainId: keyof typeof RpcConfigChainList,
    ) => {
      const chainInfo = chainId
        ? RpcConfigChainList[Number(chainId) as keyof typeof RpcConfigChainList]
        : null;
      if (!chainInfo || !connector) {
        console.error("Please provide the correct chainId and connector info");
        return;
      }
      await connector.activate(chainInfo);
    };
    return (
      <div>
        <p className="my-10 text-gray-400">
          The network that we support is BitLayer and BitLayer Test
        </p>
        {!isOnBitLayer && !isOnBitLayerTest && (
          <p className="text-gray-400">
            You are connected with chain {chainId}
          </p>
        )}
        <div className="flex-center my-10 gap-3">
          {!isOnBitLayer && (
            <Button onClick={() => handleSwitchNetwork(200901)}>
              Switch to BitLayer
            </Button>
          )}
          {!isOnBitLayerTest && (
            <Button onClick={() => handleSwitchNetwork(200810)}>
              Switch to BitLayer Test
            </Button>
          )}
        </div>
      </div>
    );
  }

  return;
}

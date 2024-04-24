import Button from "@/componnents/Button";
import { Connection } from "@/config/connection/types";
import { useRecentConnection } from "@/config/connection/useRecentConnection";
import { useActivationState } from "@/hooks/useTryActivate";
import { useWeb3React } from "@web3-react/core";

export default function WalletConnectBtn({
  connection,
}: {
  connection: Connection;
}) {
  const { name, icon } = connection.getProviderInfo();
  const { chainId } = useWeb3React();
  const { tryActivation } = useActivationState();
  const { setRecentConnectionMeta } = useRecentConnection();

  const onSuccessfunction = () => {
    setRecentConnectionMeta({
      type: connection.type,
      walletName: name,
    });
  };

  return (
    <Button
      data-testid={`wallet-option-${connection.type}`}
      onClick={() => tryActivation(connection, onSuccessfunction, chainId)}
    >
      <div className="flex-center gap-2 ">
        <img src={icon} alt={name} width={20} className="rounded-md" /> {name}
      </div>
    </Button>
  );
}

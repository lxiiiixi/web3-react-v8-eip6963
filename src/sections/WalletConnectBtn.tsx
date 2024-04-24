import Button from "@/componnents/Button";
import { Connection } from "@/config/connection/types";
import { useActivationState } from "@/hooks/useTryActivate";
import { useWeb3React } from "@web3-react/core";

export default function WalletConnectBtn({
  connection,
}: {
  connection: Connection;
}) {
  const { name, icon } = connection.getProviderInfo();
  const { chainId } = useWeb3React();
  const { activationState, tryActivation } = useActivationState();

  const onSuccessfunction = () => {
    console.log("success");
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

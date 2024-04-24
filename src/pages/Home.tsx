import { useWeb3React } from "@web3-react/core";
import { useOrderedConnections } from "@/hooks/useConnections";

function Home() {
  const { orderedConnections } = useOrderedConnections();
  console.log(useWeb3React());

  return <div className="flex flex-col gap-10">{orderedConnections}</div>;
}

export default Home;

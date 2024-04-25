import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const useBlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState(0);
  const { provider } = useWeb3React();

  useEffect(() => {
    if (!provider) return;

    const handleBolock = (blockNumber: number) => {
      setBlockNumber(blockNumber);
    };

    provider
      .getBlockNumber()
      .then((res) => {
        handleBolock(res);
      })
      .catch((error) => {
        console.error(`Failed to get block number`, error);
      });

    provider.on("block", handleBolock);
    return () => {
      provider.removeListener("block", handleBolock);
    };
  }, [provider]);
  return blockNumber;
};

export default function Index() {
  const blockNumber = useBlockNumber();

  const [isMounted, setIsMounted] = useState(true);

  useEffect(
    () => {
      const timer1 = setTimeout(() => setIsMounted(true), 1000);

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        setIsMounted(false);
        clearTimeout(timer1);
      };
    },
    [blockNumber], //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  );

  return (
    <div className="flex-center fixed bottom-0 right-10 my-10">
      <span style={{ opacity: isMounted ? "0.2" : "0.6" }}>{blockNumber}</span>
      <div className="ml-2 h-2 w-2 rounded-full bg-green-600"></div>
    </div>
  );
}

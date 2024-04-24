export const RpcConfigChainList = {
  200810: {
    chainId: `3106a`,
    rpcUrls: ["https://testnet-rpc.bitlayer-rpc.com"],
    chainName: "Bitlayer Testnet",
    blockExplorerUrls: ["https://testnet-scan.bitlayer.org"],
    nativeCurrency: {
      symbol: "BTC",
      decimals: 18,
    },
  },
  200901: {
    chainId: `310c5`,
    rpcUrls: ["https://rpc.bitlayer.org"],
    chainName: "Bitlayer",
    blockExplorerUrls: ["https://www.btrscan.com"],
    nativeCurrency: {
      symbol: "BTC",
      decimals: 18,
    },
  },
};

export const getChainConfigByHexId = (chainId: string) => {
  return Object.values(RpcConfigChainList).find(
    (item) => item.chainId === chainId,
  );
};

export const mapChainIdToChainName = {
  200810: "Bitlayer Testnet",
  200901: "Bitlayer Mainnet",
  "0x3106a": "Bitlayer Testnet",
  "0x310c5": "Bitlayer",
};

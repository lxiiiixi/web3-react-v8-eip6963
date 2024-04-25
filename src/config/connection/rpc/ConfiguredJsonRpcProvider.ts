import { SUPPORTED_CHAINS } from "@/config/network/chainInfo";
import { Networkish } from "@ethersproject/networks";
import { StaticJsonRpcProvider } from "@ethersproject/providers";

export default class ConfiguredJsonRpcProvider extends StaticJsonRpcProvider {
  constructor(
    url: string | undefined,
    // Including networkish allows ethers to skip the initial detectNetwork call.
    networkish: Networkish & { chainId: SUPPORTED_CHAINS },
    pollingInterval = 12,
  ) {
    super(url, networkish);

    // NB: Third-party providers (eg MetaMask) will have their own polling intervals,
    // which should be left as-is to allow operations (eg transaction confirmation) to resolve faster.
    // Network providers need to update less frequently to be considered responsive.
    this.pollingInterval = pollingInterval;
  }
}

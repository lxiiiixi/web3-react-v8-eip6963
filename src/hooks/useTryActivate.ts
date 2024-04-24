import { ChainId } from "@uniswap/sdk-core";
import { Connection } from "@/config/connection/types";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { didUserReject } from "@/config/connection/utils";

export enum ActivationStatus {
  PENDING,
  ERROR,
  IDLE,
}

const IDLE_ACTIVATION_STATE = { status: ActivationStatus.IDLE } as const;
type ActivationPendingState = {
  status: ActivationStatus.PENDING;
  connection: Connection;
};
type ActivationErrorState = {
  status: ActivationStatus.ERROR;
  connection: Connection;
  error: any;
};
type ActivationState =
  | ActivationPendingState
  | ActivationErrorState
  | typeof IDLE_ACTIVATION_STATE;

const activationStateAtom = atom<ActivationState>(IDLE_ACTIVATION_STATE);

function useTryActivation() {
  const setActivationState = useSetAtom(activationStateAtom);

  return useCallback(
    async (
      connection: Connection,
      onSuccess: () => void,
      chainId?: ChainId,
    ) => {
      // Skips wallet connection if the connection should override the default
      // behavior, i.e. install MetaMask or launch Coinbase app
      if (connection.overrideActivate?.(chainId)) return;

      const { name } = connection.getProviderInfo();
      try {
        setActivationState({
          status: ActivationStatus.PENDING,
          connection,
        });

        console.debug(`Connection activating: ${name}`);
        await connection.connector.activate();

        // Clears pending connection state
        setActivationState(IDLE_ACTIVATION_STATE);

        onSuccess();
      } catch (error) {
        // Gracefully handles errors from the user rejecting a connection attempt
        if (didUserReject(connection, error)) {
          setActivationState(IDLE_ACTIVATION_STATE);
          return;
        }

        // TODO(WEB-1859): re-add special treatment for already-pending injected errors & move debug to after didUserReject() check
        console.debug(`Connection failed: ${name}`);
        console.error(error);

        setActivationState({
          status: ActivationStatus.ERROR,
          connection,
          error,
        });
      }
    },
    [setActivationState],
  );
}

function useCancelActivation() {
  const setActivationState = useSetAtom(activationStateAtom);
  return useCallback(
    () =>
      setActivationState((activationState) => {
        if (activationState.status !== ActivationStatus.IDLE)
          activationState.connection.connector.deactivate?.();
        return IDLE_ACTIVATION_STATE;
      }),
    [setActivationState],
  );
}

export function useActivationState() {
  const activationState = useAtomValue(activationStateAtom);
  const tryActivation = useTryActivation();
  const cancelActivation = useCancelActivation();

  return { activationState, tryActivation, cancelActivation };
}

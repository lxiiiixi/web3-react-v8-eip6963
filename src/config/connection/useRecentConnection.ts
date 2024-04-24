export const connectionMetaKey = "recent_connection_meta";
import { RecentConnectionMeta, ConnectionType } from "./types";

function isRecentConnectionMeta(value: any): value is RecentConnectionMeta {
  // make sure all required fields are present
  const test: RecentConnectionMeta = {
    type: value.type,
    walletName: value.walletName,
  };
  const isLegalTyep = Boolean(test.type && ConnectionType[test.type]);
  return isLegalTyep;
}

export function getRecentConnectionMeta(): RecentConnectionMeta | undefined {
  const value = localStorage.getItem(connectionMetaKey);
  if (!value) return;

  try {
    const json = JSON.parse(value);
    if (isRecentConnectionMeta(json)) return json;
  } catch (e) {
    console.warn(e);
  }
  // If meta is invalid or there is an error, clear it from local storage.
  setRecentConnectionMeta(undefined);
  return;
}

export function setRecentConnectionMeta(
  meta: RecentConnectionMeta | undefined,
) {
  if (!meta) return localStorage.removeItem(connectionMetaKey);
  localStorage.setItem(connectionMetaKey, JSON.stringify(meta));
}

export const useRecentConnection = () => {
  return { setRecentConnectionMeta, getRecentConnectionMeta };
};

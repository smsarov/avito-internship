import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from "react";

import { adsListReducer } from "./reducer";
import { initialState } from "./initial-state";

import type { AdsListState, AdsListAction } from "./types";

const AdsListStateContext = createContext<AdsListState | null>(null);
const AdsListDispatchContext = createContext<Dispatch<AdsListAction> | null>(
  null,
);

export function AdsListProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(adsListReducer, initialState);

  return (
    <AdsListStateContext value={state}>
      <AdsListDispatchContext value={dispatch}>
        {children}
      </AdsListDispatchContext>
    </AdsListStateContext>
  );
}

export function useAdsListState(): AdsListState {
  const ctx = useContext(AdsListStateContext);
  if (!ctx) {
    throw new Error("useAdsListState must be used inside AdsListProvider");
  }
  return ctx;
}

export function useAdsListDispatch(): Dispatch<AdsListAction> {
  const ctx = useContext(AdsListDispatchContext);
  if (!ctx) {
    throw new Error("useAdsListDispatch must be used inside AdsListProvider");
  }
  return ctx;
}

import { initialCategories } from "./initial-state";

import type { AdsListState, AdsListAction } from "./types";

export function adsListReducer(
  state: AdsListState,
  action: AdsListAction,
): AdsListState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload, page: 1 };

    case "SET_SORT":
      return { ...state, sort: action.payload, page: 1 };

    case "TOGGLE_CATEGORY":
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload]: !state.categories[action.payload],
        },
        page: 1,
      };

    case "SET_REVISION_ONLY":
      return { ...state, revisionOnly: action.payload, page: 1 };

    case "SET_PAGE":
      return { ...state, page: action.payload };

    case "SET_VIEW":
      return { ...state, view: action.payload, page: 1 };

    case "RESET_FILTERS":
      return {
        ...state,
        categories: initialCategories,
        revisionOnly: false,
        page: 1,
      };

    default:
      return state;
  }
}

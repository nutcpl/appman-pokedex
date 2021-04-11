import store from "../store";
import Axios from "axios";

export function getCard() {
  store.dispatch({ type: "FETCHING_CARD" });

  return function (dispatch) {
    return Axios.get("http://localhost:3030/api/cards").then((card) => {
      console.log(card.data);
      dispatch({ type: "FETCHED_CARD", data: card.data });
    });
  };
}

export function getSearch(name) {
  return function (dispatch) {
    return Axios.get(
      `http://localhost:3030/api/cards?limit=20&name${name}`
    ).then((card) => {
      dispatch({ type: "SET_QUERY", data: card.data });
    });
  };
}

export function addIoList(card) {
  return store.dispatch({ type: "ADD_SELECTED", item_card: card });
}

export function removeFromList(card_id) {
  return store.dispatch({ type: "REMOVE_SELECTED", id: card_id });
}

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

// export function getSearch(name) {
//   return function (dispatch) {
//     return Axios.get(
//       `http://localhost:3030/api/cards?&name=${name}`
//     ).then((card) => {
//       console.log(card.data)
//       dispatch({ type: "SET_QUERY", data: card.data });
//     });
//   };
// }

export function getSearch(name) {
  let searchName = `http://localhost:3030/api/cards?name=${name}`;
  let searchType = `http://localhost:3030/api/cards?type=${name}`;

  const requestName = Axios.get(searchName);
  const requestType = Axios.get(searchType);

  console.log(requestName);
  console.log(requestType);

  return function (dispatch) {
    // return Axios.all([requestName, requestType])
    // .then((card) => {
    //   console.log(card.data);
    //   dispatch({ type: "SET_QUERY", data: card.data });
    // });
    return Axios.all([requestName, requestType]).then(
      Axios.spread((...allData) => {
        // let allName = allData[0].data;
        // let allType = allData[1].data;

        let allName = [];
        let allType = [];
        let all = []
        

        allName.push(allData[0].data.cards)
        allType.push(allData[1].data.cards)

        // all = allType.filter(val => !allName.includes(val))
        all = allName[0].concat(allType[0])
        
        const uniqueObjects = [...new Map(all.map(item => [item.id, item])).values()]
        // all = [...allName[0], ...allType[0]]

        // all = new Set([...allName[0], ...allType[0]])
        
        //all.filter((item, index) => all.indexOf(item.id) !== index.id)
      
        console.log(uniqueObjects);
        // console.log(allName);
        // console.log(allType);

        dispatch({ type: "SET_QUERY", data: uniqueObjects});
      })
    );
    
  };
}

// export function getSearch(name) {

//   let searchName = [];
//   let searchType = [];

//   console.log(name)
//   Axios.get(`http://localhost:3030/api/cards?name=${name}`).then(
//     (card) => {
//       searchName.push(card.data);
//     }
//   );
//   Axios.get(`http://localhost:3030/api/cards?type=${name}`).then(
//     (card) => {
//       searchType.push(card.data);
//     }
//   );
//   // searchName.concat(searchType)
//   console.log(searchName);
//   console.log(searchType);

//   // return function (dispatch) {
//     return store.dispatch({ type: "SET_QUERY", data: searchName });
//   // };
// }

// export function getSearch(name) {
//   return function (dispatch) {
//     return Axios.get("http://localhost:3030/api/cards?limit=30&name=" +name+ "&type=" +name )
//     .then((card) => {
//       console.log(card.data);
//       dispatch({ type: "SET_QUERY", data: card.data });
//     });
//   };
// }

export function addIoList(card) {
  return store.dispatch({ type: "ADD_SELECTED", item_card: card });
}

export function removeFromList(card_id) {
  return store.dispatch({ type: "REMOVE_SELECTED", id: card_id });
}

const initialState = {
  loading: false,
  query: [],
  data: [],
  selected: [],
};

function card(state = initialState, action) {
  switch (action.type) {
    case "FETCHING_CARD":
      return {
        ...state,
        data: [],
        isFetching: true,
      };

    case "FETCHED_CARD":
      return {
        ...state,
        data: action.data,
        isFetching: false,
      };

    case "SET_QUERY":
      //รับข้อมูลที่ได้จากการค้นหา
      let data_query = action.data.cards;

      //ลบ card ที่มีอยู่ selected แล้ว
      state.selected.map((card) => {
          data_query = data_query.filter((q_card) =>{ return q_card.id !== card.id})
      })

      state = { 
          ...state,
          query: data_query
      }
      return state;

    case "ADD_SELECTED":
      const thiscard = action.item_card;
      // console.log(thiscard);

      let inList = undefined;
      // inList = true  มีอยู่
      // inList = false  ไม่มี

      if (state.selected.length > 0) {
        // ดูว่าเคยเพิ่มมั้ย
        inList = state.selected.find((item) => {
          return item.id === thiscard.id ? true : false;
        });
      } else {
        //เพิ่มลงลิส
        inList = false;
      }

      state = {
        ...state,
        selected: inList
          ? //inList = true มีอยู่แล้ว
            state.selected
          : //inList = false ไม่มี
            [...state.selected, thiscard],
        query: state.query.filter((card) => {
          return card.id !== thiscard.id;
        }),
      };

      return state;

    case "REMOVE_SELECTED":
      state = {
        ...state,
        selected: state.selected.filter((card) => {
          return card.id !== action.id;
        }),
      };

      return state;

    default:
      return state;
  }
}
export default card;

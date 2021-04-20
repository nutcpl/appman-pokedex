import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Pokedex.css";
import { getCard, removeFromList } from "../redux/actions/cardAction";

function Pokedex() {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card);

  const Romove = (id) => {
    dispatch(removeFromList(id));
  };

  useEffect(async () => {
    await dispatch(getCard());
  }, []);
  return (
    <div>
      <div className="mypokedex">
        {card.selected
          ? card.selected.map((item, index) => {
              // console.log(item)
              return (
                <div className="wrapper" key={index}>
                  {/* cardlist */}
                  
           
                    <div className="card m-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <img
                              style={{ width: "100%" }}
                              src={item.imageUrl}
                            />
                          </div>

                          <div className="col-8">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">HP</p>
                            <p className="card-text">STR</p>
                            <p className="card-text">WEAK</p>
                          </div>

                          <p
                            className="delfromPokedex"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => Romove(item.id)}
                          >
                            x
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
          
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Pokedex;

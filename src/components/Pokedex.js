import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Pokedex.css";
import cute from "../cute.png";
import { removeFromList } from "../redux/actions/cardAction";

function Pokedex() {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card);
  var hp_ = 0;
  var weak_ = 0;

  const Romove = (id) => {
    dispatch(removeFromList(id));
  };

  const Strength = (attack) => {
    if (Array.isArray(attack) && attack.length > 0) {
      // console.log(attack.length)

      return attack.length * 50;
    } else {
      return 0;
    }
  };

  const HP = (hp) => {
    hp_ = 0;
    console.log(hp);
    let intHP = parseInt(hp);
    if (intHP !== NaN && intHP > 0) {
      if (intHP >= 100) {
        hp_ = 100;
        console.log("hp > 100 " + hp_);
        return hp_;
      } else if (intHP < 0) {
        hp_ = 0;
        return hp_;
      } else hp_ = intHP;
      return hp_;
    } else {
      hp_ = 0;
      return hp_;
    }
  };

  const Weakness = (weak) => {
    weak_ = 0;
    if (Array.isArray(weak) && weak.length > 0) {
      return (weak_ = weak.length * 100);
    } else {
      return 0;
    }
  };

  const Happiness = (attack) => {
    // parseInt
    let alldamage = 0;

    // console.log(attack);
    if (Array.isArray(attack) && attack.length > 0 && attack !== undefined) {
      attack.map((dm) => {
        if (dm.damage === "") {
          alldamage += 0;
        } else {
          alldamage += parseInt(dm.damage);
        }
      });
      console.log("all damage" + alldamage);
    } else {
      alldamage = 0;
    }

    const happy = (hp_ / 10 + alldamage / 10 + 10 - weak_ / 100) / 5;
    console.log(happy);
    let happyResult = [];

    for (let i = 0; i < happy; i++) {
      happyResult.push("");
    }

    return happyResult;
  };

  useEffect((dispatch) => {}, []);
  return (
    <div>
      <div className="mypokedex">
        {card.selected
          ? card.selected.map((item, index) => {
              // {console.log(item.attacks[0].damage)}
              // console.log(item)
              return (
                <div className="wrapper" key={index}>
                  {/* cardlist */}

                  <div className="card m-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-5">
                          <img
                            style={{ width: "100%" }}
                            src={item.imageUrl}
                            alt={item.name}
                          />
                        </div>

                        <div className="col-7">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">
                            <div className="row">
                              <div className="col-4">HP</div>
                              <div className="col-8">
                                <div
                                  className="progress"
                                  style={{ height: 20 }}
                                >
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${HP(item.hp)}%` }}
                                    aria-valuenow={item.hp}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                            </div>
                          </p>
                          <p className="card-text">
                            <div className="row">
                              <div className="col-4">STR</div>
                              <div className="col-8">
                                <div
                                  className="progress"
                                  style={{ height: 20 }}
                                >
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: `${Strength(item.attacks)}%`,
                                    }}
                                    aria-valuenow={item.hp}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                            </div>
                          </p>
                          <p className="card-text">
                            <div className="row">
                              <div className="col-4">WEAK</div>
                              <div className="col-8">
                                <div
                                  className="progress"
                                  style={{ height: 20 }}
                                >
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: `${Weakness(item.attacks)}%`,
                                    }}
                                    aria-valuenow={item.hp}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  />
                                </div>
                              </div>
                            </div>
                          </p>
                          <div className="row">
                            <div className="col-12">
                              {Happiness(item.attacks).map((val) => {
                                return (
                                  <img
                                    style={{ width: "35px", height: "35px" }}
                                    src={cute}
                                    alt={item.name}
                                  />
                                );
                              })}
                            </div>
                          </div>
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

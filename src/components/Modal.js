import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import search from "../search.png";
import cute from "../cute.png";
import "./Modal.css";
import { getSearch, addIoList } from "../redux/actions/cardAction";

function Modalcard() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const card = useSelector((state) => state.card);
  var hp_ = 0;
  var weak_ = 0;

  const openModal = () => {
    setShow(true);
    dispatch(getSearch(""));
  };

  const onChangeQuery = (key) => {
    // console.log(name);
    // setname(key);
    dispatch(getSearch(key));
  };

  const addToList = async (idcard) => {
    await dispatch(addIoList(idcard));
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
      console.log("weak " + weak_);
      weak_ = weak.length * 100;
      return weak_;
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
          alldamage = 0
        }  else {
            alldamage += parseInt(dm.damage);
          }
        
      });
      console.log("all damage" + alldamage);
    } else {
      alldamage = 0;
    }
    console.log(hp_, alldamage, weak_);
    const happy = (hp_ / 10 + alldamage / 10 + 10 - weak_ / 100) / 5;
    console.log(happy);
    let happyResult = [];

    for (let i = 0; i < happy; i++) {
      happyResult.push("");
    }

    return happyResult;
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="add">
        <div className="d-flex justify-content-center">
          <button className="addbtn" onClick={(e) => openModal(e)}>
            +
          </button>
        </div>

        <Modal
          scrollable={true}
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          dialogClassName="modal-1"
          aria-labelledby="example-custom-modal-styling-title"
          centered
          className="modal"
        >
          <Modal.Body>
            <div className="modalheader">
              <div className="search">
                <input
                  type="text"
                  placeholder="Find pokemon"
                  id="searchinput"
                  onChange={(e) => onChangeQuery(e.target.value)}
                />
                <img src={search} className="searchimg" alt="search" />
              </div>
            </div>

            <div className="modal-body">
              {card.query
                ? card.query.map((info, index) => {
                    // {console.log(info.attacks)}
                    return (
                      <div key="index">
                        <div className="cardlists">
                          <div className="card">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-3">
                                  <img
                                    style={{ width: "100%" }}
                                    src={info.imageUrl}
                                    alt={info.name}
                                  />
                                </div>

                                <div className="col-7">
                                  <h5 className="card-title">{info.name}</h5>
                                  <p className="card-text">
                                    <div className="row">
                                      <div className="col-3">HP</div>
                                      <div className="col-9">
                                        <div
                                          className="progress"
                                          style={{ height: 20 }}
                                        >
                                          <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: `${HP(info.hp)}%` }}
                                            aria-valuenow={info.hp}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </p>
                                  <p className="card-text">
                                    <div className="row">
                                      <div className="col-3">STR</div>
                                      <div className="col-9">
                                        <div
                                          className="progress"
                                          style={{ height: 20 }}
                                        >
                                          <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                              width: `${Strength(
                                                info.attacks
                                              )}%`,
                                            }}
                                            aria-valuenow={info.attacks}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </p>
                                  <p className="card-text">
                                    <div className="row">
                                      <div className="col-3">WEAK</div>
                                      <div className="col-9">
                                        <div
                                          className="progress"
                                          style={{ height: 20 }}
                                        >
                                          <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                              width: `${Weakness(
                                                info.weaknesses
                                              )}%`,
                                            }}
                                            aria-valuenow={info.hp}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </p>
                                  {Happiness(info.attacks).map((val) => {
                                    return (
                                      <img
                                        style={{ width: "50px" }}
                                        src={cute}
                                        alt={info.name}
                                      />
                                    );
                                  })}
                                </div>

                                <div className="col-2">
                                  <div className="float-right">
                                    <p
                                      className="addtoPokedex"
                                      style={{ cursor: "pointer" }}
                                      onClick={(e) => addToList(info)}
                                    >
                                      Add
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Modalcard;

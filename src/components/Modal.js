import React, { useState, useEffect, useRef } from "react";
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

  const openModal = () => {
    setShow(true);
    dispatch(getSearch(""));
  };

  const onChangeQuery = (key) => {
    // console.log(name);
    // setname(key);
    dispatch(getSearch(key));
  };

  const addToList = async (card) => {
    await dispatch(addIoList(card));
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
                <img src={search} className="searchimg" />
              </div>
            </div>

            <div className="modal-body">
              {card.query
                ? card.query.map((info, index) => {
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
                                  />
                                </div>

                                <div className="col-7">
                                  <h5 className="card-title">{info.name}</h5>
                                  <p className="card-text">HP</p>
                                  <p className="card-text">STR</p>
                                  <p className="card-text">WEAK</p>
                                  <img style={{ width: "50px" }} src={cute} />
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

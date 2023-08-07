import React, { useEffect, useState } from "react";
import "./Todo.css";
import { AiOutlinePlus } from "react-icons/ai";
import TodoListImage from "./Images/to-do-list.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Todo() {
  const getStoredList = () => {
    const item = localStorage.getItem("lists");
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  };

  let [list, setList] = useState(getStoredList());
  let [value, setValue] = useState("");
  let [toggleSwitch, setToggleSwitch] = useState(true);
  let [ID, setID] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleInputButton = () => {
    let obj = { value, id: new Date().getTime().toString() };
    if (obj.value !== "" && toggleSwitch) {
      setList([...list, obj]);
    } 
    else if (!toggleSwitch) {
      let findingWhichElement = list.find((elem) => elem.id === ID);
      if (value !== "") {
        findingWhichElement.value = value;
      }
      else {
        toast.error("Empty box, write something")
      }
    }
    else {
      toast.error("Empty box, write something")
    }
    setValue("");
    setToggleSwitch(true);
  };

  const handleDeleteButton = (id) => {
    const newList = list.filter((elem) => elem.id !== id);
    setList(newList);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(list));
  }, [list]);

  const handleEditButton = (id) => {
    setToggleSwitch(false);
    let editedItem = list.find((elem) => {
      return elem.id === id;
    });
    setValue(editedItem.value);
    setID(editedItem.id);
  };

  const toastifierAdd = () => {
    toast.success("Added successfully")
  }

  const toastifierEdit = () => {
    toast.success("Updated successfully")
  }

  const toastifierDelete = () => {
    toast.success("Deleted successfully")
  }

  return (
    <>
      <nav>
        <div className="App">
          <img src={TodoListImage} alt="" />
        </div>
        <div className="App" style={{ color: "whitesmoke" }}>
          <h4>Create your own victory list ✌️..</h4>
        </div>
        <div className="inputBox input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="List here ✍️..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={value}
            onChange={handleChange}
            title={value?value:"Write something"}
          />
          <span
            style={{ margin: 0, padding: 0 }}
            className="input-group-text"
            id="basic-addon2"
          >
            {toggleSwitch ? (
              <button
                type="button"
                className="btn btn-light"
                title="Add item"
                onClick={() => {
                  handleInputButton();
                  if (value) {toastifierAdd()}
                }}
              >
                <AiOutlinePlus />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-light"
                title="Update item"
                onClick={() => {
                  handleInputButton();
                  if (value) {toastifierEdit()}
                }}
              >
                <AiFillEdit />
              </button>
            )}
          </span>
        </div>
      </nav>

      <div className="App">
        <button
          className="btn btn-primary"
          hidden={list.length === 0 ? true : false}
          onClick={() => {
            setList([]);
            setValue("");
            toast.info("List is empty")
          }}
          title="Delete all"
        >
          Remove all
        </button>
      </div>

      <div style={{ marginTop: "2vw" }}></div>
      {list.length !== 0 &&
        list.map((elem) => {
          return (
            <div className="saveList" key={elem.id}>
              <div style={{ marginLeft: "1.5vw" }}>{elem.value}</div>
              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  className="btn bg-transparent border-0"
                  style={{ paddingTop: "0.9px" }}
                  onClick={() => handleEditButton(elem.id)}
                  title="Edit"
                >
                  <AiFillEdit />
                </button>
                <button
                  type="button"
                  className="btn bg-transparent border-0"
                  style={{ paddingTop: "0.9px", marginRight: "0.5vw" }}
                  onClick={() => {handleDeleteButton(elem.id); toastifierDelete();}}
                  title="Delete"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          );
        })}
        <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
    </>
  );
}

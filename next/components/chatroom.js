import { useEffect, useState } from "react";
import styles from "../styles/modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, fetchRooms, resetAddStatus } from "./slices/roomSlice";

export default function Chatroom({ setCreate }) {

  const dispatch = useDispatch()
  const { addstatus, error } = useSelector(state=> state.rooms) // check for erros, add loading screen
  const [chatroom, setChatRoom] = useState({
    name: "",
    private: false,
    passcode: "",
  })

  console.log(addstatus)

  useEffect(()=>{
    if(addstatus==='succeeded'){
      dispatch(fetchRooms())
      setCreate(false)
      dispatch(resetAddStatus())
      alert("Locker room created")
    }
  },[addstatus,dispatch])

  console.log(chatroom)

  const Create = async () => {
    if (chatroom.private && chatroom.passcode === "") {
      return alert("Enter Pass Code");
    }
    if (chatroom.name === "") {
      return alert("Enter name before creating the room");
    }
    dispatch(addRoom(chatroom))
    // await axios
    //   .post("/api/room", chatroom)
    //   .then((res) => {
    //     res.data.status === 200
    //       ? alert("Room Created")
    //       : alert("Room was not created due to some issue");
    //     router.reload();
    //   });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setCreate(false)}>
          &times;
        </span>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Room name"
            onChange={(e) =>
              setChatRoom((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <div>
            <input
              type="radio"
              name="type"
              id="private"
              onChange={() =>
                setChatRoom((prev) => ({ ...prev, private: true }))
              }
            />
            <label htmlFor="private">Private</label>
          </div>
          {chatroom.private && (
            <input
              type="password"
              placeholder="Pass code"
              onChange={(e) =>
                setChatRoom((prev) => ({ ...prev, passcode: e.target.value }))
              }
            />
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={Create}>CREATE</button>
        </div>
      </div>
    </div>
  );
}

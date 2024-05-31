import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/modal.module.css";

export default function Chatroom({ setCreate }) {
  const router = useRouter();
  const [chatroom, setChatRoom] = useState({
    name: "",
    private: false,
    passcode: "",
  });

  const Create = async () => {
    if (chatroom.private && chatroom.passcode === "") {
      return alert("Enter Pass Code");
    }
    if (chatroom.name === "") {
      return alert("Enter name before creating the room");
    }
    await axios
      .post("/api/room", chatroom)
      .then((res) => {
        res.data.status === 200
          ? alert("Room Created")
          : alert("Room was not created due to some issue");
        router.reload();
      });
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
          <div>
            <input
              type="radio"
              name="type"
              id="public"
              onChange={() =>
                setChatRoom((prev) => ({ ...prev, private: false }))
              }
            />
            <label htmlFor="public">Public</label>
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

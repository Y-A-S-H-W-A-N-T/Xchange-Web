import styles from "../styles/modal.module.css"
import Addnews from "./addnews";
import Chatroom from "./chatroom.js";

export default function Home({ modal, showModal }) {

  const toggleModal = () => {
    showModal()
  };

  return (
    <div>
      {modal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={toggleModal}>
              &times;
            </span>
            <h2>Create Room, Upload News, Community</h2>
            <Chatroom/>
            <Addnews/>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/modal.module.css";

export default function AddCommunity({ setCreate }) {
  const [community, setCommunity] = useState({
    name: '',
    description: '',
    leader: ''
  });

  useEffect(() => {
    const vtu = localStorage.getItem('vtu');
    const VTU = vtu ? vtu.replace(/^"(.*)"$/, '$1') : '';
    setCommunity((prev) => ({ ...prev, leader: VTU }));
  }, []);

  const router = useRouter();

  const Create = async () => {
    if (community.name === "") return alert("Enter a name for community");
    await axios
      .post("/api/community/create_community", {
        name: community.name,
        description: community.description,
        vtu: community.leader
      })
      .then((res) => {
        res.data.status === 200
          ? alert("Community Created")
          : alert("Error in Creating Community");
        router.reload();
      });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={() => setCreate(false)}>
          &times;
        </span>
        <h2>Create Community</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Community name"
            onChange={(e) =>
              setCommunity((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Description for community"
            onChange={(e) =>
              setCommunity((prev) => ({
                ...prev,
                description: e.target.value
              }))
            }
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={Create}>CREATE</button>
        </div>
      </div>
    </div>
  );
}

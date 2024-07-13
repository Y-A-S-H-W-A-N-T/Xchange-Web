import styles from "../styles/modal.module.css"

export default function Passcode({ setPrivateRoom, enterChat }) {
  return (
    <div>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close}  onClick={()=>setPrivateRoom((prev)=>({...prev,pass: false}))}>
              &times;
            </span>
            <input placeholder="pass code"  onChange={(e)=>setPrivateRoom((prev)=>({...prev,input: e.target.value}))}/>
            <button onClick={enterChat}>OK</button>
          </div>
        </div>
    </div>
  )
}
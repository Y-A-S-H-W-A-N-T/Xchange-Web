import styles from '../styles/loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <h1 className={styles.loadingText}>Loading...</h1>
        </div>
    );
};

export default Loading;

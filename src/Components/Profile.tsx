import styles from "../styles/components/Profile.module.css";
export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/aleluizsantos.png" alt="alessandro"/>
            <div>
                <strong>Alessandro Santos</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}
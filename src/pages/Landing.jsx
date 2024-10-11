import styles from "../style";
import { Hero } from "../components/index";

const Landing = () => {
  return (
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
  );
};

export default Landing;

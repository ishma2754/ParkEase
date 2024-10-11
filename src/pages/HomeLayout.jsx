import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";
import styles from "../style";
const HomeLayout = () => {
  return (
    <div className="bg-primary w-full min-h-screen overflow-hidden">
      <Header />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <section className="align-element">
        <Outlet />
      </section>
    </div>
  );
};

export default HomeLayout;

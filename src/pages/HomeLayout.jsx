import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components";
import styles from "../style";
const HomeLayout = () => {
  return (
    <div className="bg-primary w-full overflow-hidden min-h-screen">
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

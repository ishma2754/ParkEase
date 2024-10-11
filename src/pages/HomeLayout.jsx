import { Outlet, useLocation } from "react-router-dom";
import { Header, Navbar } from "../components";
import styles from "../style";
const HomeLayout = () => {
  const location = useLocation();

  // Check if on /listbookings/:id or /listbookings/:id/confirm then no headers
  const routeCheck = 
    location.pathname.match(/^\/listbookings\/[^/]+(\/confirm)?$/);
    
  return (
    <div className="bg-primary w-full min-h-screen overflow-hidden">
       {!routeCheck && <Header />}
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

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const AppLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default AppLayout;

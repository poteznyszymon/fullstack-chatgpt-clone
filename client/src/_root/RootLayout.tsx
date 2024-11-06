import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "../components/ThemeProvider";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Drawer from "../components/Drawer";
import MobileDrawer from "../components/MobileDrawer";
const RootLayout = () => {
  const [showDrawer, setShowDrawer] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const location = useLocation();

  const drawerClick = () => {
    setShowDrawer(!showDrawer);
  };

  const mobileDrawerClick = () => {
    setOpenMobileDrawer(!openMobileDrawer);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex bg-main-gray">
        <Drawer
          handleClick={drawerClick}
          showDrawer={showDrawer}
          newTitle={newTitle}
        />
        <MobileDrawer
          openDrawer={openMobileDrawer}
          handleClick={mobileDrawerClick}
          newTitle={newTitle}
        />
        <main
          className={`h-screen flex-1 flex flex-col font-inter bg-main-gray transition-all duration-300 ${
            showDrawer ? " ml-0 lg:ml-64" : "ml-0"
          }`}
        >
          <NavBar
            handleDrawerClick={drawerClick}
            handleMobileDrawerCLick={mobileDrawerClick}
            showDrawerIcon={!showDrawer}
          />
          <section className="flex-grow bg-main-gray flex  justify-center items-center">
            {location.pathname === "/home" && (
              <p className="font-semibold">Create new chat at the top left</p>
            )}
            <Outlet context={[setNewTitle]} />
          </section>
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default RootLayout;

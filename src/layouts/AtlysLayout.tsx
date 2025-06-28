import React, { useEffect } from "react";
import { Link } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import Dialog from "../components/Dialog";

import FooRumIcon from "../assets/svgs/FooRum.svg";
import LoginIcon from "../assets/svgs/Login.svg";

const AtlysLayout: React.FC = () => {
  const { user, logout } = useAuthContext();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    if (user?.isAuthenticated) {
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  }, [user?.isAuthenticated]);

  return (
    <div className="flex justify-between items-center w-full h-16 px-12 bg-background fixed top-0 shadow-feed">
      <Link to="/home">
        <img src={FooRumIcon} alt="" />
      </Link>
      {!user?.isAuthenticated ? (
        <Link to="/login">
          <img src={LoginIcon} alt="" />
        </Link>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <span
              title="Click to logout"
              className="text-sm font-semibold cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {user?.email}
            </span>
          </div>
          <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} showConfirm onConfirm={logout} title="Logout">
            <p>Are you sure you want to logout?</p>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default AtlysLayout;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { faSignOutAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ user }) => {
  const [userprofile, setUser] = useState({
    name: "",
    profileImage: "",
    email: "",
  });

  useEffect(() => {
    setUser({
      name: user._delegate.displayName,
      profileImage: user._delegate.photoURL,
      email: user._delegate.email,
    });
  }, [user]);

  const navigate = useNavigate();

  const signOut = async () => {
    await auth.signOut();

    navigate("/");
  };

  return (
    <div className="flex items-center justify-between p-[10px]">
      <div className="flex">
        <img
          src={
            userprofile.profileImage
              ? userprofile.profileImage
              : "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
          }
          className="max-w-[50px] max-h-[50px] rounded-[50px]"
          alt=""
        />
        <div className="ml-[7px]">
          <h3 className="text-bold">{userprofile.name}</h3>
          <p className="text-[13px]">{userprofile.email}</p>
        </div>
      </div>
      <button onClick={() => signOut()}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-[7px]" /> <span className="max-sm:hidden">Sign out</span>
      </button>
    </div>
  );
};

export default Navbar;

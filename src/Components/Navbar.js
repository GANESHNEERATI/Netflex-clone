import React, { useEffect, useState } from "react";
import "./Navbar.css";
function Navbar() {
  const [navbarBlack, setNavbarBlack] = useState(false);
  useEffect(() => {
    console.log("in useEffect");
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setNavbarBlack(true);
    } else setNavbarBlack(false);
  };
  return (
    <div className={`nav ${navbarBlack && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        alt="Netflex__Logo"
      />
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt="NetFlix__smile"
      />
    </div>
  );
}

export default Navbar;

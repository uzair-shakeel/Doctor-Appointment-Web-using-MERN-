import React, { useContext } from "react";
import { useEffect, useRef } from "react";
import Logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/authContext";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Doctors",
  },
  {
    path: "/service",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(AuthContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("stickyHeader");
      } else {
        headerRef.current.classList.remove("stickyHeader");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("showMenu");
  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={Logo} alt="Logo" />
          </div>

          <div className="navigation " ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-Color leading-7 font-[500] text-[16px]"
                        : "text-TextColor leading-7 font-[500] text-[16px]"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      src={user.photo || profile}
                      alt="User"
                      className="w-full rounded-full"
                    />
                  </figure>
                </Link>
                <h1>{user?.name}</h1>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-Color py-2 px-6 text-white font-[500] h-[44px] flex text-center justify-self-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer"></BiMenu>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

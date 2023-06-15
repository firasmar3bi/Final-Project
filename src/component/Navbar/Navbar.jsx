import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../Contex/ContexToken";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { getToken } = useContext(TokenContext);
  const [userToken, SetUserToken] = useState(null);
  const navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("access_token");
    SetUserToken(null);
    navigate("/Login");
  }

  useEffect(() => {
    async function extToken() {
      const decodeToken = await getToken();
      SetUserToken(decodeToken);
    }
    if (localStorage.getItem("access_token")) {
      extToken();
    } else {
      SetUserToken(null);
    }
  }, [getToken]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-white bg-white">
      <div className="container">
        <a className="navbar-brand" href="#">
          WINKEL{" "}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-uppercase me-4" to="">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase me-4" to="Shop">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase me-4" to="About">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase me-4" to="Bloge">
                Bloge
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-uppercase me-4" to="Contact">
                Contact
              </Link>
            </li>
            {userToken != null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-uppercase me-4" to="Card">
                    Card
                  </Link>
                </li>
                <li className="nav-item">
                  <p
                    className="nav-link text-uppercase mb-0 me-4" style={{ cursor: "pointer" }} onClick={() => Logout()}>
                    LogOut
                  </p>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-uppercase me-4" to="Register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-uppercase me-4" to="Login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

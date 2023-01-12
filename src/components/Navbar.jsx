import SearchContact from "./Contacts/SearchContact";

import { BACKGROUND, PURPLE } from "../helpers/colors";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-dark navbar-expand-sm shadow-lg"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="container">
        <div className="row w-100">
          <div className="col">
            <div className="navbar-brand">
              <i className="fas fa-id-badge" style={{ color: PURPLE }}></i>{" "}
              مدیریت مخاطبین
            </div>
          </div>
          <div className="col">
            {location.pathname === "/contacts" ? (
              <SearchContact />
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

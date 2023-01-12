import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import Counter from "../Conter";
import Spinner from "../Spinner";
import Contact from "./Contact";

const Contacts = () => {

const { filteredContacts, loading, deleteContact } = useContext(ContactContext);

  return (
    <section className="container">
      <div className="row">
        <div className="col">
          <Link
            to="/contacts/add"
            className="btn my-2"
            style={{ backgroundColor: PINK }}
          >
            مخاطب جدید
            <i className="fa fa-plus-circle mx-1"></i>
          </Link>
        </div>
      </div>

      <div className="row">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <Contact
                  key={c.id}
                  contact={c}
                  deleteContact={() => deleteContact(c.id, c.fullname)}
                />
              ))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: CURRENTLINE }}
              >
                <p className="h3" style={{ color: ORANGE }}>
                  مخاطبی یافت نشد
                </p>
                <img
                  src={require("../../assets/notfound.gif")}
                  alt="پیدا نشد"
                  className="w-25"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Contacts;

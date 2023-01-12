import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const SearchContact = () => {
  const {searchContact} = useContext(ContactContext);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span className="input-group-text" id="basic-addon1">
        <i className="fas fa-search"></i>
      </span>
      <input
        type="text"
        onChange={event => searchContact(event.target.value)}
        className="form-control"
        placeholder="جستجو"
        aria-label="Search"
        aria-describedby="basic-addon1"
        dir="rtl"
      />
    </div>
  );
};

export default SearchContact;

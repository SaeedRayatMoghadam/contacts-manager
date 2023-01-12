import { useEffect, useState } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import _ from 'lodash';

import {
  Navbar,
  Contacts,
  AddContact,
  EditContact,
  ViewContact,
} from './components';

import "./App.css";
import { createContact, deleteContact, getAllContacts, getAllGroups, getGroup } from "./services/contactService";
import { confirmAlert } from "react-confirm-alert";
import { CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "./helpers/colors";
import { ContactContext } from "./context/ContactContext";
import { contactSchema } from "./components/validations/Validation";
import { useImmer } from "use-immer";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useImmer([]);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({
    fullname:"",
    photo:"",
    mobile:"",
    email:"",
    job:"",
    group:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const {data : contacts} = await getAllContacts();
        const {data : groups} = await getAllGroups();
  
        setContacts(contacts);
        setFilteredContacts(contacts);
        setGroups(groups);
  
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } 

    fetchData();
  },[]);

const addContact = async (values) => {

  try {
    setLoading(prevLoading => !prevLoading);

    // await contactSchema.validate(contact, {abortEarly:false});

    var response = await createContact(values);

    if(response.status === 201)
    {
      toast.success("مخاطب با موفقیت ساخته شد");
      setContacts(draft => {draft.push(response.data)});
      setFilteredContacts(draft => {draft.push(response.data)});

      setContact({});
      setLoading(prevLoading => !prevLoading);
      navigate("/contacts");    
    }
  } catch (error) {
    console.log(error);
    setLoading(prevLoading => !prevLoading);
  }
}

const confirmDelete = (id, fullname) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div
          dir="rtl"
          style={{
            backgroundColor: CURRENTLINE,
            border: `1px solid ${PURPLE}`,
            borderRadius: "1em",
          }}
          className="p-4"
        >
          <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
          <p style={{ color: FOREGROUND }}>
            مطمئنی که میخوای مخاطب {fullname} رو پاک کنی ؟
          </p>
          <button
            onClick={() => {
              removeContact(id);
              onClose();
            }}
            className="btn mx-2"
            style={{ backgroundColor: PURPLE }}
          >
            مطمئن هستم
          </button>
          <button
            onClick={onClose}
            className="btn"
            style={{ backgroundColor: Comment }}
          >
            انصراف
          </button>
        </div>
      );
    },
  });
};


  const onContactChange = (event) => {
    setContact(
      {...contact,
      [event.target.name]:event.target.value});
  }

  const removeContact = async (id) => {
    try{
      setLoading(true);
      console.log(typeof(id))
      const response = await deleteContact(id);

      if(response){
        const {data : contactsData } = await getAllContacts();
        setContacts(contactsData);
        setLoading(false);
        toast.success("مخاطب با موفقیت حذف شد");
      }
    }catch(error){
        console.log(error);
        setLoading(false);
      }
  }

  const searchContact = _.debounce((query) => {
    if(!query) return setFilteredContacts([...contacts]);
    console.log(!query)
    setFilteredContacts(contacts.filter(contact => {
      return contact.fullname.toLowerCase().includes(query.toLowerCase());
}));
  },1000)

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      setContact,
      contacts,
      filteredContacts,
      groups,
      onContactChange,
      deleteContact:confirmDelete,
      createContact:addContact,
      searchContact,
      searchContact
    }}>
      <div className="App">
        <ToastContainer rtl={true} theme={"colored"} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts"} />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/:id" element={<ViewContact />} />
        <Route path="/contacts/edit/:id" element={<EditContact />} />
      </Routes>
        
      </div>
    </ContactContext.Provider>
  );
};

export default App;

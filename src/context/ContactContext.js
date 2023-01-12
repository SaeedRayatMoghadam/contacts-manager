import { createContext } from "react";

export const ContactContext = createContext({
    loading : false,
    setLoading : () => {},
    contact : {},
    setContact : () => {},
    contacts : [],
    filteredContacts: [],
    groups: [],
    onContactChange: () => {},
    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    searchContact: () => {},
});
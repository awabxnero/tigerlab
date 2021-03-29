import React, { createContext, useState } from "react";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // since there are no accounts, every user is a new user :)
  const [newUser, setNewUser] = useState(true);
  // form data
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [email, setEmail] = useState();
  const [plateNumber, setPlateNumber] = useState();
  const [claims, setClaims] = useState();
  const [licence, setLicence] = useState(0);
  const [maker, setMaker] = useState();
  const [model, setModel] = useState();
  const [manufacturing, setManufacturing] = useState(new Date());
  const [age, setAge] = useState(100);
  return (
    <GlobalContext.Provider
      value={{
        age,
        setAge,
        manufacturing,
        setManufacturing,
        model,
        setModel,
        maker,
        setMaker,
        licence,
        setLicence,
        newUser,
        setNewUser,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        dateOfBirth,
        setDateOfBirth,
        email,
        setEmail,
        plateNumber,
        setPlateNumber,
        claims,
        setClaims,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

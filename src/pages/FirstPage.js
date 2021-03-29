import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { GlobalContext } from "../contexts/GlobalContext";
export default function FirstPage() {
  const {
    age,
    setAge,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    dateOfBirth,
    setDateOfBirth,
    email,
    setEmail,
  } = useContext(GlobalContext);
  const [error, setError] = useState(false);
  const history = useHistory();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // check if the age is more than 18 and less than 100
        if (age > 18 && age < 100) {
          // redirect to the second page
          history.push("/second-page");
        } else {
          // show error
          setError(true);
          document.getElementById("date-picker").style.borderColor = "red";
        }
      }}
      className="form w-3/4 lg:w-1/2 grid grid-cols-1 gap-6 place-items-center mt-40"
    >
      <div className="w-full flex flex-col justify-start">
        <p>
          First Name <span className="text-pal-blue">*</span>
        </p>
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          title="first-name"
          className="input"
          placeholder="Awab"
        />
      </div>
      <div className="w-full flex flex-col justify-start">
        <p>
          Last Name <span className="text-pal-blue">*</span>
        </p>
        <input
          required
          type="text"
          title="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input"
          placeholder="Nero"
        />
      </div>
      <div className="w-full flex flex-col justify-start">
        <p>
          Date of birth <span className="text-pal-blue">*</span>
        </p>
        <DatePicker
          id="date-picker"
          className="input  w-full"
          selected={dateOfBirth}
          onChange={(date) => {
            setDateOfBirth(date);
            // calcuate age
            const today = new Date();
            const birthDate = new Date(date);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            setAge(age);
            if (age > 18 && age < 100) {
              document.getElementById("date-picker").style.borderColor =
                "#C58FFF";
            } else {
              document.getElementById("date-picker").style.borderColor = "red";
            }
          }}
        />
      </div>
      <div className="w-full flex flex-col justify-start">
        <p>
          Email <span className="text-pal-blue">*</span>
        </p>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          title="email"
          className="input"
          placeholder="nero@awab.dev"
        />
      </div>
      <input
        title="submit"
        id="submit"
        type="submit"
        value="Next step"
        className="submit w-3/4 lg:w-1/2 button cursor-pointer"
      />
      {/* error dialog */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={error}
        onClose={() => {
          setError(false);
        }}
      >
        <Alert
          onClose={() => {
            setError(false);
          }}
          severity="error"
        >
          {"Sorry, You have to be in the age range from 18 to 100 :("}
        </Alert>
      </Snackbar>
    </form>
  );
}

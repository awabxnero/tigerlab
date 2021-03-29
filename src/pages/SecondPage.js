import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
  useContext,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackButton } from "../images/back-button.svg";
import { ReactComponent as LoadingIcon } from "../images/loading-icon.svg";
import { firestore } from "../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { GlobalContext } from "../contexts/GlobalContext";
export default function SecondPage() {
  const {
    setAge,
    manufacturing,
    setManufacturing,
    model,
    setModel,
    maker,
    setMaker,
    licence,
    setLicence,
    age,
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
  } = useContext(GlobalContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // refs to control the yes and no buttons
  const yesButton = useRef();
  const noButton = useRef();
  const history = useHistory();
  const submit = () => {
    // api call to firestore
    firestore
      .collection("applications")
      .doc(email)
      .set({
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        email: email,
        plateNumber: plateNumber,
        claims: claims,
        licence: licence,
        maker: maker,
        model: model,
        manufacturing: manufacturing,
      })
      .then(() => {
        // redirect to the third page
        history.push("/third-page");
        // reset state to its default values
        setFirstName();
        setLastName();
        setDateOfBirth(new Date());
        setEmail();
        setPlateNumber();
        setClaims(false);
        setLicence(0);
        setMaker();
        setModel();
        setManufacturing(new Date());
        setAge(100);
      })
      .catch(() => {
        // show error and stop loading
        setError(true);
        setLoading(false);
      });
  };
  useEffect(() => {
    // If any of the fields of the previous page empty or the age is less than 18 or more than, redirect to the previous page
    if (!firstName || !lastName || !(age > 18 && age < 100) || !email) {
      // redirect to the previous page
      history.push("/");
    }
  }, [
    // check for change
    firstName,
    lastName,
    age,
    email,
    history,
  ]);
  return (
    <Fragment>
      <div className="w-full">
        {/* redirect to the previous page */}
        <Link to="/">
          <BackButton className="w-14 h-14 my-20 ml-10 lg:ml-20" />
        </Link>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // start loading
          setLoading(true);
          // check if the claims questions is answered
          if (claims !== null) {
            submit();
          } else {
            // show error and change yes and no button colors to red
            setLoading(false);
            yesButton.current.style.borderColor = "#FF0000";
            noButton.current.style.borderColor = "#FF0000";
          }
        }}
        className=" w-3/4 lg:w-1/2 grid grid-cols-1 gap-6 place-items-center"
      >
        {/* You didn't specify the plate number format */}
        <div className="w-full flex flex-col justify-start">
          <p>
            Plate number <span className="text-pal-blue">*</span>
          </p>
          <input
            required
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            type="text"
            className="input"
            placeholder="WD3372H"
          />
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>
            Have you made any claims in the last 5 years?{" "}
            <span className="text-pal-blue">*</span>
          </p>
          <div
            onClick={() => {
              setClaims(true);
              yesButton.current.style.borderColor = "#C58FFF";
              noButton.current.style.borderColor = "#C58FFF";
              yesButton.current.style.background = "#A9FF03";
              noButton.current.style.background = "black";
            }}
            className="mt-4 flex flex-row items-center"
          >
            <div
              ref={yesButton}
              style={{ width: "20px", height: "20px" }}
              className="mr-6  border-pal-purple hover:bg-pal-green  border-2"
            ></div>
            <p>Yes</p>
          </div>
          <div
            onClick={() => {
              setClaims(false);
              yesButton.current.style.borderColor = "#C58FFF";
              noButton.current.style.borderColor = "#C58FFF";
              yesButton.current.style.background = "black";
              noButton.current.style.background = "#A9FF03";
            }}
            className="mt-4 flex flex-row items-center"
          >
            <div
              ref={noButton}
              style={{ width: "20px", height: "20px" }}
              className="mr-6  border-pal-purple hover:bg-pal-green border-2"
            ></div>
            <p>No</p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start">
          <label htmlFor="cars">
            For how many years did you possess a driving licence?{" "}
            <span className="text-pal-blue">*</span>
          </label>
          <select
            onChange={(e) => {
              setLicence(e.target.value);
            }}
            value={licence}
            className="input bg-black text-white mb-5 pr-2 w-full"
          >
            <option className="text-white pb-5" value="0">
              I don't have a driving licence
            </option>
            <option className="text-white pb-5" value="1">
              1
            </option>
            <option className="text-white pb-5" value="2">
              2
            </option>
            <option className="text-white pb-5" value="3">
              3
            </option>
            <option className="text-white pb-5" value="4">
              4
            </option>
            <option className="text-white pb-5" value="5+">
              5+
            </option>
          </select>
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>
            Car maker <span className="text-pal-blue">*</span>
          </p>
          <input
            required
            value={maker}
            onChange={(e) => setMaker(e.target.value)}
            type="text"
            className="input"
            placeholder="Lamborghini"
          />
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>
            Car model <span className="text-pal-blue">*</span>
          </p>
          <input
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
            type="text"
            className="input"
            placeholder="Aventador SVJ roadster"
          />
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>
            Date of manufacturing <span className="text-pal-blue">*</span>
          </p>
          <DatePicker
            className="input w-full"
            selected={manufacturing}
            onChange={(date) => {
              setManufacturing(date);
            }}
          />
        </div>
        <button className=" w-3/4 lg:w-1/2 flex flex-col items-center justify-center  button">
          {/* check if there is loading to either show the loading icon or the submit button */}
          {loading ? (
            <LoadingIcon className="w-10 h-10 animate-spin" />
          ) : (
            <input
              title="submit"
              type="submit"
              vlaue="Submit"
              className="w-full h-full cursor-pointer bg-transparent text-black font-extrabold"
            />
          )}
        </button>
      </form>
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
          {
            "There seems to be an error, Please refresh the page and try again :("
          }
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

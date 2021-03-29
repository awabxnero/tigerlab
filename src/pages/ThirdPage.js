import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Success } from "../images/success.svg";

export default function ThirdPage() {
  return (
    <Fragment>
      <div className=" flex-grow flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center">
          {/* svg image */}
          <Success className="w-1/2 h-1/2 mb-10" />
          <h1 title="success" className="text-4xl mb-10">
            Done!
          </h1>
          {/* redirect to the first page */}
          <Link to="/" className="button">
            Submit another application
          </Link>
        </div>
      </div>
    </Fragment>
  );
}

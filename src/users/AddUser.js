import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    dni: '',
    first_name: '',
    last_name: '',
    job: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const { dni, last_name, first_name, job } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return dni !== '' && first_name !== '' && last_name !== '' && job !== '';
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/users", user);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage("Error, check the included data and file it again")
      }
    }
  } 
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="DNI" className="form-label">
                DNI
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your DNI"
                name="dni"
                value={dni}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                FIRST NAME
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your First Name"
                name="first_name"
                value={first_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                LAST NAME
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Last Name"
                name="last_name"
                value={last_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="job" className="form-label">
                JOB
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Job"
                name="job"
                value={job}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary mx-2" disabled={!isFormValid()}>Submit</button>
            <Link className="btn btn-outline-danger mx-2" to={"/"}>Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}


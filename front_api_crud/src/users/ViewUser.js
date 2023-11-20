import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {

  const [user, setUser] = useState({
    dni: '',
    first_name: '',
    last_name: '',
    job: ''
  });

  const{dni} = useParams();

  useEffect(() => {
    loadUser()

  }, [])

  const loadUser=async()=>{
    const result=await axios.get(`http://localhost:8080/users/${dni}`);
    setUser(result.data)

  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>
          <div className="card">
            <div className="card-header">
              Details of user with dni:
              {user.dni}

              <ul className="list-group list-group-flush">

                <li className="list-group-item">
                  <b>FIRST NAME: </b>
                  {user.first_name}

                </li>
                <li className="list-group-item">
                  <b>LAST NAME: </b>
                  {user.last_name}

                </li>
                <li className="list-group-item">
                  <b>JOB: </b>
                  {user.job}

                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

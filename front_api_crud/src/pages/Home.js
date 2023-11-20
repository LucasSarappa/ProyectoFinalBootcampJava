import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {

    const [users,setUser] = useState([])

    const {dni}=useParams();

    useEffect(() =>{
        loadUser ();

    }, []);

    const loadUser = async() => {
        const result = await axios.get ("http://localhost:8080/users")
        setUser(result.data);
    };

    const deleteUser = async (dni) =>{
      await axios.delete(`http://localhost:8080/users/${dni}`)
      loadUser()
    }

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">DNI</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Job</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {
                users.map((user, dni) =>(
                    <tr key ={user.dni}>
                    <th scope="row">{user.dni}</th>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.job}</td>
                    <td>
                    <Link className="btn btn-primary mx-2" to={`/viewuser/${user.dni}`}>  View </Link>                        
                    <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.dni}`}>Edit</Link>
                    <Link className="btn btn-danger mx-2" onClick={() => deleteUser(user.dni)}>Delete</Link>


                    </td>
                  </tr>

                ))
            }

        </tbody>
        </table>
      </div>
    </div>
  );
}

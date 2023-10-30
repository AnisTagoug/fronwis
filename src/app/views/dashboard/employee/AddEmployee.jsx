import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddEmployee = ({ setAddShow }) => {
  const [dep, setDep] = useState([]);
  const [loading, setLoading] = useState(false);
  const [datatosend, setDatatosend] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    event: "",
  });
  useEffect(() => {
    fetchDep();
  }, []);
  const fetchDep = async () => {
    const data = await axios.get("http://localhost:8089/api/event/findAll");
    setDep(data.data);
  };
  const onChangeForm = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, [e.target.name]: e.target.value });
    console.log(datatosend);
  };
  const onChangeSelect = (e) => {
    e.preventDefault();
    setDatatosend({ ...datatosend, event: e.target.value });
  };
  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const send = await axios.post(
        "http://localhost:8093/joueur/add",
        datatosend
      );
      console.log(send);
  
      // After successfully adding an employee, increment the event's "nbrp"
      await axios.put(`http://localhost:8089/api/event/incrementNbrp/${datatosend.event}`);
      
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <div
      className="addEmpWrapper"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: "10000000000",
      }}
    >
      <div
        className="addEmpContainer"
        style={{
          padding: "15px 30px",
          backgroundColor: "white",
          borderRadius: "8px",
          minWidth: "350px",
        }}
      >
        <div
          className="addEmpFirst"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Add joueur : </h2>
          <CloseIcon
            onClick={() => setAddShow(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <form>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
    
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Player Username:</label>
            <input
              type="text"
              name="username"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              onChange={(e) => onChangeForm(e)}
              style={{ width: "100%", fontSize: "18px", marginBottom: "16px" }}
            />
          </div>
   
          <div
            className="form-lins"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label>Evenement :</label>
            <select
  style={{ marginBottom: "24px" }}
  onChange={(e) => onChangeSelect(e)}
>
  {dep &&
    dep.map((e) => (
      <option key={e.id} value={e.id}>
        {e.title}
      </option>
    ))
  }
</select>

          </div>

          <button
            type="submit"
            onClick={(e) => sendData(e)}
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              padding: "8px",
              color: "white",
              outline: "none",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

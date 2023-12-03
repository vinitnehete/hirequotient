import { TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import "./Table.css";
import ReadOnylRows from "./ReadOnlyRows";
import EditableRow from "./EditableRow";


const Table = () => {
  
  const [page, setPage] = useState(1);
  const [search , setSearch] = useState("");
  const [data1, setData1] = useState([]);

  const [editrow, setEditablerow] = useState(null);

  const fetch1 = async () => {
    const resp = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    const result = await resp.json();

    setData1(result);
  };
  useEffect(() => {
    fetch1();
  }, []);

  const handlepage = (selectpage) => {
    if (
      selectpage >= 1 &&
      selectpage <= Math.ceil(data1.length / 10) &&
      selectpage !== page
    )
      setPage(selectpage);
  };

  const handleDeleteRow = (id) => {
    const newData = data1.filter((row) => row.id !== id);
    setData1(newData);
  };



  const handleClickEdit= (id)=>{
    setEditablerow(id)
  }

  const [state1 , SetState] = useState({
    Name:"",
    Role:"",
    Email:""
  })

  const handleEditChange = (e) =>{
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    const newformData = {...state1}
    newformData[fieldName] = fieldValue
    SetState(newformData)
  }

  console.log(state1);

const handleSubmit = (e) => {
  e.preventDefault();
  const index1 = data1.findIndex((item) => item.id === editrow);
  
  const newObject = {
    id:index1,
    name: state1.Name,
    email: state1.Email,
    role: state1.Role,
  };
  const newData = [...data1];
  const index = newData.findIndex((item) => item.id === editrow);
  newData[index] = newObject;
  setData1(newData);
  setEditablerow(null);
  

};

  console.log(data1);
  const handleCancelButton = () =>{
    setEditablerow(null)
  }

  return (
    <>
    <div className="search-box">
      <TextField id="outlined-basic" label="Search" variant="outlined"   style={{width: '50%'}}onChange={(e)=>{setSearch(e.target.value)}} />
      </div>
    <div className="container">
      <form onSubmit={handleSubmit}>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            
       
        
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data1.filter((item) => {
               
                if(search.toLowerCase() === ""){
                  return item;
                }else if(item.name.toLowerCase().includes(search)){
                  return item
                }else if(item.email.toLowerCase().includes(search)){
                  return item
                }else if(item.role.toLowerCase().includes(search)){
                  return item;
                }

              }).slice(page * 10 - 10, page * 10).map((row) => (
            <Fragment key={row.id}>
              {editrow === row.id ? (
                <EditableRow row={row} handleEditChange={handleEditChange} handleCancelButton={handleCancelButton} />
              ) : (
                <ReadOnylRows row={row} handleClickEdit={handleClickEdit} handleDeleteRow={handleDeleteRow} />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      </form>

      

      {
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disabled"}
            onClick={() => handlepage(page - 1)}
          >
            ⬅️
          </span>

          {[...Array(Math.ceil(data1.length / 10))].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selected_page " : ""}
                onClick={() => handlepage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={
              page < Math.ceil(data1.length / 10) ? "" : "pagination_disabled"
            }
            onClick={() => handlepage(page + 1)}
          >
            ➡️
          </span>
        </div>
        
      }
      </div>
    </>
  );
};

export default Table;

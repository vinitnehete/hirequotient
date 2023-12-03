

const EditableRow = ({row ,handleEditChange , handleCancelButton }) => {



  
  
  
  return (

      <tr >
        
       
        <td>
          <input type="test" required="required" placeholder="Name" name="Name" value={row.Name} onChange={handleEditChange}></input>
        </td>
        <td>
          <input type="test" required="required" placeholder="Role" name="Email" value={row.Email} onChange={handleEditChange}></input>
        </td>
        <td> 
          <input type="test" required="required" placeholder="Email" name="Role" value={row.Role} onChange={handleEditChange}></input>
        </td>
        <td>
          <button type="Submit">Save</button>
          <button onClick={handleCancelButton}>Cancel</button>
        </td>
      </tr>
  
  );
};

export default EditableRow;

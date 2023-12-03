const ReadOnylRows = ({ row, handleClickEdit, handleDeleteRow }) => {
  return (
    <tr key={row.id}>
      
      <td>{row.name}</td>
      <td>{row.role}</td>
      <td>{row.email}</td>
      <td>
        <button onClick={() => handleDeleteRow(row.id)}>␡</button>
        <button onClick={() => handleClickEdit(row.id)}>✍️</button>
      </td>
    </tr>
  );
};

export default ReadOnylRows;

import React, { useState } from 'react';

const table = () => {
  const [data, setData] = useState([['']]);

  const addRow = () => {
    setData([...data, Array(data[0].length).fill('')]);
  };

  const addColumn = () => {
    setData(data.map(row => [...row, '']));
  };
  const handleDelete = () => {
    const updatedData = data.filter(row => !row._selected);
    setData(updatedData);
};
const handleDownload = () => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  saveAs(blob, 'modified_data.xlsx');
};

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
};
const handleSaveToBackend = async () => {
  try {
      const response = await axios.post('http://localhost:5000/api/save-excel-data', { data });
      console.log(response.data.message);
  } catch (error) {
      console.error('Error saving data to backend:', error);
  }
};

  const handleChange = (e, rowIndex, colIndex) => {
    const newData = data.map((row, rIdx) => 
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? e.target.value : cell))
    );
    setData(newData);
  };

  return (
    <table border="1">
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input 
                  type="text" 
                  value={cell} 
                  onChange={(e) => handleChange(e, rowIndex, colIndex)} 
                  
                />
              </td>
            ))}
            <td>
              <button onClick={addRow}>+</button>
            </td>
            <td>
            <button onClick={handleDelete}>Delete Selected Rows</button>
            </td>
            <td> <button onClick={handleDownload}>modified Data</button></td>
            <td> <button onClick={handleSaveToBackend}>Save to Backend</button></td>
          </tr>
        ))}
        <tr>
          {data[0].map((_, colIndex) => (
            <td key={colIndex}>
              <button onClick={addColumn}>+</button>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default table;

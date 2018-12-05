import React from "react";

const TableBody = ({ datas, columns }) => {
  return (
    <tbody>
      {datas.map(data => (
        <tr key={data._id}>
          {columns.map((c, i) => {
            return (
              <td key={i}>{c.content ? c.content(data._id) : data[c.path]}</td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

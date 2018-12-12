import React from "react";

const TableBody = ({ datas, columns }) => {
  return (
    <tbody>
      {datas.map(data => (
        <tr key={data._id}>
          {columns.map((c, i) => {
            return (
              <td key={`${data._id}_${i}`}>
                {c.content ? c.content(data) : data[c.path]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

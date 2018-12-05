import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((c, i) => (
          <th scope="col" key={i}>
            {c.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

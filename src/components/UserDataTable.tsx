import React, { useState } from "react";
import { UserData } from "../types/UserData";
import initialData from "../data.json";

interface UserTableRowProps {
  userData: UserData;
  handleDelete: any;
  index: number;
}

const UserTableColNames = ({ names }: any) => {
  return Object.keys({
    "": null,
    ...names,
  }).map((key) => (
    <td key={key} className="px-6 py-4 whitespace-nowrap bg-zinc-100">
      {key}
    </td>
  ));
};

const UserTableRow: React.FC<UserTableRowProps> = ({
  userData,
  handleDelete,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const [childRandomKey] = Object.keys(userData.children);
  const childDataRecords = userData.children[childRandomKey]?.records;

  return (
    <tbody>
      <tr>
        <td>
          {Object.keys(userData.children).length ? (
            <button onClick={toggleExpansion}>
              {isExpanded ? "Hide" : "Show"}
            </button>
          ) : null}
        </td>

        {Object.entries(userData.data).map(([key, value]) => (
          <td key={key} className="px-6 py-4 whitespace-nowrap">
            {value}
          </td>
        ))}
        <td>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </td>
      </tr>
      {isExpanded && userData.children && (
        <tr>
          <td className="ml-6 bg-zinc-100">
            <UserTableColNames names={childDataRecords[0].data} />
            {childDataRecords.map((childRow: any) => {
              return (
                <UserTableRow
                  userData={childRow}
                  index={index}
                  handleDelete={() => handleDelete(childRow.data.ID)}
                />
              );
            })}
          </td>
        </tr>
      )}
    </tbody>
  );
};

const UserDataTable: React.FC = () => {
  const [data, setData] = useState(initialData);

  const handleDelete = (rowId: number) => {
    const newData = [...data];
    newData.splice(rowId, 1);
    setData(newData);
  };
  return (
    <div className="overflow-x-auto">
      <table className=" divide-y divide-gray-200">
        <UserTableColNames names={data[0].data} />

        {data.map((item, index) => (
          <UserTableRow
            key={index}
            userData={item}
            index={index}
            handleDelete={handleDelete}
          />
        ))}
      </table>
    </div>
  );
};

export default UserDataTable;

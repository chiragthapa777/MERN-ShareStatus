import React  from "react";


export default function UserCard(props) {
  return (
    <tr className="UserCard">
      <td className="tableUserName">chirag</td>
      <td className="tableUserName">email</td>
      <td>
        <button className="button">
          follow
        </button>
      </td>
      <td>
        <button className="button" >profile</button>
      </td>
    </tr>
  );
}

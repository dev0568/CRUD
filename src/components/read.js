import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
  };
  const onDelete = (id) => {
    axios.delete(`https://640975e26ecd4f9e18b11e7a.mockapi.io/fakeData/${id}`);
  };

  useEffect(() => {
    axios
      .get(`https://640975e26ecd4f9e18b11e7a.mockapi.io/fakeData`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "Checked" : "Unchecked"}
                </Table.Cell>
                <Table.Cell>
                  <Link to="/update">
                    <Table.Cell>
                      <Button onClick={() => setData(data)}>Update</Button>
                    </Table.Cell>
                  </Link>
                  <Link to="/read">
                    <Table.Cell>
                      <Button onClick={() => onDelete(data.id)}>Delete</Button>
                    </Table.Cell>
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

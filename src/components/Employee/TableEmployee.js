import axios from "axios";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EmployeeApi from "../api/EmployeeApi";
import PageviewIcon from "@material-ui/icons/Pageview";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const TableEmployee = () => {
  const employees = useSelector((state) => state.EmployeeReducer.employeesData);
  const searchText = useSelector((state) => state.EmployeeReducer.searchText);
  const history = useHistory();
  const view = (id) => {
    // console.log(`view id : ${id}`);
    history.push(`/employees/view/${id}`);
  };

  const edit = (id) => {
    // console.log(`edit id : ${id}`);
    history.push(`/employees/edit/${id}`);
  };

  const deleted = (id) => {
    // confirm form
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete employee id : {id} ?</p>
            <button
              className="confirm-button"
              onClick={() => {
                deleteEmployee((id = { id }));
                onClose();
              }}
            >
              Yes
            </button>
            <button className="confirm-button" onClick={onClose}>
              No
            </button>
          </div>
        );
      },
    });
  };

  function deleteEmployee({ id }) {
    axios
      .delete(`${EmployeeApi.api}/${id}`, {
        headers: {
          "x-api-key": `${EmployeeApi.x_api_key}`,
        },
      })
      .then(() => {
        console.log(`delete employee id ${id} success`);
        history.push(`/employees`);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">FirstName</TableCell>
              <TableCell align="center">LastName</TableCell>
              <TableCell align="center">Position</TableCell>
              <TableCell align="center">View</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .filter((employee) => {
                // search filter and check current employee
                if (searchText === "" && employee.statusID === 1) {
                  return true;
                } else if (
                  employee.firstNameEN
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) &&
                  employee.statusID === 1
                ) {
                  return true;
                }
                return false;
              })
              // list employee
              .map((employee) => (
                <TableRow key={employee.empID}>
                  <TableCell align="center" component="th" scope="row">
                    {employee.empID}
                  </TableCell>
                  <TableCell align="center">{employee.firstNameEN}</TableCell>
                  <TableCell align="center">{employee.lastNameEN}</TableCell>
                  <TableCell align="center">
                    {employee.position.nameEN}
                  </TableCell>
                  <TableCell align="center">
                    <PageviewIcon
                      className="icon"
                      onClick={() => {
                        view(employee.empID);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon
                      className="icon"
                      onClick={() => {
                        edit(employee.empID);
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="icon"
                    onClick={() => deleted(employee.empID)}
                  >
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableEmployee;

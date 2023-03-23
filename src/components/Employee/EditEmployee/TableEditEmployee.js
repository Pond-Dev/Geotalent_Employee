import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import EmployeeApi from "../../api/EmployeeApi";
import { useSelector, useDispatch } from "react-redux";
const TableEditEmployee = () => {
  const dispatch = useDispatch();
  const dataEmployee = useSelector(
    (state) => state.EmployeeReducer.dataEditEmployee
  );
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    confirm();
  };

  const onChange = (e) => {
    dispatch({
      type: "UPDATE_DATA_EMPLOYEE",
      payloadUpdateEmployee: {
        ...dataEmployee,
        [e.target.name]: e.target.value.trim(),
      },
    });
  };
  const confirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to edit employee id {dataEmployee.empID} ?</p>
            <button
              className="confirm-button"
              onClick={() => {
                console.log(dataEmployee);
                editEmployee();
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
  function editEmployee() {
    axios
      .put(`${EmployeeApi.api}/${dataEmployee.empID}`, dataEmployee, {
        headers: {
          "x-api-key": `${EmployeeApi.x_api_key}`,
        },
      })
      .then(() => {
        console.log(`edit employee id ${dataEmployee.empID} success`);
        history.push(`/employees`);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  }

  return (
    <div>
      <h2 className="header">Edit Employee ID {dataEmployee.empID}</h2>
      <div>
        <form className="input-form" onSubmit={onSubmit}>
          <TextField
            className="input-field"
            label="Enter The First Name (Thai)"
            variant="standard"
            type="text"
            name="firstNameTH"
            onChange={onChange}
            value={dataEmployee.firstNameTH || ""}
          />
          <TextField
            className="input-field"
            type="text"
            name="lastNameTH"
            label="Enter The Last Name (Thai)"
            variant="standard"
            onChange={onChange}
            value={dataEmployee.lastNameTH || ""}
          />
          <TextField
            className="input-field"
            type="text"
            name="firstNameEN"
            label="Enter The First Name (English)"
            variant="standard"
            onChange={onChange}
            value={dataEmployee.firstNameEN || ""}
          />
          <TextField
            className="input-field"
            type="text"
            name="lastNameEN"
            label="Enter The Last Name (English)"
            variant="standard"
            onChange={onChange}
            value={dataEmployee.lastNameEN || ""}
          />
          <TextField
            className="input-field"
            type="text"
            name="nickName"
            label="Enter The Nick Name"
            variant="standard"
            onChange={onChange}
            value={dataEmployee.nickName || ""}
          />
          <TextField
            className="input-field"
            type="text"
            name="email"
            label="Enter The Email Address"
            variant="standard"
            onChange={onChange}
            value={dataEmployee.email || ""}
          />
          <TextField
            className="input-field"
            type="text"
            name="telephone"
            label="Enter The Telephone Number"
            variant="standard"
            onChange={onChange}
            value={dataEmployee.telephone || ""}
          />
          <Button className="input-field-button" type="submit">
            Edit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TableEditEmployee;

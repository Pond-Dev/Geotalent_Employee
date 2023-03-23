import { useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import EmployeeApi from "../api/EmployeeApi";
import { useSelector, useDispatch } from "react-redux";

const InputForm = () => {
  const dispatch = useDispatch();

  const dataEmployee = useSelector(
    (state) => state.RegisterReducer.defaultData
  );
  const dataDepartment = useSelector(
    (state) => state.RegisterReducer.department
  );
  const dataPosition = useSelector((state) => state.RegisterReducer.position);

  useEffect(() => {
    const fetchInitialData = async () => {
      const result = await axios.get(
        `https://docker.geotalent.co.th/hr-qa/api/v1/employees/string/info`,
        {
          headers: {
            "x-api-key": `${EmployeeApi.x_api_key}`,
          },
        }
      );
      dispatch({
        type: "FETCH_DATA_REGISTER_PAGE",
        payloadData: result.data.result,
      });
    };
    const fetchDataDepartment = async () => {
      const result = await axios.get(
        `https://docker.geotalent.co.th/hr-qa/api/v1/lookup/department`,
        {
          headers: {
            "x-api-key": `${EmployeeApi.x_api_key}`,
          },
        }
      );
      dispatch({
        type: "FETCH_DEPARTMENT_REGISTER_PAGE",
        payloadDepartment: result.data.result,
      });
    };
    const fetchDataPosition = async () => {
      const result = await axios.get(
        `https://docker.geotalent.co.th/hr-qa/api/v1/lookup/position`,
        {
          headers: {
            "x-api-key": `${EmployeeApi.x_api_key}`,
          },
        }
      );
      dispatch({
        type: "FETCH_POSITION_REGISTER_PAGE",
        payloadPosition: result.data.result,
      });
    };

    fetchInitialData();
    fetchDataPosition();
    fetchDataDepartment();
  }, [dispatch]);

  const history = useHistory();

  const onChange = (e) => {
    dispatch({
      type: "UPDATE_DATA_REGISTER_PAGE",
      payloadData: {
        ...dataEmployee,
        [e.target.name]: e.target.value.trim(),
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    confirm();
  };

  // confirm form
  const confirm = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to add employee?</p>
            <button
              className="confirm-button"
              onClick={() => {
                // console.log(dataEmployee);
                createEmployee();
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

  function createEmployee() {
    axios
      .post(`${EmployeeApi.api}`, dataEmployee, {
        headers: {
          "x-api-key": `${EmployeeApi.x_api_key}`,
        },
      })
      .then(() => {
        console.log(`add employee success`);
        history.push(`/employees`);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  }

  return (
    <div>
      <h2 className="header">Register New Employee</h2>
      <form className="input-form" onSubmit={onSubmit}>
        <TextField
          required
          className="input-field"
          label="Enter The Employee ID"
          variant="standard"
          type="text"
          name="empID"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          label="Enter The First Name (Thai)"
          variant="standard"
          type="text"
          name="firstNameTH"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          type="text"
          name="lastNameTH"
          label="Enter The Last Name (Thai)"
          variant="standard"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          type="text"
          name="firstNameEN"
          label="Enter The First Name (English)"
          variant="standard"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          type="text"
          name="lastNameEN"
          label="Enter The Last Name (English)"
          variant="standard"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          type="text"
          name="nickName"
          label="Enter The Nick Name"
          variant="standard"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          type="text"
          name="email"
          label="Enter The Email Address"
          variant="standard"
          onChange={onChange}
        />
        <TextField
          required
          className="input-field"
          type="text"
          name="telephone"
          label="Enter The Telephone Number"
          variant="standard"
          onChange={onChange}
        />
        <select onChange={onChange} name="department" className="select-input">
          <option disabled>Select The Department</option>
          {dataDepartment.map((department) => {
            return (
              <option
                key={department.departmentID}
                value={department.departmentID}
              >
                {" "}
                {department.fullNameEN}
              </option>
            );
          })}
        </select>

        <select onChange={onChange} name="position" className="select-input">
          <option disabled>Select The Position</option>
          {dataPosition.map((position) => {
            return (
              <option key={position.positionID} value={position.positionID}>
                {" "}
                {position.nameEN}
              </option>
            );
          })}
        </select>
        <Button className="input-field-button" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default InputForm;

import axios from "axios";
import { useEffect } from "react";
import TableEmployee from "./TableEmployee";
import EmployeeApi from "../api/EmployeeApi";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
const EmployeePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${EmployeeApi.api}`, {
        headers: {
          "x-api-key": `${EmployeeApi.x_api_key}`,
        },
      });
      dispatch({
        type: "FETCH_DATA_EMPLOYEE_PAGE",
        payloadDataEmployees: result.data.result,
      });
    };
    fetchData();
  }, [dispatch]);
  const onChange = (e) => {
    dispatch({
      type: "SEARCH_TEXT_EMPLOYEE_PAGE",
      payloadSearchText: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="header">List of Employees</h2>
      <p>Search</p>
      <TextField
        type="text"
        name="search"
        variant="standard"
        onChange={onChange}
      />
      <TableEmployee />
    </div>
  );
};

export default EmployeePage;

import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeApi from "../../api/EmployeeApi";
import TableEditEmployee from "./TableEditEmployee";
import { useDispatch } from "react-redux";
const EditEmployee = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const apiViewEmployee = `${EmployeeApi.api}/${id}/info`;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await axios.get(`${apiViewEmployee}`, {
        headers: {
          "x-api-key": `${EmployeeApi.x_api_key}`,
        },
      });
      dispatch({
        type: "FETCH_DATA_EDIT_EMPLOYEE",
        payloadDataEditEmployee: result.data.result,
      });
    };
    fetchApi();
  }, [apiViewEmployee, dispatch]);

  return (
    <div>
      <TableEditEmployee />
    </div>
  );
};

export default EditEmployee;

import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EmployeeApi from "../../api/EmployeeApi";
import TableViewEmployee from "./TableViewEmployee";
import { useDispatch } from "react-redux";
const ViewEmployee = () => {
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
      // console.log(result.data.result);
      dispatch({
        type: "FETCH_DATA_VIEW_EMPLOYEE",
        payloadDataViewEmployee: result.data.result,
      });
    };
    fetchApi();
  }, [apiViewEmployee, dispatch]);

  return (
    <div>
      <div>
        <TableViewEmployee />
      </div>
    </div>
  );
};

export default ViewEmployee;

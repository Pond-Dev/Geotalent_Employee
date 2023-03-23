import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useSelector } from "react-redux";
const TableViewEmployee = () => {
  const dataEmployee = useSelector(
    (state) => state.EmployeeReducer.dataViewEmployee
  );
  return (
    <div>
      <h2 className="header">Employee ID {dataEmployee.empID}</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Full Name TH</TableCell>
              <TableCell align="center">{dataEmployee.fullNameTH}</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="center">Full Name EN</TableCell>
              <TableCell align="center">
                {dataEmployee.firstNameEN}
                {"   "} {dataEmployee.lastNameEN}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="center">NickName</TableCell>
              <TableCell align="center">{dataEmployee.nickName}</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">{dataEmployee.email}</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell align="center">Telephone</TableCell>
              <TableCell align="center">{dataEmployee.telephone}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableViewEmployee;

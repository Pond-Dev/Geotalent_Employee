import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Error from "./components/Error/ErrorPage";
import RegisterPage from "./components/Register/RegisterPage";
import EmployeePage from "./components/Employee/EmployeePage";
import ViewEmployee from "./components/Employee/ViewEmployee/ViewEmployee";
import EditEmployee from "./components/Employee/EditEmployee/EditEmployee";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/employees" component={EmployeePage} />
          <Route exact path="/employees/view/:id" component={ViewEmployee} />
          <Route exact path="/employees/edit/:id" component={EditEmployee} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="*" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

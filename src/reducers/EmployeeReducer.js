const initialState = {
  searchText: "",
  employeesData: [],
  dataViewEmployee: [],
  dataEditEmployee: [],
};

export default function EmployeeReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DATA_EMPLOYEE_PAGE":
      return {
        ...state,
        employeesData: action.payloadDataEmployees,
      };

    case "SEARCH_TEXT_EMPLOYEE_PAGE":
      return {
        ...state,
        searchText: action.payloadSearchText,
      };
    case "FETCH_DATA_VIEW_EMPLOYEE":
      return {
        ...state,
        dataViewEmployee: action.payloadDataViewEmployee,
      };
    case "FETCH_DATA_EDIT_EMPLOYEE":
      return {
        ...state,
        dataEditEmployee: action.payloadDataEditEmployee,
      };
    case "UPDATE_DATA_EMPLOYEE":
      return {
        ...state,
        dataEditEmployee: action.payloadUpdateEmployee,
      };

    default:
      return state;
  }
}

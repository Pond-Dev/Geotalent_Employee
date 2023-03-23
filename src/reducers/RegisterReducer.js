const initialState = {
  defaultData: [],
  department: [],
  position: [],
};

export default function RegisterReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_DATA_REGISTER_PAGE":
      return {
        ...state,
        defaultData: action.payloadData,
      };
    case "FETCH_DEPARTMENT_REGISTER_PAGE": {
      return {
        ...state,
        department: action.payloadDepartment,
      };
    }
    case "FETCH_POSITION_REGISTER_PAGE": {
      return {
        ...state,
        position: action.payloadPosition,
      };
    }
    case "UPDATE_DATA_REGISTER_PAGE":
      return {
        ...state,
        defaultData: action.payloadData,
      };
    default:
      return state;
  }
}

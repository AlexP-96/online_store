const stateUser = {
  login: "",
  password: "",
};

const addTest = ({ login, password }) => {
  return {
    type: "test",
    action: { login, password },
  };
};

const regUser = (state = stateUser, { type, action}) => {
  switch (type) {
    case "test":
      return {
        ...state, 
        login: action.login,
        password: action.password,
      };
    default:
      return { ...state };
  }
};
export default regUser;

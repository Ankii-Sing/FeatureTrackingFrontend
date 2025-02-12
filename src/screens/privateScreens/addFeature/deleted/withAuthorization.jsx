// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../../../store/userContext";

// const withAuthorization = (WrappedComponent) => {
//   return (props) => {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//       if (!user || !["ADMIN", "PRODUCT_MANAGER", "EPIC_OWNER"].includes(user.role)) {
//         alert("You are not authorized.");
//         navigate("/Feature");
//       }
//     }, [user, navigate]);

//     return user ? <WrappedComponent {...props} /> : null;
//   };
// };

// export default withAuthorization;
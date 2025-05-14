import { useContext } from "react";
import { UserDetailContext } from "../context/UserDetailContext";

export default () => {
  const userDetailContext = useContext(UserDetailContext);

  if (!userDetailContext) {
    throw new Error("UserDetailContext is not provided");
  }

  const { userDetails } = userDetailContext;

  if (!userDetails) {
    return "no user available";
  }

  const firstname = userDetails.firstname;
  const middlename = userDetails.middlename;
  const lastname = userDetails.lastname;

  if (userDetails) {
    return firstname + " " + middlename.substring(0, 1) + ". " + lastname;
  } else {
    return "no user available";
  }
};

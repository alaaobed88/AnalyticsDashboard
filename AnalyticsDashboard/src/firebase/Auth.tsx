import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "@/scenes/navbar";

export interface IAuthRouteProps {
  children: React.ReactNode; // Include the children property
}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("unauthorized");
        navigate("/login");
      }
    });

    return () => AuthCheck();
  }, [auth, navigate]);

  if (loading) return <p>loading ...</p>;

  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
};

export default AuthRoute;

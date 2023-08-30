import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [triedLoggingIn, setTriedLoggingIn] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [hidden, setHidden] = useState(true);
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    return hasUppercase && hasLowercase && hasSpecialChar;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmailChange = (event: { target: { value: any } }) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePasswordChange = (event: { target: { value: any } }) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));
  };

  const signinWithEmailAndPassword = async () => {
    if (isValidEmail && isValidPassword) {
      setAuthing(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log(response.user.uid);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setLoginError("Please provide valid email and password!");
          setAuthing(false);
        });
    } else if (!isValidEmail || !isValidPassword) {
      setTriedLoggingIn(true);
      setLoginError("Please provide valid email and password!");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: (theme) => theme.palette.secondary.main,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          sx={{
            "& input": { color: "white" },
            "& label": { color: "#12efc8" },
          }}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
        />
        {!isValidEmail && triedLoggingIn && (
          <Typography color="red">Invalid email format</Typography>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          sx={{
            "& input": { color: "white" },
            "& label": { color: "#12efc8" },
          }}
          name="password"
          label="Password"
          type={hidden ? "password" : "text"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={() => setHidden(!hidden)}>
          <Avatar
            sx={{
              color: "white",
              backgroundColor: (theme) => theme.palette.secondary.main,
            }}
          >
            <VisibilityIcon />
          </Avatar>
        </Button>

        <Typography marginTop="0.5rem" color="red">{loginError}</Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginY: 3 }}
          onClick={() => signinWithEmailAndPassword()}
          disabled={authing}
        >
          Sign In
        </Button>
        <Typography color="white">
          Use Demo email: alaabed88@gmail.com <br /> password: Myp@ssword
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;

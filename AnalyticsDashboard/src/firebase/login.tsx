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


export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateInputs = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const signinWithEmailAndPassword = async () => {
    if (validateInputs()) {
      setAuthing(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          console.log(response.user.uid);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setAuthing(false);
        });
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
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          error={!!emailError}
          helperText={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(""); // Clear error when user types
          }}
        />
        <TextField
          variant="outlined"
          
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          error={!!passwordError}
          helperText={passwordError}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(""); // Clear error when user types
          }}
        />
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
          Use Demo email: alaabed88@gmail.com password: 123456
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;

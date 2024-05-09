"use client";

import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { AuthService } from "@/services/AuthService";
import { useAuthContext } from "@/context/AuthContext";

import styles from "./login.module.scss";
import { SignInData } from "@/constants/interfaces";
import { localStorageKeys } from "@/constants/localStorage";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState({ type: "", text: "" });
  const { setCurrentUser } = useAuthContext();
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const res = await AuthService.signIn(formData);
      if (res.success) {
        setAlert({ text: "Successfully loged in.", type: "success" });
        setCurrentUser(res.user);
        localStorage.setItem(localStorageKeys.authToken, res.token);
      } else {
        setAlert({ text: res.error, type: "error" });
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <FormControl className={styles.inner}>
        {alert.type && (
          <Alert variant="filled" severity={alert.type as any}>
            {alert.text}
          </Alert>
        )}
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button disabled={isLoading} variant="contained" onClick={handleSubmit}>
          {isLoading ? <CircularProgress color="info" /> : "Sign In"}
        </Button>
        <p>
          Have not account yet? <Link href="/signup">Sign Up</Link>
        </p>
      </FormControl>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  Snackbar,
  TextField,
} from "@mui/material";
import styles from "./signup.module.scss";
import Link from "next/link";
import { AuthService } from "@/services/AuthService";
import { SignUpData } from "@/constants/interfaces";
import { useAuthContext } from "@/context/AuthContext";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>("");
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    surname: "",
    email: "",
    password: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    birthDate: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
      formIsValid = false;
    }

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

    if (!formData.birthDate.trim()) {
      newErrors.birthDate = "Date is required";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const res = await AuthService.signUp(formData);
      if (res.success) {
        setAlert("You have successfully registered.");
      }
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <FormControl className={styles.inner}>
        {alert && (
          <Alert variant="filled" severity="success">
            {alert}
          </Alert>
        )}
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Surname"
          variant="outlined"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          error={!!errors.surname}
          helperText={errors.surname}
        />
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
        <TextField
          id="date-input"
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          error={!!errors.birthDate}
          helperText={errors.birthDate}
        />
        <Button disabled={isLoading} variant="contained" onClick={handleSubmit}>
          {isLoading ? <CircularProgress color="info" /> : "Sign Up"}
        </Button>
        <p>
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </FormControl>
    </div>
  );
}

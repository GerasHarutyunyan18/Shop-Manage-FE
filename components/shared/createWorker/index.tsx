"use client";

import { useState } from "react";
import { AddCircleOutlined } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { Button, CircularProgress, Modal, TextField } from "@mui/material";
import { WorkerService } from "@/services/WorkerService";
import { useAuthContext } from "@/context/AuthContext";

import styles from "./createWorker.module.scss";
import { useMarketContext } from "@/context/MarketContext";
import { useWorkerContext } from "@/context/WorkerContext";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { marketView } = useMarketContext();
  const { addWorker } = useWorkerContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<any>({
    name: "",
    surname: "",
    email: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    birthDate: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
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

    if (!formData.name) {
      newErrors.name = "Name is required";
      formIsValid = false;
    }

    if (!formData.surname) {
      newErrors.surname = "Surname is required";
      formIsValid = false;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Birht Date is required";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const res = await WorkerService.createUser(
        formData,
        user.token,
        marketView.id
      );
      if (res.success) {
        addWorker(res.user);
      }
    }
    setIsLoading(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        endIcon={<AddCircleOutlined />}
      >
        Create worker
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className={styles.container}>
          <h2 className={styles.title}>
            Create Worker <PersonIcon />{" "}
          </h2>
          <div className={styles.form}>
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
              label="Birth Date"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              error={!!errors.birthDate}
              helperText={errors.birthDate}
            />
            <Button
              disabled={isLoading}
              variant="contained"
              onClick={handleSubmit}
            >
              {isLoading ? <CircularProgress color="info" /> : "Create"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

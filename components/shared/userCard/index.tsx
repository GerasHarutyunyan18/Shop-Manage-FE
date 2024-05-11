import { User } from "@/constants/types";
import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Input,
  Rating,
  TextField,
} from "@mui/material";
import { generateDeleteText, stringAvatar } from "@/constants/helpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./userCard.module.scss";
import { useWorkerContext } from "@/context/WorkerContext";
import { useState } from "react";
import { Warning } from "@mui/icons-material";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const { deleteWorker, isLoading } = useWorkerContext();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [isCommandValid, setIsCommandValid] = useState<boolean>(true);
  const [submitCommand, setSubmitCommand] = useState<string>("");

  const handleDelete = async () => {
    const validCommand = generateDeleteText(user.id);
    if (validCommand === submitCommand) {
      deleteWorker(user.id);
    } else {
      setIsCommandValid(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Avatar
          src={user.image}
          {...stringAvatar(user.name + " " + user.surname)}
        />
        <div className={styles.userInfo}>
          <span>
            <b>{user.name + " " + user.surname}</b>
          </span>
          <span>{user.role || "Without role"}</span>
        </div>
      </div>
      <div className={styles.rating}>
        Rating`
        <br />
        <Rating readOnly value={user.rate} />
      </div>
      <div className={styles.rating}>
        <span>
          Birth Date` <br />
          <b>{user.birthDate}</b>
        </span>
      </div>
      <div className={styles.actionsContainer}>
        <Button>
          <EditIcon />
        </Button>
        <Button onClick={handleOpenDeleteDialog} color="error">
          <DeleteIcon color="error" />
        </Button>
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <div className={styles.deleteDialog}>
            <span className={styles.title}>
              Approve deleting worker <Warning color="warning" />
            </span>
            <span>
              You are trying to remove from system <br />
              <b>{user.name + " " + user.surname}.</b>
            </span>
            <span>
              Please write this text below in input, to verify your action.
            </span>
            <span className={styles.deleteText}>
              {generateDeleteText(user.id)}
            </span>
            <TextField
              value={submitCommand}
              onChange={(e) => setSubmitCommand(e.target.value)}
              variant="outlined"
            />
            {!isCommandValid && (
              <Alert variant="outlined" severity="error">
                Command is not match.
              </Alert>
            )}
            <Button variant="contained" onClick={handleDelete} color="error">
              Approve delete
              <DeleteIcon color="inherit" />
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

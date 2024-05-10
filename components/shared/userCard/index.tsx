import { User } from "@/constants/types";
import { Avatar, Button, Rating } from "@mui/material";
import { stringAvatar } from "@/constants/helpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./userCard.module.scss";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
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
        <Button color="error">
          <DeleteIcon color="error"/>
        </Button>
      </div>
    </div>
  );
}

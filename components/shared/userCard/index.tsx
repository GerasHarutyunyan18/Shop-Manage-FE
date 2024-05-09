import { User } from "@/constants/types";

import styles from "./userCard.module.scss";
import { Avatar } from "@mui/material";
import { stringAvatar } from "@/constants/helpers";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles.container}>
      <div>
        <Avatar
          src={user.image}
          {...stringAvatar(user.name + " " + user.surname)}
        />
      </div>
      <div>{user.name + " " + user.surname}</div>
    </div>
  );
}

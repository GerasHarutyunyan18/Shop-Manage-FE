import { useEffect, useState } from "react";
import styles from "./userList.module.scss";
import { User } from "@/constants/types";
import { UserService } from "@/services/UserService";
import UserCard from "../userCard";

interface UserListProps {
  marketId: string;
  companyId?: string;
}

export default function UserList({ marketId, companyId }: UserListProps) {
  const [users, setUsers] = useState<User[]>();

  const fetchMarketUsers = async () => {
    const res = await UserService.getByMarketId(marketId);

    if (res.success) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    fetchMarketUsers();
  }, [marketId]);
  return (
    <div className={styles.container}>
      {users?.map((el) => (
        <UserCard user={el} />
      ))}
    </div>
  );
}

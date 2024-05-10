"use client";

import { useEffect, useState } from "react";
import styles from "./userList.module.scss";
import { User } from "@/constants/types";
import { UserService } from "@/services/UserService";
import UserCard from "../userCard";
import { useAuthContext } from "@/context/AuthContext";

interface UserListProps {
  marketId: string;
  companyId?: string;
}

export default function UserList({ marketId, companyId }: UserListProps) {
  const [users, setUsers] = useState<User[]>();
  const { user } = useAuthContext();

  const fetchMarketUsers = async () => {
    if (!user.token) {
      return;
    }

    const res = await UserService.getByMarketId(marketId);

    if (res.success) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    fetchMarketUsers();
  }, [marketId, user]);

  return (
    <div className={styles.container}>
      {users?.map((el) => (
        <UserCard user={el} />
      ))}
    </div>
  );
}

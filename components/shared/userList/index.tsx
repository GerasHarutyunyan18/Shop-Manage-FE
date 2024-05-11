"use client";

import { useEffect, useState } from "react";
import styles from "./userList.module.scss";
import { User } from "@/constants/types";
import { WorkerService } from "@/services/WorkerService";
import UserCard from "../userCard";
import { useAuthContext } from "@/context/AuthContext";
import AddUser from "../createWorker";
import { useWorkerContext } from "@/context/WorkerContext";
import { CircularProgress } from "@mui/material";
import Loading from "../loading";

interface UserListProps {
  marketId: string;
  companyId?: string;
}

export default function UserList({ marketId, companyId }: UserListProps) {
  const { workers, isLoading, fetchMarketWorkers } = useWorkerContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (marketId) {
      fetchMarketWorkers(marketId);
    }
  }, [marketId, user]);

  return (
    <div className={styles.container}>
      <AddUser />
      <div className={styles.users}>
        <Loading isLoading={isLoading} />
        {!isLoading && workers?.map((el) => <UserCard user={el} />)}
      </div>
    </div>
  );
}

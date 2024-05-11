"use client";

import { User } from "@/constants/types";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { WorkerService } from "@/services/WorkerService";

interface WorkerContextData {
  workers: User[];
  isLoading: boolean;
  fetchMarketWorkers: (marketId: string) => Promise<void>;
  deleteWorker: (id: number) => Promise<void>;
  addWorker: (worker: User) => void;
}

export const WorkerContext = createContext<WorkerContextData>(
  {} as WorkerContextData
);

export const WorkerProvider = ({ children }: { children: ReactNode }) => {
  const [workers, setWorkers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const fetchMarketWorkers = async (marketId: string) => {
    if (!user.token) {
      return;
    }
    setIsLoading(true);

    const res = await WorkerService.getByMarketId(marketId);

    if (res.success) {
      setWorkers(res.data);
    }
    setIsLoading(false);
  };

  const addWorker = (worker: User) => {
    setWorkers((prev) => [...prev, worker]);
  };

  const deleteWorker = async (id: number) => {
    setIsLoading(true);
    const res = await WorkerService.deleteUser(user.token, id);
    if (res.success) {
      setWorkers(workers.filter((el) => el.id !== id));
    }
    setIsLoading(false);
  };

  const value = {
    workers,
    isLoading,
    fetchMarketWorkers,
    addWorker,
    deleteWorker,
  };

  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
};

export const useWorkerContext = () => useContext(WorkerContext);

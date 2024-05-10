"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useMarketContext } from "@/context/MarketContext";
import { useEffect } from "react";

import styles from "./marketView.module.scss";
import Loading from "@/components/shared/loading";
import MarketCard from "@/components/shared/marketCard";
import UserList from "@/components/shared/userList";

interface MarketViewProps {
  id: string;
}

export default function MarketView({ id }: MarketViewProps) {
  const { fetchMarketView, isFetching, marketView } = useMarketContext();
  const { user } = useAuthContext();

  useEffect(() => {
    fetchMarketView(id);
  }, [id, user]);

  return (
    <div className={styles.container}>
      <Loading isLoading={isFetching} />
      {!isFetching && <MarketCard market={marketView} />}
      <div className={styles.userList}>
        <UserList marketId={id} />
      </div>
    </div>
  );
}

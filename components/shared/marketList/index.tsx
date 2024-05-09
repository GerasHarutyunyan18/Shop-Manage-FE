"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useMarketContext } from "@/context/MarketContext";
import { useEffect } from "react";

import styles from "./marketList.module.scss";
import { CircularProgress } from "@mui/material";
import MarketCard from "../marketCard";
import Link from "next/link";
import Loading from "../loading";

export default function MarketList() {
  const { user } = useAuthContext();
  const { fetchUserMarkets, markets, isFetching } = useMarketContext();

  useEffect(() => {
    if (user) {
      fetchUserMarkets();
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Loading isLoading={isFetching} />
      <div className={styles.markets}>
        {markets.map((market) => {
          return (
            <Link href={`/market/${market.id}`}>
              <MarketCard key={market.id} market={market} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

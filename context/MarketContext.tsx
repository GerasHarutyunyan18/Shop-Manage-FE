"use client";

import { Market } from "@/constants/types";
import { MarketService } from "@/services/MarketService";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { usePathname } from "next/navigation";

interface MarketContextData {
  markets: Market[];
  marketView: Market;
  isFetching: boolean;
  fetchUserMarkets: () => Promise<void>;
  fetchMarketView: (id: string) => Promise<void>;
}

export const MarketContext = createContext<MarketContextData>({
  markets: [],
  marketView: {} as Market,
  isFetching: false,
  fetchUserMarkets: async () => {},
  fetchMarketView: async (id: string) => {},
});

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [marketView, setMarketView] = useState<Market>({} as Market);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { user } = useAuthContext();

  const fetchUserMarkets = async () => {
    if (!user.token) {
      return;
    }
    setIsFetching(true);
    const res = await MarketService.getUserMarkets(user.token);
    if (res.success) {
      setMarkets(res.data);
    }
    setIsFetching(false);
  };

  const fetchMarketView = async (id: string) => {
    if (!user.token || !id) {
      return;
    }

    setIsFetching(true);
    const res = await MarketService.getById(+id);
    if (res.success) {
      setMarketView(res.data);
    }
    setIsFetching(false);
  };

  const value = {
    markets,
    marketView,
    isFetching,
    fetchUserMarkets,
    fetchMarketView,
  };

  return (
    <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
  );
};

export const useMarketContext = () => useContext(MarketContext);

"use client";

import { Product } from "@/constants/types";
import { ProductService } from "@/services/ProductService";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useMarketContext } from "./MarketContext";

interface ProductContextData {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  isGlobalSearch: boolean;
  searchWord: string;
  fetchProductsByMarketId: (marketId: number) => Promise<void>;
  searchProduct: (value: string) => void;
  toggleGlobalSearch: (value: boolean) => void;
  setSearchWord: (value: string) => void;
  searchProductGlobal: () => void;
}

export const ProductContext = createContext<ProductContextData>(
  {} as ProductContextData
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const { marketView } = useMarketContext();
  const [isGlobalSearch, setIsGlobalSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuthContext();

  const fetchProductsByMarketId = async (marketId: number) => {
    if (!user.token) {
      return;
    }
    setIsLoading(true);
    const res = await ProductService.getByMarketId(marketId, searchWord);

    if (res.success) {
      if (isGlobalSearch) {
        setFilteredProducts(res.data);
      } else {
        setProducts(res.data);
      }
    }
    setIsLoading(false);
  };

  const toggleGlobalSearch = (value: boolean) => {
    if(value){
      setProducts([])
      setFilteredProducts([])
    }else{
      setSearchWord('')
      fetchProductsByMarketId(marketView.id)
    }
    setIsGlobalSearch(value);
  };

  const searchProductGlobal = () => {
    fetchProductsByMarketId(marketView.id);
  };

  const searchProduct = async (value: string) => {
    console.log("isGlobalSearch", isGlobalSearch);
    if (isGlobalSearch) {
      return;
    }

    setSearchWord(value);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const value = {
    products,
    isLoading,
    filteredProducts,
    isGlobalSearch,
    searchWord,
    fetchProductsByMarketId,
    searchProduct,
    toggleGlobalSearch,
    setSearchWord,
    searchProductGlobal,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

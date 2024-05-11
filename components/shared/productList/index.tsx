import { useMarketContext } from "@/context/MarketContext";
import styles from "./productList.module.scss";
import { useEffect } from "react";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "../productCard";
import Loading from "../loading";
import ProductSearchBar from "../productSearchBar";
import DataNotFound from "../dataNotFound";

export default function ProductList() {
  const { marketView } = useMarketContext();
  const {
    fetchProductsByMarketId,
    products,
    isLoading,
    filteredProducts,
    isGlobalSearch,
    searchWord,
  } = useProductContext();

  useEffect(() => {
    if (marketView) {
      fetchProductsByMarketId(marketView.id);
    }
  }, [marketView]);

  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <ProductSearchBar />
        <Loading isLoading={isLoading} />
        {!isLoading && (
          <>
            {(filteredProducts.length
              ? filteredProducts
              : searchWord || isGlobalSearch
              ? []
              : products
            ).map((el) => {
              return <ProductCard product={el} />;
            })}
            {!filteredProducts.length && searchWord && (
              <DataNotFound dataName="Product" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

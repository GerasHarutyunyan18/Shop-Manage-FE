import { Product } from "@/constants/types";

import styles from "./productCard.module.scss";
import { getCurrencyIcon } from "@/constants/helpers";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.innerContainer}>
          <img src={product.image} />
          <div className={styles.info}>
            <span className={styles.name}>{product.name}</span>
            <span className={styles.price}>
              {product.price}{" "}
              <span className={styles.currency}>{product.currency}</span>
            </span>
          </div>
        </div>
        <div className={styles.count}>
          <span>Count`</span>
          <span>
            <b>{product.count}</b>
          </span>
        </div>
        <div className={styles.count}>
          <span>Count Method`</span>
          <span>
            <b>{product.countMethod}</b>
          </span>
        </div>
        <div className={styles.count}>
          <span>Total amount`</span>
          <span className={styles.amount}>
            <b>
              {product.price * product.count} {product.currency}
            </b>
            <img
            className={styles.currencyIcon}
              src={getCurrencyIcon(product.currency)}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

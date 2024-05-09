import { Market } from "@/constants/types";

import styles from "./marketCard.module.scss";
import { MarketDefaultImgUrl } from "@/constants";
import { Currencies } from "@/constants/enums";
import { getCurrencyIcon } from "@/constants/helpers";

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={market.image || MarketDefaultImgUrl} />
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.name}>{market.name}</span>
        <span className={styles.workingTimes}>
          Working Times` {market.workingTimeStart} - {market.workingTimeEnd}
        </span>
        <span className={styles.openedTime}>Opened on` {market.createdAt}</span>
      </div>
      <div className={styles.workersCounts}>
        <span className={styles.label}>Total workers count</span>
        <span className={styles.value}>{market.workersCount}</span>
      </div>
      <div className={styles.workersCounts}>
        <span className={styles.label}>Product types</span>
        <span className={styles.value}>{market.workersCount}</span>
      </div>
      <div className={styles.workersCounts}>
        <span className={styles.label}>Total amount in market</span>
        <span className={styles.value}>
          {Object.values(Currencies).map((el) => {
            if (!market.totalBalance?.[el]) {
              return <></>;
            }
            return (
              <div className={styles.balanceContainer}>
                <span>{market.totalBalance[el]}</span>
                <img
                  className={styles.currencyIcon}
                  src={getCurrencyIcon(el)}
                />
              </div>
            );
          })}
        </span>
      </div>
    </div>
  );
}

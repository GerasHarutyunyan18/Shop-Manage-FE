import { CircularProgress } from "@mui/material";

import styles from "./loading.module.scss";

interface LoadingProps {
  isLoading: boolean;
}

export default function Loading({ isLoading }: LoadingProps) {
  return isLoading ? (
    <div className={styles.container}>
      <p>
        <CircularProgress />
        <br />
        <span>Please Wait...</span>
      </p>
    </div>
  ) : (
    <></>
  );
}

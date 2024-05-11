import styles from "./dataNotFound.module.scss";

interface DataNotFoundProps {
  dataName: string;
}

export default function DataNotFound({ dataName }: DataNotFoundProps) {
  return (
    <div className={styles.container}>
      <span>{dataName} not found.</span>
    </div>
  );
}

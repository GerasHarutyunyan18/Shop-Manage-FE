import { ImportContacts, ImportExport } from "@mui/icons-material";
import {
  Box,
  Button,
  Modal,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import styles from "./productActions.module.scss";
import { useState } from "react";
import { Product } from "@/constants/types";

interface ProductActionsProps {
  product: Product;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className={styles.actionBtn}
        variant="contained"
        color="warning"
      >
        <span>
          <ImportExport />
        </span>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className={styles.container}>
          <div className={styles.title}>
            <div>
              <img width={200} src={product.image} />
            </div>
            <div className={styles.info}>
              <span>{product.name}</span>
              <br />
              <span className={styles.price}>
                {product.price} <b>{product.currency}</b>
              </span>
              <br />
              <span className={styles.price}>
                {product.count} <b>{product.countMethod}</b>
              </span>
            </div>
          </div>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab className={styles.tab} label="Import" {...a11yProps(0)} />
            <Tab className={styles.tab} label="Export" {...a11yProps(1)} />
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            <div className={styles.importContainer}>
              <div className={styles.form}>
                <h1>Import Product</h1>
                <TextField label="From" />
                <TextField label="Count" />
                <Button variant="contained" color="info">
                  Import
                </Button>
              </div>
            </div>
          </CustomTabPanel>
        </div>
      </Modal>
    </div>
  );
}

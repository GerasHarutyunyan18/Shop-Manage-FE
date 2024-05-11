import { useProductContext } from "@/context/ProductContext";
import { Button, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import styles from "./productSearchBar.module.scss";
import { Search } from "@mui/icons-material";

export default function ProductSearchBar() {
  const {
    searchProduct,
    toggleGlobalSearch,
    isGlobalSearch,
    setSearchWord,
    searchProductGlobal,
    isLoading,
  } = useProductContext();

  const handleSearchChange = (e: any) => {
    setSearchWord(e.target.value);
    if (!isGlobalSearch) {
      searchProduct(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <TextField
        id="standard-basic"
        onChange={handleSearchChange}
        label="Search..."
        variant="standard"
      />
      {isGlobalSearch && (
        <Button onClick={searchProductGlobal} variant="contained">
          Search <Search />
        </Button>
      )}
      <div>
        <span>Global search</span>
        <Checkbox
          disabled={isLoading}
          checked={isGlobalSearch}
          onChange={(e: any) => toggleGlobalSearch(e.target.checked)}
        />
      </div>
    </div>
  );
}

"use client";

import { Avatar, CircularProgress } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./sidebar.module.scss";
import { SidebarLinks } from "@/constants";
import { Logout } from "@mui/icons-material";

export default function SideBar() {
  const { user, isFetching, logOut } = useAuthContext();
  const pathname = usePathname();

  const isActive = (link: string) => {
    return link === pathname;
  };

  return (
    <div className={styles.container}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <div className={styles.header}>
          <Avatar
            sx={{ width: 50, height: 50 }}
            src={user?.image}
            alt={user?.name + user?.surname}
          />
          <p className={styles.name}>
            {user?.name && user?.surname ? user?.name + " " + user?.surname : ""}
          </p>
        </div>
      )}
      <hr />
      <div className={styles.links}>
        {SidebarLinks.map((el) => {
          return (
            <div
              className={`${styles.item} ${
                isActive(el.link) && styles.itemActive
              }`}
            >
              <Link className={styles.linkItem} href={el.link}>
                {el.label} {<el.icon />}
              </Link>
            </div>
          );
        })}
        <div onClick={logOut} className={`${styles.item} ${styles.logOutBtn}`}>
          <p className={styles.linkItem}>
            Log Out <Logout />
          </p>
        </div>
      </div>
    </div>
  );
}

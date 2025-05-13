import React, { useContext, useState, useEffect } from "react";
import style from "./Navbar.module.css";
import ImageRender from "../../../../components/ImageRender/ImageRender";
import { ClassRoutes } from "../../../../types/types";

export interface NavbarProps {
  userDetails: any;
  menuList: any[];
  screenSize: number;
  currentClass: any;
  currentTab: ClassRoutes | null;
  handleSelectMenu: (item: ClassRoutes) => void;
}

const Navbar = ({
  userDetails,
  menuList,
  screenSize,
  currentClass,
  currentTab,
  handleSelectMenu,
}: NavbarProps) => {
  return (
    <div className={style.container}>
      <div
        className={style.imageContainer}
        style={{
          width: 30,
          height: 30,
          backgroundColor: "red",
        }}
      >
        <ImageRender image={currentClass?.fileID} />
      </div>

      {screenSize >= 768 && <h1>{currentClass?.className}</h1>}

      {menuList.map((item, index) => {
        const isActive = currentTab === item.name ? true : false;

        return (
          <div
            key={index}
            className={style.menuItem}
            onClick={() => handleSelectMenu(item.name)}
          >
            {item.icon({ isActive })}
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;

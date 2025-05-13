import React, { act } from "react";
import style from "./Sidebar.module.css";
import { ClassRoutes } from "../../../../types/types";
import ImageRender from "../../../../components/ImageRender/ImageRender";

export interface SidebarProps {
  userDetails: any;
  menuList: any[];
  screenSize: number;
  currentClass: any;
  currentTab: ClassRoutes | null;
  handleSelectMenu: (item: ClassRoutes) => void;
}

const Sidebar = ({
  userDetails,
  menuList,
  screenSize,
  currentClass,
  currentTab,
  handleSelectMenu,
}: SidebarProps) => {
  return (
    <div className={style.container}>
      <div className="w-100 h-auto d-flex flex-column align-items-center justify-content-center mt-3">
        <div
          className={style.imageContainer}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "red",
          }}
        >
          <ImageRender image={currentClass?.fileID} />
        </div>

        <h2>{currentClass?.className}</h2>
        <p>{currentClass?.classCode}</p>
      </div>

      <div className="w-100 h-auto d-flex flex-column align-items-center mt-4">
        {menuList.map((item, index) => {
          const isActive = currentTab === item.name ? true : false;
          if (
            userDetails.acctype === "faculty" &&
            item.type !== "faculty" &&
            item.type !== "all"
          )
            return;

          return (
            <button
              key={index}
              className={
                isActive ? style.buttonSideBarActive : style.buttonSideBar
              }
              onClick={() => handleSelectMenu(item.name)}
            >
              {item.icon({ isActive, color: "#fff", activeColor: "#fff" })}
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

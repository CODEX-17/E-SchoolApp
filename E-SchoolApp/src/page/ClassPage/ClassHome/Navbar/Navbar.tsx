import React, { useContext, useState, useEffect } from "react";
import style from "./Navbar.module.css";
import {
  House,
  NotebookPen,
  Users,
  AlignStartVertical,
  FolderClosed,
  LogOut,
  SquareChartGantt,
} from "lucide-react";
import ImageRender from "../../../../components/ImageRender/ImageRender";
import { ClassContext } from "../../../../context/ClassContext";

const Navbar = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Set initial width
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuList = [
    { name: "Home", icon: <House color={"#3e3f40"} size={20} />, type: "all" },
    {
      name: "Create Quiz",
      icon: <NotebookPen color={"#3e3f40"} size={20} />,
      type: "faculty",
    },
    {
      name: "Class Members",
      icon: <Users color={"#3e3f40"} size={20} />,
      type: "all",
    },
    {
      name: "Manage Class",
      icon: <SquareChartGantt color={"#3e3f40"} size={20} />,
      type: "faculty",
    },
    {
      name: "Leaderboard",
      icon: <AlignStartVertical color={"#3e3f40"} size={20} />,
      type: "faculty",
    },
    {
      name: "Files",
      icon: <FolderClosed color={"#3e3f40"} size={20} />,
      type: "faculty",
    },
    { name: "Exit", icon: <LogOut color={"#3e3f40"} size={20} />, type: "all" },
  ];

  useEffect(() => {
    console.log("Screen size changed:", screenSize);
  }, [screenSize]);

  const classContext = useContext(ClassContext);

  if (!classContext || !classContext.currentClass) {
    return null;
  }

  const { currentClass } = classContext;

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

      {menuList.map((item, index) => (
        <div key={index} className={style.menuItem}>
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default Navbar;

"use client";

import { useState } from "react";
import { Box, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

const Sidebar = () => {
  const [selectedBox, setSelectedBox] = useState<string | null>("");

  const handleBoxClick = (boxId: string) => {
    setSelectedBox(boxId);
  };

  const isBoxSelected = (boxId: string) => selectedBox === boxId;

  const boxStyles = {
    cursor: "pointer",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    marginTop: "30px",
  };

  const boxStylesBottom = {
    cursor: "pointer",

    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  };

  return (
    <Box sx={{ padding: "15px" }}>
      <Box>
        <Link href="/">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </Link>
      </Box>

      <Box sx={{ marginTop: "50px" }}>
        <Box
          sx={{
            ...boxStyles,
            backgroundColor: isBoxSelected("dashboard") ? "blue" : "white",
            color: isBoxSelected("dashboard") ? "#ffffff" : "#000000",
          }}
          onClick={() => handleBoxClick("dashboard")}
        >
          <GridViewIcon />
          <Link
            href="/dashboard"
            style={{
              textDecoration: "none",
              color: isBoxSelected("dashboard") ? "#ffffff" : "#000000",
              marginLeft: "10px",
              fontSize: "18px",
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box
          sx={{
            ...boxStyles,
            backgroundColor: isBoxSelected("create-prescription")
              ? "blue"
              : "white",
            color: isBoxSelected("create-prescription") ? "#ffffff" : "#000000",
          }}
          onClick={() => handleBoxClick("create-prescription")}
        >
          <VaccinesIcon />
          <Link
            href="/create-prescription"
            style={{
              textDecoration: "none",
              color: isBoxSelected("create-prescription")
                ? "#ffffff"
                : "#000000",
              marginLeft: "10px",
              fontSize: "18px",
            }}
          >
            Prescription
          </Link>
        </Box>
        <Box
          sx={{
            ...boxStyles,
            backgroundColor: isBoxSelected("patients-list") ? "blue" : "white",
            color: isBoxSelected("patients-list") ? "#ffffff" : "#000000",
          }}
          onClick={() => handleBoxClick("patients-list")}
        >
          <FormatListBulletedIcon />
          <Link
            href="/patients-list"
            style={{
              textDecoration: "none",
              color: isBoxSelected("patients-list") ? "#ffffff" : "#000000",
              marginLeft: "10px",
              fontSize: "18px",
            }}
          >
            Patients List
          </Link>
        </Box>
        <Box
          sx={{
            ...boxStyles,
            backgroundColor: isBoxSelected("patients-card") ? "blue" : "white",
            color: isBoxSelected("patients-card") ? "#ffffff" : "#000000",
          }}
          onClick={() => handleBoxClick("patients-card")}
        >
          <RecentActorsIcon />
          <Link
            href="/patients-card"
            style={{
              textDecoration: "none",
              color: isBoxSelected("patients-card") ? "#ffffff" : "#000000",
              marginLeft: "10px",
              fontSize: "18px",
            }}
          >
            Patients Card
          </Link>
        </Box>
      </Box>

      <Box sx={{ marginTop: "200px" }}>
        <Box
          sx={{
            ...boxStylesBottom,
            fontSize: "16px",
            backgroundColor: isBoxSelected("supports") ? "blue" : "white",
            color: isBoxSelected("supports") ? "#ffffff" : "grey",
          }}
          onClick={() => handleBoxClick("supports")}
        >
          <PanoramaFishEyeIcon />
          <Link
            href="/supports"
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              color: isBoxSelected("supports") ? "#ffffff" : "grey",
            }}
          >
            Support
          </Link>
        </Box>
        <Box
          sx={{
            ...boxStylesBottom,

            fontSize: "16px",
            marginBottom: "20px",
            backgroundColor: isBoxSelected("settings") ? "blue" : "white",
            color: isBoxSelected("settings") ? "#ffffff" : "grey",
          }}
          onClick={() => handleBoxClick("settings")}
        >
          <PanoramaFishEyeIcon />
          <Link
            href="/settings"
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              color: isBoxSelected("settings") ? "#ffffff" : "grey",
            }}
          >
            Setting
          </Link>
        </Box>

        <Divider />
        <Box
          sx={{
            ...boxStylesBottom,
            color: "grey",
            fontSize: "16px",
          }}
        >
          <PanoramaFishEyeIcon />
          <Link
            href="/"
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              color: "grey",
            }}
          >
            Logout
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

"use client";

import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { redirect, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const [selectedBox, setSelectedBox] = useState<string | null>("");
  const router = useRouter();
  const session = useSession();

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
    userSelect: "none",
    marginTop: "20px",
  };

  const boxStylesBottom = {
    userSelect: "none",
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
        <Link
          href="/dashboard"
          style={{
            textDecoration: "none",
            color: isBoxSelected("dashboard") ? "#ffffff" : "#000000",
          }}
        >
          <Box
            sx={{
              ...boxStyles,
              backgroundColor: isBoxSelected("dashboard") ? "blue" : "white",
              color: isBoxSelected("dashboard") ? "#ffffff" : "#000000",
            }}
            onClick={() => handleBoxClick("dashboard")}
          >
            <GridViewIcon />
            <Typography sx={{ marginLeft: "10px", fontSize: "18px" }}>
              Dashboard
            </Typography>
          </Box>
        </Link>
        <Link
          href="/create-prescription"
          style={{
            textDecoration: "none",
            color: isBoxSelected("create-prescription") ? "#ffffff" : "#000000",
          }}
        >
          <Box
            sx={{
              ...boxStyles,
              backgroundColor: isBoxSelected("create-prescription")
                ? "blue"
                : "white",
              color: isBoxSelected("create-prescription")
                ? "#ffffff"
                : "#000000",
            }}
            onClick={() => handleBoxClick("create-prescription")}
          >
            <VaccinesIcon />
            <Typography
              sx={{
                marginLeft: "10px",
                fontSize: "18px",
              }}
            >
              Prescription
            </Typography>
          </Box>
        </Link>
        <Link
          href="/patients-list"
          style={{
            textDecoration: "none",
            color: isBoxSelected("patients-list") ? "#ffffff" : "#000000",
          }}
        >
          <Box
            sx={{
              ...boxStyles,
              backgroundColor: isBoxSelected("patients-list")
                ? "blue"
                : "white",
              color: isBoxSelected("patients-list") ? "#ffffff" : "#000000",
            }}
            onClick={() => handleBoxClick("patients-list")}
          >
            <FormatListBulletedIcon />
            <Typography
              sx={{
                marginLeft: "10px",
                fontSize: "18px",
              }}
            >
              PatientsList
            </Typography>
          </Box>
        </Link>

        <Link
          href="/patients-card"
          style={{
            textDecoration: "none",
            color: isBoxSelected("patients-card") ? "#ffffff" : "#000000",
          }}
        >
          <Box
            sx={{
              ...boxStyles,
              backgroundColor: isBoxSelected("patients-card")
                ? "blue"
                : "white",
              color: isBoxSelected("patients-card") ? "#ffffff" : "#000000",
            }}
            onClick={() => handleBoxClick("patients-card")}
          >
            <RecentActorsIcon />
            <Typography
              sx={{
                marginLeft: "10px",
                fontSize: "18px",
              }}
            >
              Patients Card
            </Typography>
          </Box>
        </Link>
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
              cursor: "pointer",
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
              cursor: "pointer",
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
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
        >
          <PanoramaFishEyeIcon />
          <Link
            href="/"
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              color: "grey",
              cursor: "pointer",
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

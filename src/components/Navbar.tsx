"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const name: string = session?.user?.data?.user_details?.profile?.name;
  const avatar: string =
    session?.user?.data?.user_details?.profile?.profile_avatar?.url;

  console.log(name, avatar);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          paddingLeft: "30px",
          border: "none",
          position: "relative",
          paddingBottom: "20px",
        }}
      >
        <input
          style={{
            width: "250px",
            height: "40px",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            border: "none",
            position: "absolute",
          }}
        />

        <SearchIcon
          sx={{
            cursor: "pointer",
            position: "absolute",
            marginTop: "7px",
            marginLeft: "220px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
        }}
      >
        <Typography sx={{ marginTop: "10px" }}>{name}</Typography>
        <Image
          src={avatar}
          width={40}
          height={40}
          alt="avatar"
          style={{
            marginLeft: "25px",
            marginRight: "20px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Navbar;

import React, { ReactNode } from "react";
import { Button, Typography, TextField, Box } from "@mui/material";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        width: "100",
        height: "100vh",
        display: "flex",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          width: "15%",
          height: "full",
          borderRight: 1,
          borderColor: "grey.300",
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{ width: "85%", height: "full" }}>
        <Box sx={{ width: "100%", height: "10%" }}>
          <Navbar />
        </Box>
        <Box
          sx={{
            width: "full",
            height: "90%",
            background: "#f9f9f9",
            padding: "20px",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

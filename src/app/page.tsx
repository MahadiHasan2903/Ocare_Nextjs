import { Box } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          fontSize: "30px",
        }}
      >
        Home page
      </Box>
      <Link
        href="/login"
        style={{
          textDecoration: "none",
          marginTop: "50px",
          color: "black",
          fontSize: "30px",
        }}
      >
        <Box>Login Page</Box>
      </Link>
    </Box>
  );
}

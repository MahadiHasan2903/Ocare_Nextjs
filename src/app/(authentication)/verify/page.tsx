import React from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import VerifyForm from "@/components/VerifyForm";

const Verify = () => {
  return (
    <Grid
      container
      sx={{
        width: "full",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Left Side: Background Image */}

      <Grid item xs={12} sm={6}>
        <Paper
          sx={{
            width: "100%",
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url("/login-bg.png")`,
          }}
        ></Paper>
      </Grid>
      {/* Right Side: reset page */}
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          sm={6}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "20px",
              border: "none",
            }}
          >
            <Image src="/logo.png" width={48} height={48} alt="logo" />
          </Box>

          <Box sx={{ padding: "20px", maxWidth: "400px", border: "none" }}>
            <Typography variant="h4" sx={{ fontWeight: "800" }}>
              Verify
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginTop: "20px",
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              Enter the OTP verification code that sent to 16******24
            </Typography>
          </Box>
          <VerifyForm />

          <Box
            sx={{
              opacity: "0.6",
              fontSize: "12px",
              textAlign: "center",
              padding: "20px",
              maxWidth: "400px",
              border: "none",
            }}
          >
            ©2023 oCare Web Protal |{" "}
            <Link href="/" style={{ color: "blue" }}>
              Privacy Policy
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Verify;

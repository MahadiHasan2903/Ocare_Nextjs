import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Typography,
  TextField,
  Box,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { PropsTypes } from "@/utils/types";
import { signIn } from "next-auth/react";

const VerifyForm = ({ router, country_code, phone_number }: PropsTypes) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     setLoading(true);

  //     const verifyData = {
  //       otp: otp,
  //       country_code,
  //       phone_number,
  //     };

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(verifyData),
  //     });

  //     if (response.status === 200) {
  //       router.push("/dashboard");
  //     } else {
  //       setError("Login failed. Please check your OTP.");
  //     }
  //   } catch (err) {
  //     setError("Login failed. Please check your OTP.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signIn("credentials", {
      otp: otp,
      country_code,
      phone_number,
    });
  };

  return (
    <FormControl
      sx={{
        padding: "20px",
        maxWidth: "800px",
        boxShadow: "none",
        border: "none",
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        {error && (
          <Typography
            variant="body2"
            color="error"
            sx={{ marginBottom: "1px" }}
          >
            {error}
          </Typography>
        )}

        <Box sx={{ backgroundColor: "#1976d2" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Verify
          </Button>
        </Box>
      </form>

      <Box
        sx={{
          display: "flex",
          marginTop: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Didn&apos;t receive your code?
        <Link
          href="/login"
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: "blue",
            marginLeft: "5px",
            fontSize: "14px",
          }}
        >
          Resend
        </Link>
      </Box>
    </FormControl>
  );
};

export default VerifyForm;

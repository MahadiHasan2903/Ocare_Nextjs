"use client";

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
const VerifyForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {};
  return (
    <FormControl
      sx={{
        padding: "20px",
        maxWidth: "800px",
        boxShadow: "none",
        border: "none",
      }}
    >
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
        <Typography variant="body2" color="error" sx={{ marginBottom: "1px" }}>
          {error}
        </Typography>
      )}

      <Box sx={{ backgroundColor: "#1976d2" }}>
        <Button variant="contained" color="primary" fullWidth>
          Verify
        </Button>
      </Box>

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

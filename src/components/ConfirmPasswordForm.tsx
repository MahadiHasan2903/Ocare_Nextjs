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

const ConfirmPasswordForm: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {};
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
      <TextField
        type="text"
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        type="text"
        label="Confirm Password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
          Confirm Password Reset
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
          Back to Login
        </Link>
      </Box>
    </FormControl>
  );
};

export default ConfirmPasswordForm;

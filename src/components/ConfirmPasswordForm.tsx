"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button, Typography, TextField, Box, FormControl } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const ConfirmPasswordForm: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const country_code: string = decodeURIComponent(
    searchParams.get("country_code") ?? ""
  );
  const phone_number: string | null = searchParams.get("phoneNumber");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    const data = {
      country_code: "+880",
      phone_number: "01718562964",
      otp: otp,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}confirm-forget-password-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      router.push("/login");

      setLoading(false);
    } catch (error) {
      setError("An error occurred while submitting the form.");
      setLoading(false);
    }
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

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
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

type VerifyFormProps = {};

const VerifyForm: React.FC<VerifyFormProps> = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const searchParams = useSearchParams();
  const country_code: string = decodeURIComponent(
    searchParams.get("country_code") ?? ""
  );

  const phone_number: string | null = searchParams.get("phoneNumber");

  const unRevealedPhoneNumber = (phoneNumber: string | null): string => {
    if (!phoneNumber) return "";
    const firstTwo = phoneNumber.slice(0, 2);
    const lastTwo = phoneNumber.slice(-2);
    const middleStars = "*".repeat(phoneNumber.length - 4);
    return firstTwo + middleStars + lastTwo;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signIn("credentials", {
        otp: otp,
        country_code,
        phone_number,
        redirect: false,
      });

      if (res?.error) {
        setError("Login failed. Please check your OTP.");
        setLoading(false);
      } else {
        router.push("/dashboard");
        setLoading(false);
      }
    } catch (error: any) {
      setError("An error occurred during login. Please try again.");
      setLoading(false);
      console.error("Authentication Error:", error);
    }
  };

  return (
    <>
      <Box sx={{ padding: "20px", maxWidth: "400px", border: "none" }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Verify
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: "20px",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          Enter the OTP verification code that was sent to{" "}
          {unRevealedPhoneNumber(phone_number)}
        </Typography>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
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
                  type="submit"
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
        </>
      )}
    </>
  );
};

export default VerifyForm;

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
import { PropsTypes } from "@/utils/types";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const country_code = decodeURIComponent(
    searchParams.get("country_code") ?? ""
  );

  const phone_number = searchParams.get("phoneNumber");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res: any = await signIn("credentials", {
        otp: otp,
        country_code,
        phone_number,
        redirect: true,
      });

      if (res && res.status === 200) {
        if (session) {
          console.log("Session object:", session);
          router.push("/dashboard");
        }
      } else {
        setError("Login failed. Please check your OTP.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Authentication Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
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
                console.log("OTP input changed:", e.target.value);
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
      )}
    </>
  );
};

export default VerifyForm;

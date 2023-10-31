"use client";

import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { countries } from "@/utils/countryCode";
import Link from "next/link";

const ResetPasswordForm = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[0].iso);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !selectedCountry) {
      setError("Phone number and country code are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const resetRequestData = {
        country_code: selectedCountry,
        phone_number: phoneNumber,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}forget-password-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resetRequestData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to request password reset");
      } else {
        router.push(
          `/confirm-new-password?country_code=${encodeURIComponent(
            selectedCountry
          )}&phoneNumber=${phoneNumber}`
        );
      }
    } catch (error) {
      setError("An error occurred while processing your request");
    }

    setLoading(false);
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "25%", marginRight: "10px" }}>
                <Select
                  className="mt-2"
                  labelId="country-select-label"
                  id="country-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.iso}>
                      {option.iso}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <TextField
                className="w-3/4 shrink-0"
                required
                label="Phone Number"
                type="text"
                variant="outlined"
                fullWidth
                margin="normal"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            {/* Error message */}
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: "1px" }}
              >
                {error}
              </Typography>
            )}

            {/* Login button */}
            <Box sx={{ backgroundColor: "#1565C0" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Request Password Reset
              </Button>
            </Box>
          </form>

          <Link
            href="/login"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "blue",
              marginLeft: "5px",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            Back to login
          </Link>
        </FormControl>
      )}
    </>
  );
};

export default ResetPasswordForm;

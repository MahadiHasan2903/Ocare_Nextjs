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
import { countries } from "@/utils/countryCode";
import Link from "next/link";

import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countries[0].iso
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const loginData = {
        country_code: selectedCountryCode,
        phone_number: phoneNumber,
        password,
        role: "doctor",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}login-request-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (response.status === 200) {
        router.push(
          `/verify?country_code=${encodeURIComponent(
            selectedCountryCode
          )}&phoneNumber=${phoneNumber}`
        );
        setLoading(false);
      } else {
        setError("Login failed. Please check your credentials");
        setLoading(false);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{ width: "25%", marginRight: "10px", marginTop: "10px" }}
              >
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.code} value={option.iso}>
                      {option.iso}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <TextField
                sx={{ width: "75%" }}
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
            <TextField
              required
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Box>
          </form>

          <Link
            href="/reset-password"
            style={{
              textAlign: "center",
              textDecoration: "none",
              color: "blue",
              marginLeft: "5px",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            Forget Password?
          </Link>
        </FormControl>
      )}
    </>
  );
};

export default LoginForm;

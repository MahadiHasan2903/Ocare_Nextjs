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
import { useRouter } from "next/router";
import { countries } from "@/utils/countryCode";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[0].iso);

  const handleSubmit = () => {};

  return (
    <FormControl
      sx={{
        padding: "20px",
        maxWidth: "800px",
        boxShadow: "none",
        // background: "transparent",
        border: "none",
      }}
    >
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
        <Typography variant="body2" color="error" sx={{ marginBottom: "1px" }}>
          {error}
        </Typography>
      )}

      {/* Login button */}
      <Box sx={{ backgroundColor: "#1565C0" }}>
        <Button variant="contained" color="primary" fullWidth>
          Request Password Reset
        </Button>
      </Box>
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
        Back to login
      </Link>
    </FormControl>
  );
};

export default ResetPasswordForm;

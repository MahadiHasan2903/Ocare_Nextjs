"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Patient } from "@/utils/types";
import { useSession } from "next-auth/react";

const ScrollingPatients: React.FC = () => {
  const [visiblePatients, setVisiblePatients] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const token: string | undefined = session?.user?.data?.access_token;
  const loadMorePatients = () => {
    setLoading(true);
    if (visiblePatients + 5 <= patients.length) {
      setTimeout(() => {
        setVisiblePatients((prevVisiblePatients) => prevVisiblePatients + 5);
        setLoading(false);
      }, 1000);
    } else {
      setVisiblePatients(patients.length);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}doctor-panel/patient/list`,
          {
            method: "GET",
            cache: "force-cache",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          console.log(data);

          if (data.success) {
            setPatients(data.data);
          } else {
            console.error("Error in API response:", data.message);
          }
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
  }, [token]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMorePatients();
        }
      },
      {
        root: contentRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading, patients]);

  return (
    <Box
      sx={{
        height: "92vh",
        overflowY: "scroll",
        position: "relative",
      }}
      ref={contentRef}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          textAlign: "center",
          marginY: "15px",
        }}
      >
        Patients
      </Typography>

      <Box>
        {patients
          .slice(0, visiblePatients)
          .map((patient: Patient, index: number) => (
            <Card
              key={patient.id}
              sx={{
                margin: "10px",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  Name: {patient.profile.name}
                </Typography>
                <Typography variant="body2">
                  Phone Number:{" "}
                  {`${patient.country_code} ${patient.phone_number}`}
                </Typography>
                <Typography variant="body2">
                  Gender: {patient.profile.gender}
                </Typography>
                <Typography variant="body2">
                  Availability: {patient.is_active ? "Active" : "Inactive"}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>

      <Box ref={sentinelRef} style={{ height: "1px", width: "1px" }} />
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ScrollingPatients;

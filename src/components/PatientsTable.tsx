"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  TableFooter,
} from "@mui/material";
import { Patient } from "@/utils/types";
import { useSession } from "next-auth/react";

const PatientsTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patients, setPatients] = useState<Patient[]>([]);
  const { data: session } = useSession();

  const token = session?.user?.data?.access_token;
  console.log(token);

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil(patients.length / 10);

  const displayPatients = patients
    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((patient, index) => {
      if (index < rowsPerPage) {
        return (
          <TableRow key={patient.id}>
            <TableCell>{patient.profile.name}</TableCell>
            <TableCell>{`${patient.country_code} ${patient.phone_number}`}</TableCell>
            <TableCell>{patient.profile.gender}</TableCell>
            <TableCell>{patient.is_active ? "Active" : "Inactive"}</TableCell>
          </TableRow>
        );
      }
      return null;
    });

  return (
    <Box
      sx={{
        margin: "10px",
        height: "92vh",
        position: "relative",
      }}
    >
      <Box sx={{ textAlign: "center", fontSize: "30px", marginBottom: "10px" }}>
        Patient List
      </Box>
      <Box sx={{ paddingX: "15px" }}>
        <TableContainer
          component={Paper}
          sx={{
            marginRight: "5px",
            maxHeight: rowsPerPage > 10 ? "75vh" : "none",
            overflowY: rowsPerPage > 10 ? "scroll" : "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ typography: "body1" }}>Name</TableCell>
                <TableCell sx={{ typography: "body1" }}>Phone No</TableCell>
                <TableCell sx={{ typography: "body1" }}>Gender</TableCell>
                <TableCell sx={{ typography: "body1" }}>Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{displayPatients}</TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              count={patients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>

          <Typography sx={{ paddingRight: "30px" }}>
            Page {page + 1} of {totalPages}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientsTable;

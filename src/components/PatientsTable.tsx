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

const PatientsTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}doctor-panel/patient/list`,
          {
            cache: "force-cache",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);

        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
  }, []);

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

  const totalPages = Math.ceil(patients.length / rowsPerPage);

  const displayPatients = patients
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((patient) => (
      <TableRow key={patient.id}>
        <TableCell>{patient.profile.name}</TableCell>
        <TableCell>{`${patient.country_code} ${patient.phone_number}`}</TableCell>
        <TableCell>{patient.profile.gender}</TableCell>
        <TableCell>{patient.is_active ? "Active" : "Inactive"}</TableCell>
      </TableRow>
    ));

  return (
    <Box sx={{ margin: "10px" }}>
      <Box sx={{ textAlign: "center", fontSize: "30px", marginBottom: "10px" }}>
        Patient List
      </Box>
      <Box sx={{ paddingX: "15px" }}>
        <TableContainer
          component={Paper}
          sx={{
            marginRight: "5px",
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

        <TableFooter
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            count={patients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Typography sx={{ paddingRight: "30px" }}>
            Page {page + 1} of {totalPages}
          </Typography>
        </TableFooter>
      </Box>
    </Box>
  );
};

export default PatientsTable;

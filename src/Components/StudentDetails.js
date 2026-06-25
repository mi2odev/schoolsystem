import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid
} from '@mui/material';

const StudentDetails = ({ student }) => {
  if (!student) {
    return null;
  }

  const average = (
    (Number(student.moyS1) +
      Number(student.moyS2) +
      Number(student.moyS3) +
      Number(student.moyS4)) /
    4
  ).toFixed(2);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Student Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Student ID: {student.NumE}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">
                Name: {student.nom} {student.prenom}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Semester Averages
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>S1: {student.moyS1}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>S2: {student.moyS2}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>S3: {student.moyS3}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>S4: {student.moyS4}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Overall Average: {average}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentDetails;
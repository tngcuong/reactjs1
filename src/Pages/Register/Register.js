import axios from "axios";
import { useContext, useState } from "react";
import AppContext from "../../Context/context";
import {getCurrentUser} from "../../Reducer/action";
import { useNavigate } from "react-router-dom";
import Copyright from "../../Components/Copyright/Copyright";
import { Link as RouterLink } from "react-router-dom";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, CircularProgress, Snackbar } from "@mui/material";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [loading,setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [openAlert, setOpenAlert] = useState(false);
    const {dispatch}= useContext(AppContext);
  const navigate = useNavigate()


  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const avatar = await axios.get('https://randomfox.ca/floof')
    .then(response => response.data.image)

    await axios.post('https://whats-the-fox.onrender.com/api/v1/auth/resigter',{
        name:data.get('firstName')+" "+data.get('lastName'),
        email:data.get('email'),
        password:data.get('password'),
        avatar,
    })
    .then((response) =>  {
        dispatch(getCurrentUser(response.data.data)); 
        localStorage.setItem('token', response.data.token)
        setLoading(false);
        navigate("/home")
      })
    .catch((res)=>{
        setOpenAlert(true)
        setLoading(false);
    })
  }
  return (
    <Container component="main" maxWidth="xs">
       <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={() => setOpenAlert(false)}
          sx={{marginTop:"80px"}}
        >
          <Alert
            onClose={() => setOpenAlert(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Register failed!
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading && <CircularProgress size={20}sx={{marginRight:10,color:'white'}} />}Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
   
  );
}

{/* <>
<h1 style={{ textAlign: "center" }}>Register</h1>
<input
  onChange={(e) => setName(e.target.value)}
  placeholder="Name"
  style={{ display: "block" }}
></input>
<input
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
  style={{ display: "block" }}
></input>
<input
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  style={{ display: "block" }}
></input>
<button onClick={handleRegister}>Register</button>
</> */}


// const handleRegister = async () => {
//   const avatar = await axios.get('https://randomfox.ca/floof')
//   .then(response => response.data.image)

//   await axios.post('https://whats-the-fox.onrender.com/api/v1/auth/resigter',{
//       name,
//       email,
//       password,
//       avatar,
//   })
//   .then((response) =>  {
//       dispatch(getCurrentUser(response.data.data)); 
//       localStorage.setItem('token', response.data.token)
//       navigate("/home")
//     })
//   .catch((res)=>{
//       alert('Error')
//   })
// }
export default Register;

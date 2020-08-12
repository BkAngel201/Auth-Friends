import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { TextField, Grid, makeStyles, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    form: {
        width: 400,
        margin: "20px auto 0",
        "& .MuiGrid-root": {
            margin: "15px auto 0",
            width: "100%"
      }
    },
  }));

function Login(props) {
    const classes = useStyles()
    const history = useHistory()
    const [formValues, setFormValues] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .post('/login', formValues)
            .then(res => {
                localStorage.setItem('AuthenticationToken', res.data.payload)
                history.push("/friendList")
            })
            .catch(err => {
                localStorage.removeItem('AuthenticationToken')
                setFormValues({
                    username: '',
                    password: ''
                })
                console.log(err);
            })
    }


    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Typography variant="h2">
                Friend List
            </Typography>
            <Typography variant="h4">
                Login
            </Typography>
            <Grid item xs={12}>
                <TextField fullWidth id="username" label="Username" variant="outlined" name="username" onChange={handleChange} value={formValues.username}/>
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth id="password" label="Password" variant="outlined" name="password" type="password" onChange={handleChange} value={formValues.password}/>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth size="medium" color="primary" variant="outlined" type="submit">Submit</Button>
            </Grid>
        </form>
    )
}

export default Login
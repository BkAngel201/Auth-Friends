import React from 'react';
import { useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    bar: {
        "& .MuiToolbar-root": {
            display: 'flex',
            justifyContent: 'space-between'
        }
    }
  }))


function AppBarComponent (props) {
    const classes = useStyles()
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('AuthenticationToken')
        history.push('/')
    }
    return (
        <AppBar position="fixed" className={classes.bar}>
            <Toolbar>
                <Typography variant="h6">
                    Friend List
                </Typography>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default AppBarComponent
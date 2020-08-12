import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import AddFriend from './AddFriend';
import Friend from './Friend'
import { Typography, IconButton, Grid, Snackbar, CircularProgress } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import AppBarComponent from './AppBar';

function FriendList (props) {
    const [firstFetch, setFirstFetch] = useState(false)
    const [friendList, setFriendList] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [addVariant, setAddVariant] = useState({})
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect( () => {
        getFriendList()
        setFirstFetch(true)
    },[firstFetch])

    const getFriendList = () => {
        setIsLoading(true)
        axiosWithAuth()
            .get("/friends")
            .then(res => {
                setIsLoading(false)
                setFriendList(res.data)
                
            })
            .catch(err => console.log(err.message))
        
    }

    const addFriend = (data) => {
        axiosWithAuth()
            .post("/friends", data)
            .then(res => {
                console.log(res)
                setFriendList(res.data)
            })
            .catch(err => err.message)
    }

    const deleteFriend = (id) => {
        axiosWithAuth()
            .delete(`/friends/${id}`)
            .then(res => {
                console.log(res)
                setFriendList(res.data)
            })
            .catch(err => err.message)
    }

    const updateFriend = (id, data) => {
        axiosWithAuth()
            .put(`/friends/${id}`, data)
            .then(res => {
                console.log(res)
                setFriendList(res.data)
            })
            .catch(err => err.message)
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

    const handleOpenSnackbar = (message) => {
        setSnackbarMessage(message)
        setOpenSnackbar(true)
    }

    const closeAddDialog = () => {
        setAddVariant('')
        setOpenAdd(false)
    }

    const openAddDialog = (type) => {
        setAddVariant(type)
        setOpenAdd(true)
    }



    return (
        <>
            <AppBarComponent />
            <div className="friend-list" style={{paddingTop: 90}}>
                <AddFriend 
                    addFriend={addFriend} 
                    updateFriend={updateFriend} 
                    openAdd={openAdd} 
                    closeAddDialog={closeAddDialog} 
                    addVariant={addVariant}
                    handleOpenSnackbar={handleOpenSnackbar}
                />
                <Typography variant="h4">
                    Friend List
                    <IconButton aria-label="Add Friend" component="span" onClick={()=>{openAddDialog({})}}>
                        <AddCircleOutlineIcon style={{color: "green"}} />
                    </IconButton>
                </Typography>
                {isLoading ? 
                    <CircularProgress /> 
                    :
                    <Grid container spacing={3}>
                        {
                            friendList.map(el => (
                                <Grid item xs={6}>
                                    <Friend friend={el} deleteFriend={deleteFriend} openAddDialog={openAddDialog}/>
                                </Grid>
                            ))
                        }
                    </Grid>
                }
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </div>
        </>
    )
}

export default FriendList
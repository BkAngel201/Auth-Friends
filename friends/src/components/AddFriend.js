import React, { useState, useEffect } from 'react';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button
} from '@material-ui/core'

function AddFriend(props) {
    console.log();
    const [formValues, setFormValues] = useState({

    })

    useEffect(() => {
        if(props.addVariant.name !== undefined) {
            setFormValues({
                name: props.addVariant.name,
                email: props.addVariant.email,
                age: props.addVariant.age
            })
        }
    },[props.addVariant])
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        if(props.addVariant.name !== undefined) {
            props.updateFriend(props.addVariant.id,formValues)
            props.handleOpenSnackbar("Update Friend Info. Action Success!!")
        } else {
            props.addFriend(formValues)
            props.handleOpenSnackbar("Add new Friend Info. Action Success!!")
        }

        
        setFormValues({
            name: '',
            email: '',
            age: ''
        })
        props.closeAddDialog()
    }

    const handleCancel = () => {
        setFormValues({
            name: '',
            email: '',
            age: ''
        })
        props.closeAddDialog()
    }
    return (
        <Dialog open={props.openAdd} onClose={handleCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.addVariant.name !== undefined ? 'Update' : 'Add'} Friend Info</DialogTitle>
            <DialogContent>
            <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={formValues.name}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="age"
                    label="Email Address"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={formValues.email}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="age"
                    label="Age"
                    name="age"
                    type="text"
                    onChange={handleChange}
                    value={formValues.age}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {props.addVariant.name !== undefined ? 'Update' : 'Add'} Friend
                </Button>
            </DialogActions>
        </Dialog>
        // <form onSubmit={handleSubmit}>
        //     <input type="text"  placeholder="Name" onChange={handleChange} value={formValues.name}/>
        //     <input type="email" n placeholder="Email" onChange={handleChange} value={formValues.email}/>
        //     <input type="text"  placeholder="Age" onChange={handleChange} value={formValues.age}/>
        //     <button type="submit">Add Friend</button>
        // </form>
    )
}

export default AddFriend
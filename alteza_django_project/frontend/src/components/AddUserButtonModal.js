import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@material-ui/core";
import {useEffect, useLayoutEffect} from "react";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddUserButtonModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("");

    function postUser() {
        const item = {id: "", username: username, email: email, password: password, role: role};
        axios
            .post("/users/", item)
            .then((res) => console.log(res)).then(() => window.location.href = '/users'
        ).catch((error) => {

            if (error.response.data.email) {
                alert(error.response.data.email)
            }
            if (error.response.data.password) {
                alert( error.response.data.password)
            }
            if (error.response.data.username) {
                alert( error.response.data.username)
            }
            if (error.response.data.role) {
                alert( error.response.data.role)
            }


        });
    }

    return (
        <div>
            <Button id="add-product-button" variant="contained" onClick={handleOpen}>Add User</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField fullWidth={true}
                               label="Username"
                               variant="standard"
                               onChange={e => setUsername(e.target.value)}
                    />
                    <TextField fullWidth={true}
                               label="Password"
                               variant="standard"
                               onChange={e => setPassword(e.target.value)}
                    />
                    <TextField fullWidth={true}
                               label="Email"
                               variant="standard"
                               onChange={e => setEmail(e.target.value)}
                    />
                    <Select
                        fullWidth={true}
                        label="Select Role"
                        onChange={e => setRole(e.target.value)}

                    >
                        <MenuItem value={"Developer"}>Developer</MenuItem>
                        <MenuItem value={"Customer"}>Customer</MenuItem>
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                    </Select>

                    <Button onClick={() => postUser()}>Save</Button>

                </Box>
            </Modal>
        </div>
    );
}
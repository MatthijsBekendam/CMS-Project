import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@material-ui/core";
import {useEffect} from "react";
import axios from "axios";

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

export default function AddButtonModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [save, setSave] = React.useState(false);

    useEffect(() => {
        const item = {title: title, description: description};
        axios
            .post("/api/articles/",item)
            .then((res) => console.log(res));
    }, [save]);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Add Product</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField fullWidth={true}
                               label="Product Title"
                               variant="standard"
                               onChange={e => setTitle(e.target.value)}
                    />
                    <TextField fullWidth={true}
                               placeholder="Product Description"
                               multiline
                               rows={2}
                               maxRows={4}
                               onChange={e => setTitle(e.target.value)}

                    />
                    <Button onClick={() => setSave(!save)}>Save</Button>
                </Box>
            </Modal>
        </div>
    );
}
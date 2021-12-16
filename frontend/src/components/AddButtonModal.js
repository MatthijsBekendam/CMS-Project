import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {TextField} from "@material-ui/core";
import {useEffect, useLayoutEffect} from "react";
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

export default function AddButtonModal({object}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [save, setSave] = React.useState(false);

    function postArticle() {
        const item = {id: "", title: title, description: description};
        axios
            .post("/api/articles/", item)
            .then((res) => console.log(res)).then(() => window.location.href = '/'
        ).catch((error) => {
            console.log('Error', error)
            if (error.response.status === 306) {
                alert("article already exists")
            }
            if (error.response.status === 400) {
                alert("Please fill in all information")
            }
        });
    }
    function editArticle() {
        const item = {id: object.id, title: title, description: description};
        axios
            .post("/api/edit-articles/", item)
            .then((res) => console.log(res)).then(() => window.location.href = '/'
        ).catch((error) => {
            console.log('Error', error)
            if (error.response.status === 404) {
                alert("article not found")
            }
            if (error.response.status === 400) {
                alert("Please fill in all information")
            }
        });
    }

    console.log("MY OBJECT", object)
    return (
        <div>
            {object === undefined ? <Button variant="contained" onClick={handleOpen}>Add Product</Button>
                :
                <Button onClick={handleOpen}>Edit</Button>

            }
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
                               defaultValue={object === undefined ? "" : object.title}
                               onChange={e => setTitle(e.target.value)}
                    />
                    <TextField fullWidth={true}
                               defaultValue={object === undefined ? "" : object.description}
                               placeholder="Product Description"
                               multiline
                               rows={2}
                               maxRows={4}
                               onChange={e => setDescription(e.target.value)}

                    />
                    {object === undefined ?
                        <Button onClick={() => postArticle()}>Save</Button> :
                        <Button onClick={() => editArticle()}>Edit</Button>
                    }
                </Box>
            </Modal>
        </div>
    );
}
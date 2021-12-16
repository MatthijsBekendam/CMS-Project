import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Grid, TextField} from "@material-ui/core";
import axios from "axios";
import Typography from '@mui/material/Typography';

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

export default function CommentModal({object, comments}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [comment, setComment] = useState("")

    function postComment() {
        const item = {id: object.id, user: "Matthijs", comment: comment, article: object.id};
        axios
            .post("/api/comment/", item)
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
    return (
        <div>

            <Button onClick={handleOpen}>Comment</Button>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{marginBottom: "20px"}} variant="h5">Comment Section</Typography>

                    {comments.map(x => {
                        if (x !== undefined) {
                            return (<Grid container spacing={2}>
                                <Grid item xs={6}>
                                    {x.user} :
                                </Grid>
                                <Grid item xs={6}>
                                    {x.comment}
                                </Grid>
                            </Grid>)
                        }
                    })}
                    <TextField fullWidth={true}
                               placeholder="Add Comment"
                               multiline
                               rows={2}
                               maxRows={4}
                               onChange={e => setComment(e.target.value)}
                               style={{marginTop: "20px"}}

                    />
                    <Button onClick={() => postComment()}>POST</Button>

                </Box>
            </Modal>
        </div>
    );
}
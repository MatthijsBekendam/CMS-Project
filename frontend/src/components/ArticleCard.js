import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddButtonModal from "./AddButtonModal";
import commentModal from "./CommentModel";
import CommentModal from "./CommentModel";
import {useEffect, useState} from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Grid, TextField} from "@material-ui/core";


export default function ArticleCard({object, comments}) {
    const [filteredComments, setFilteredComments] = useState([])
    useEffect(() => {
        setFilteredComments(
            comments.map(x => {
                if (x.article === object.id) {
                    return x
                }
            }))
    }, [comments, object])

    function deleteArticle() {
        const item = {id: object.id, title: object.title, description: object.description};
        axios
            .post("/api/delete-articles/", item)
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


    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {object.title}
                </Typography>

                <Typography variant="body2">
                    {object.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <AddButtonModal object={object}/>
                    </Grid>
                    <Grid item xs={3}>

                        <CommentModal comments={filteredComments} object={object}/>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={2}>

                        <IconButton onClick={() => deleteArticle()} aria-label="delete" size="large">
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
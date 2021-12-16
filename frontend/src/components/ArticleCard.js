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
                <AddButtonModal object={object}/>
                <CommentModal comments={filteredComments} object={object}/>
            </CardActions>
        </Card>
    );
}
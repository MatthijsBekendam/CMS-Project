import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddButtonModal from "./AddButtonModal";



export default function ArticleCard({object}) {
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
                {/*<Button size="small">Edit</Button>*/}
                <AddButtonModal object={object}/>
                <Button size="small">Comment</Button>


            </CardActions>
        </Card>
    );
}
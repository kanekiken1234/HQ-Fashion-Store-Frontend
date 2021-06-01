import { Grid, Typography, TextField, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    padding: {
        marginTop: '10rem',
        width: '100%',
        padding: '3rem 0rem'
    },
    textBox: {
        marginTop: '3rem',
    }
}))

const FeedbackSection = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.padding} elevation={10}>
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item xs={12}>
                    <Typography variant='h3'>Write to us, here!</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>No matter what we do or how well we do it, some criticism is eventually going to come our way.</Typography>
                </Grid>
                <Grid className={classes.textBox} item xs={12}>
                    <form noValidate autoComplete="off">
                        <TextField color='secondary' id="outlined-basic" label="E-Mail" variant="outlined" />
                    </form>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default FeedbackSection;
import React, { useLayoutEffect, useState } from 'react';
import { Grid, Typography, Paper, Divider, makeStyles, IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    img: {
        margin: '3rem',
    },
    details: {
        marginLeft: '1rem'
    }
}))

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}


const CartRow = ({ id, cartImg, name, price, qty, handleDelete, handleRemove, handleAdd }) => {
    const classes = useStyles();
    const [width,] = useWindowSize();
    return (
        <React.Fragment>
            <Paper elevation={12}>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                    <Grid item sm={8} xs={12}>
                        <Grid container direction='row' justify='flex-start' alignItems='center'>
                            <Grid sm={4} xs={12} item className={classes.mainImgMargin}>
                                <img className={classes.img} src={cartImg} alt='' />
                            </Grid>
                            <Grid sm={6} xs={12} className={classes.details} item>
                                <Typography align={width >= 950 ? 'left' : 'center'} variant="h6">{name}</Typography>
                                <Typography align={width >= 950 ? 'left' : 'center'} variant="h5">&#x20B9; {price}</Typography>
                                <br />
                                <Typography align={width >= 950 ? 'left' : 'center'}>Qty:&nbsp;&nbsp;{qty}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={4} xs={12} style={{ float: 'right' }}>

                        <IconButton onClick={() => handleAdd(id)} >
                            <AddIcon color='secondary' />
                        </IconButton>
                        <IconButton disabled={qty === 1} onClick={() => handleRemove(id)}>
                            <RemoveIcon style={{color : qty === 1 ? 'gray' : ''}} color='secondary' />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(id, qty)}>
                            <DeleteIcon color='secondary' />
                        </IconButton>
                    </Grid>

                </Grid>
            </Paper >
            <Divider />
        </React.Fragment >
    );
}

export default CartRow;
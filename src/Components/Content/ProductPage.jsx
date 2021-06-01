import React, { useState, useContext } from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { NumItems, LoggedIn, Cart } from './../context';
import { useHistory } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProductPage = (props) => {
    const { id, cartImg , name, price, mainImgLink, description } = props.location.state
    const [open, setOpen] = React.useState(false);
    const { setItems } = useContext(NumItems);
    const { logged } = useContext(LoggedIn);
    const { cart, setCart } = useContext(Cart);
    const history = useHistory();

    const vertical = 'bottom';
    const horizontal = 'left';


    const handleClickSnackbar = () => {
        setOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleAddtoCart = () => {

        if (logged) {
            setItems((prev) => prev + 1);
            let isNewItem = true;
            const newCart = cart.map((c) => {
                if (c.id === id) {
                    c.qty = c.qty + 1;
                    isNewItem = false;
                }
                return c;
            })
            if (isNewItem) {
                setCart([...cart, { id, name, cartImg, price, qty: 1 }])
            } else {
                setCart(newCart);
            }
            console.log(cart)
        }

        else
            handleClickSnackbar();
    }

    return (
        <Grid style={{ height: '60rem', position: 'relative', top: '4rem' }} container direction='row' justify='space-around'>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='warning'>
                    Please&nbsp;Sign&nbsp;In
                </Alert>
            </Snackbar>
            <Paper style={{ height: '525px' }} elevation={10}>
                <Grid style={{ margin: '2rem' }} item xs={12} sm={6}>
                    <img src={mainImgLink} />
                </Grid>
            </Paper>
            <Grid style={{ margin: '2rem' }} item xs={12} sm={6}>
                <Typography variant='h5' align='left'>{name}</Typography>
                <br />
                <Typography variant='h3' align='left'>&#x20B9;{price}</Typography>
                {description && <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }} />}
                <br />
                <br />
                <Grid style={{ marginBottom: '5rem' }} container direction='row' justify='space-between'>
                    <Button style={{ width: '40%' }} onClick={handleAddtoCart} size='large' color='secondary' variant='outlined'>Add to Cart</Button>
                    <Button style={{ width: '40%' }} size='large' color='secondary' variant='contained' >Buy Now</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProductPage;
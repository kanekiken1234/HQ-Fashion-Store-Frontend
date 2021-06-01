import { CssBaseline, makeStyles, Grid, Paper, Typography, Avatar, Button } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartRow from './CartRow';
import { Cart, NumItems } from "../context";
import { useHistory } from 'react-router-dom';
import { TotalCost } from "../context";


const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    heading: {
        marginBottom: theme.spacing(2)
    },
    cartDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(3)
    }
}))


const CartItems = () => {
    const classes = useStyles();
    const history = useHistory();
    const { cart, setCart } = useContext(Cart);
    const { items, setItems } = useContext(NumItems);
    const { setTotal } = useContext(TotalCost);
    const [totalCost, setTotalCost] = useState(0);

    const handleDelete = (id, qty) => {
        setItems(prev => prev >= 0 ? prev - qty : null);
        setCart(cart.filter(c => c.id !== id))
    }

    const handleRemove = (id) => {
        setItems(prev => prev >= 0 ? prev - 1 : null);
        setCart(cart.map((c) => {
            if (c.id === id) c.qty = c.qty - 1;
            return c;
        }))
    }

    const handleAdd = (id) => {
        setItems(prev => prev + 1);
        setCart(cart.map((c) => {
            if (c.id === id) c.qty = c.qty + 1;
            return c;
        }))
    }

    const calculateTotalCost = () => {
        let total = 0;
        cart.forEach((c) => total += c.qty * c.price)
        setTotalCost(total);
    }

    useEffect(() => {
        calculateTotalCost();
    }, [cart])

    const handlePayment = (totalCost) => {
        if (items > 0) {
            setTotal(totalCost);
            history.push('/payment')
        }
        else console.log("cart is empty");
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ShoppingCartIcon color='primary' />
                </Avatar>
                <Typography className={classes.heading} component="h1" variant="h5">My Cart</Typography>
                <Grid container justify='center' alignItems='center'>
                    <Grid item sm={10} xs={12} >

                        <div className={classes.cartDetails} style={{ width: '100%' }}>
                            <Typography variant='h5'>Sub&nbsp;Total:&nbsp;&nbsp;&#x20B9;&nbsp;{totalCost}</Typography>
                            <div>
                                <Button onClick={() => handlePayment(totalCost)} variant='contained' color='secondary'>Proceed&nbsp;to&nbsp;Buy</Button>
                            </div>
                        </div>

                    </Grid>
                    <Grid item sm={10} xs={12}>
                        <Paper elevation={5} >
                            {cart.map((each) =>
                                <CartRow
                                    handleAdd={handleAdd}
                                    handleRemove={handleRemove}
                                    handleDelete={handleDelete}
                                    id={each.id}
                                    cartImg={each.cartImg}
                                    name={each.name}
                                    price={each.price}
                                    qty={each.qty} />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment >
    );
}

export default CartItems;
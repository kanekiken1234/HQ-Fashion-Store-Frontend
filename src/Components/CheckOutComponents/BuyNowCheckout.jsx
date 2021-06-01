import React, { useContext, useRef, useState, useEffect } from 'react';
import { CurrentUser } from "../context";
import { useHistory } from 'react-router-dom';
import { Grid, Paper, Typography, Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from './../../axios';


const InstantCheckout = (props) => {
    const { id, name, price } = props.location.state;
    const item = [{
        "id": id,
        "name": name,
        "price": price
    }];
    const { userEmail } = useContext(CurrentUser);
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState(null)
    const paypalRef = useRef();
    const history = useHistory();
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    const handleSave = async () => {
        const saved = await axios.post('/saveOrder', {
            "email": userEmail,
            "orders": item,
            "totalcost": price
        })
    }


    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [{
                            description: 'HQ Checkout',
                            amount: {
                                currency_code: 'INR',
                                value: price
                            }
                        }]
                    })
                },

                onApprove: (data, actions) => {
                    return actions.order.capture().then(function (details) {
                        handleSave();
                        handleToggleBackdrop();
                        setTimeout(() => {
                            setPaid(true);
                            handleCloseBackdrop();
                            history.replace('/review')
                        }, 4000)


                    });
                },


                onError: err => {
                    setError(err);
                }

            }).render(paypalRef.current);
    }, [price])

    if (error) {
        return (
            <Grid style={{ marginTop: '5rem' }} container justify='center' alignItems='center'>
                <Paper elevation={10} style={{
                    padding: '2rem',
                    width: '50%',
                    height: 'auto'
                }}>
                    <div style={{ margin: '2rem', height: 'auto' }}>
                        <CancelIcon fontSize='large' style={{ margin: '1rem' }} />
                        <Typography variant='h3'>Error: Payment Declined</Typography>
                        <br />
                        <Typography variant='h6'>{error}</Typography>
                        <br />
                    </div>
                </Paper>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Backdrop style={{ zIndex: 9999 }} open={openBackdrop}>
                <CircularProgress color="primary" />
            </Backdrop>
            <Grid style={{ marginTop: '5rem' }} container justify='center' alignItems='center'>
                <Paper elevation={10} style={{
                    padding: '2rem',
                    width: '50%',
                    height: 'auto'
                }}>
                    <div style={{ margin: '3rem', height: 'auto' }}>
                        <Typography variant='h4'>Price to be paid:  &#x20B9; {price}</Typography>
                        <br />
                        <Typography variant='h6'>Please choose method of payment</Typography>
                    </div>
                    <div ref={paypalRef} />
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default InstantCheckout;

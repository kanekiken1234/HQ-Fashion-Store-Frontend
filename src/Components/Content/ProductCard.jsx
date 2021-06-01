import React, { useContext } from 'react';
import { makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography, Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { NumItems, LoggedIn, Cart } from './../context';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';



function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        height: '27rem',
        margin: '1rem 0',
        position: 'relative'
    },
    productImage: {
        maxWidth: "180px",
        maxHeight: "240px"

    }
}))


const ProductCard = ({ id, name, price, imgLink, mainImgLink, description, cartImg }) => {
    const [open, setOpen] = React.useState(false);
    const { setItems } = useContext(NumItems);
    const { logged } = useContext(LoggedIn);
    const { cart, setCart } = useContext(Cart);
    const classes = useStyles();
    const history = useHistory();

    const vertical = 'bottom';
    const horizontal = 'left';

    const handleClick = () => {
        history.push('/productPage', { id, name, price, mainImgLink, description, cartImg });
    }


    const handleClickSnackbar = () => {
        setOpen(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleBuyNow = () => {
        if (logged) {
            history.push('/instantPayment', { id, name, price })
        }

        else
            handleClickSnackbar();
    }


    const handleItems = () => {
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

    //const Media = lazy(() => <CardMedia className={classes.productImage} component="img" image={imgLink} height="300" />)
    return (
        <Card className={classes.root}>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='warning'>
                    Please&nbsp;Sign&nbsp;In
                </Alert>
            </Snackbar>
            <CardActionArea onClick={handleClick}>

                <CardMedia className={classes.productImage} component="img" image={imgLink} height="300" />


                <CardContent>

                    <Typography style={{ minHeight: '3rem' }} variant='h6'>
                        {name}
                    </Typography>

                    <br />
                    <Typography variant='h5'>
                        &#x20B9; {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Button style={{ width: '45%' }} size='large' color='secondary' variant='outlined' onClick={handleItems}>Add&nbsp;to&nbsp;Cart</Button>
                <Button style={{ width: '45%' }} size='large' color='secondary' variant='contained' onClick={handleBuyNow}>Buy&nbsp;Now</Button>
            </div>
        </Card>
    );
}

export default ProductCard;
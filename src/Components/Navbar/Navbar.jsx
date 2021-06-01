import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton, makeStyles, Menu, MenuItem, Badge } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { common } from '@material-ui/core/colors';
import { NumItems, LoggedIn, CurrentUser, Cart } from './../context';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from '../../axios';

const useStyles = makeStyles((theme) => ({
    padding: {
        paddingRight: '1.5rem',
    },
    linkStyle: {
        textDecoration: 'none',
        color: common.white
    },
    linkStyle1: {
        textDecoration: 'none',
        color: common.black
    },
}))


const Navbar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const { items, setItems } = useContext(NumItems);
    const { logged, setLogged } = useContext(LoggedIn);
    const { userName, userEmail } = useContext(CurrentUser);
    const { cart, setCart } = useContext(Cart);

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const reqObj = { userEmail, cart }
        const response = await axios.post("/saveCart", reqObj);
        if (response.data) {
            handleToggleBackdrop();
            setTimeout(() => {
                setLogged(false);
                window.localStorage.removeItem("accessToken");
                setItems(0);
                setCart([]);
                handleCloseBackdrop();
            }, 3000);
        }
        else
            return null;

    }

    return (
        <AppBar style={{ zIndex: 9999 }} color='secondary' elevation={0} position='sticky'>
            <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit" />
                <Typography variant='h5' color='primary'>&nbsp;&nbsp;Signing&nbsp;Out...</Typography>
            </Backdrop>
            <Toolbar>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                    <Grid item>
                        <Typography variant='h5'>HQ</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems='center'>
                            <Link to='/' className={classes.linkStyle}><Typography className={classes.padding} variant='h6'>Home</Typography></Link>
                            <Link to='/mens' className={classes.linkStyle}><Typography className={classes.padding} variant='h6'>Mens</Typography></Link>
                            <Link to='/womens' className={classes.linkStyle}><Typography className={classes.padding} variant='h6'>Womens</Typography></Link>
                            {/* <Link to='/accessories' className={classes.linkStyle}><Typography className={classes.padding} variant='h6'>Accessories</Typography></Link>
                            <Link to='/about' className={classes.linkStyle}><Typography className={classes.padding} variant='h6'>About</Typography></Link> */}
                            {logged && <Link to='/checkout'><IconButton>
                                <Badge badgeContent={items} color='primary'>
                                    <ShoppingCartOutlinedIcon color='primary' />
                                </Badge>
                            </IconButton></Link>}
                            <IconButton onClick={handleMenu}>
                                <AccountCircleOutlinedIcon color='primary' />
                                {logged && <Typography color='primary'>&nbsp;&nbsp;Hi,&nbsp;{userName}</Typography>}
                            </IconButton>
                            <Menu
                                style={{ zIndex: 9999 }}
                                className={classes.menu}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >{logged ?
                                <div>
                                    <MenuItem onClick={handleClose}><Link to='/profile' className={classes.linkStyle1}>Profile</Link></MenuItem>
                                    <MenuItem onClick={handleClose}><Link to='/' onClick={handleLogout} className={classes.linkStyle1}>Logout</Link></MenuItem>
                                </div>
                                :
                                <div>
                                    <MenuItem onClick={handleClose}><Link to='/login' className={classes.linkStyle1}>Sign In</Link></MenuItem>
                                    <MenuItem onClick={handleClose}><Link to='/signup' className={classes.linkStyle1}>Sign Up</Link></MenuItem>
                                </div>
                                }
                            </Menu>
                        </Grid>
                    </Grid>

                </Grid>
            </Toolbar>
        </AppBar >
    );
}

export default Navbar;
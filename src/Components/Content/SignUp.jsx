import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import { validate } from "../utils/validation";
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoggedIn, CurrentUser } from "../context";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textPadding: {
        marginBottom: '1rem'
    },
    position: {
        position: 'absolute',
        top: '1rem'
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confPass, setConfPass] = useState('');
    const [open, setOpen] = useState(false);
    const vertical = 'bottom';
    const horizontal = 'left';
    const [severityLevel, setSeverityLevel] = useState('');
    const [msg, setMsg] = useState('');
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const { setLogged } = useContext(LoggedIn);
    const { setUserEmail, setUserName } = useContext(CurrentUser);



    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackdrop(!openBackdrop);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = async () => {
        handleClick();
        try {
            const user = {
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: pass,
            }
            if (pass === confPass) {
                const validationResponse = validate(user);
                if (validationResponse.error) {
                    let error = validationResponse.error.toString();
                    setSeverityLevel('warning');
                    setMsg(error)
                }
                else {
                    const userDbRes = await axios.post("/users", user);
                    if (userDbRes) {
                        if (userDbRes.status === 404) {
                            setMsg(userDbRes.data.msg)
                            setSeverityLevel('warning');
                        }
                        else if (userDbRes.status === 200) {
                            setMsg('success');
                            localStorage.setItem("accessToken", userDbRes.data)
                            handleToggleBackdrop();
                            setTimeout(() => {
                                setLogged(true);
                                setUserEmail(email);
                                setUserName(firstName + " " + lastName)
                                handleCloseBackdrop();
                                history.push('/');
                            }, 3000)
                        }
                        else {
                            setMsg('Please insert correct details')
                            setSeverityLevel('error');
                        }
                    }

                }
            }
            else {
                setMsg("passwords dont match");
                setSeverityLevel('error');
            }

        }
        catch (e) {
            setSeverityLevel('error');
            setMsg("Server issues!");
        }
    }

    return (
        <React.Fragment>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
                <div style={{ maxWidth: '500px' }}>
                    <Backdrop className={classes.backdrop} open={openBackdrop}>
                        <CircularProgress color="inherit" />
                        <Typography variant='h5' color='primary'>&nbsp; &nbsp; Account&nbsp; Successfully&nbsp; Created</Typography>
                    </Backdrop>
                    {
                        (msg === 'success') ? null : <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity={severityLevel}>
                                {msg}
                            </Alert>
                        </Snackbar>
                    }
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography className={classes.textPadding} component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    color='secondary'
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={(e) => { setFirstName(e.currentTarget.value) }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    color='secondary'
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={(e) => { setLastName(e.currentTarget.value) }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    variant="outlined"
                                    color='secondary'
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => { setEmail(e.currentTarget.value) }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    variant="outlined"
                                    color='secondary'
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => { setPass(e.currentTarget.value) }}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    variant="outlined"
                                    color='secondary'
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    onChange={(e) => { setConfPass(e.currentTarget.value) }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    <Typography color='secondary'>Already have an account?Sign in</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}
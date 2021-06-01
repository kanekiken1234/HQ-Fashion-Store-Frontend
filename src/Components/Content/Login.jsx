import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from './../../axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoggedIn } from "../context";
import { validationLogin } from '../utils/validation';



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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    },
}));


export default function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const { setLogged } = useContext(LoggedIn);
    const history = useHistory();
    const vertical = 'bottom';
    const horizontal = 'left';
    const [severityLevel, setSeverityLevel] = useState('');
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

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
        try {
            const userCreds = {
                email: email,
                password: password
            }

            const validationResponse = validationLogin(userCreds);
            if (validationResponse.error) {
                let error = validationResponse.error.toString();
                handleClick();
                setSeverityLevel('warning');
                setMsg(error)
            }
            else {
                const loggingUser = await axios.post('/login', userCreds);
                console.log('hi');
                console.log(loggingUser);
                if (loggingUser.data.s === 404) {
                    handleClick();
                    setSeverityLevel('warning');
                    setMsg(loggingUser.data.msg);
                }
                else {
                    handleToggleBackdrop();
                    localStorage.setItem("accessToken", loggingUser.data);
                    setTimeout(() => {
                        setLogged(true);
                        props.render(1);
                        handleCloseBackdrop();
                        history.push('/');
                    }, 3000);
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', }}>
            <div style={{ maxWidth: '950px' }}>
                <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severityLevel}>
                        {msg}
                    </Alert>
                </Snackbar>
                <Backdrop className={classes.backdrop} open={openBackdrop}>
                    <CircularProgress color="inherit" />
                    <Typography variant='h5' color='primary'>&nbsp;&nbsp;Signing In...</Typography>
                </Backdrop>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color='secondary'
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        color='secondary'
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                <Typography color='secondary'>Forgot password?</Typography>
                            </Link>
                        </Grid>
                        <br />
                        <br />
                        <Grid item container justify='center'>
                            <Typography color='secondary'>Dont&nbsp;have&nbsp;an&nbsp;account&nbsp;?</Typography>
                            <Link href="#" variant="body2">
                                <Typography color='secondary'>&nbsp;Sign&nbsp;Up&nbsp;here</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}



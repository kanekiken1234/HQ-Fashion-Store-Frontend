import React from 'react';
import { Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: common.black,
        padding: '2rem 2rem',
        zIndex: 9999,
        position: 'relative'
    },
    footerLinks: {
        margin: '0.5rem 0rem'
    },
    gutter: {
        height: '2rem'
    }
}))

const Footer = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.background} elevation={24}>
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item>
                    <Typography className={classes.footerLinks} color='primary' align='left'>
                        Home
                    </Typography>
                    <Typography className={classes.footerLinks} color='primary' align='left'>
                        About Us
                    </Typography>
                    <Typography className={classes.gutter}></Typography>
                    <Typography className={classes.footerLinks} color='primary' align='left'>
                        Contact : +91 888548810
                    </Typography>
                    <Typography className={classes.footerLinks} color='primary' align='left'>
                        Email : hqFashionStore@gmail.com
                    </Typography>
                    <Typography className={classes.footerLinks} color='primary' align='left'>
                        &#169;Rights Reserved 2020
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='row'>
                        <IconButton>
                            <FacebookIcon fontSize='large' color='primary' />
                        </IconButton>
                        <IconButton>
                            <TwitterIcon fontSize='large' color='primary' />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon fontSize='large' color='primary' />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Paper >
    );
}

export default Footer;
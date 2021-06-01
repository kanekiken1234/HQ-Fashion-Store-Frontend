import { Grid, makeStyles, Typography, Button, Card, CardActionArea, CardMedia } from '@material-ui/core';
import React from 'react';
import landing from '../images/main2.png';
import { common } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";

import c1 from '../images/cat1.png';
import c2 from '../images/cat2.png';
import c3 from '../images/cat3.png';

import FeaturedClothing from './FeaturedClothing';
import FeaturedAccessories from './FeaturedAccessories';
import FeedbackSection from './FeedbackSection';
import Footer from './Footer';



const useStyles = makeStyles((theme) => ({
    imgLanding: {
        width: '100%',
        height: '100vh'
    },
    background: {
        width: '100vw',
        height: '100vh',
        backgroundColor: common.black
    },
    alignment: {
        position: 'absolute',
        top: '28%',
        left: '2%',
        color: common.white,
    },
    contentMargin: {
        marginTop: '1rem'
    },
    spacing: {
        width: '100%',
        height: 'auto'
    },
    collections: {
        marginTop: '5rem'
    },
    featuredClothing: {
        marginTop: '7rem',
    },
    root: {
        maxWidth: 345,
        marginBottom: '1rem'
    },
    productImage: {
        maxWidth: "180px",
        maxHeight: "240px"
    },
    featuredAccessories: {
        marginTop: '7rem',
    },
    wardrobe: {
        width: '100%',
        height: 'auto',
        marginTop: '7rem',
        position: 'absolute',
        top: '0rem'
    }
}))


const Content = (props) => {
    const history = useHistory();

    const redirect = () => {
        history.push('/mens');
    }

    const classes = useStyles();
    const collectionImgs = [c1, c2, c3];
    return (
        <Grid container>
            <Grid item>
                {window.innerWidth > 500 ? <img className={classes.imgLanding} src={landing} alt='' /> :
                    <div className={classes.background}></div>}
            </Grid>
            <Grid className={classes.alignment} item sm={12}>
                <Typography variant='h2' align='left'>
                    Find you best fit!
                </Typography>
                <Typography className={classes.contentMargin} variant='h6' align='left'>
                    Style is something each of us already has,<br /> all we need to do is find it.
                </Typography>
                <Typography className={classes.contentMargin} align='left'>
                    <Button onClick={redirect} size='large' color='primary' variant='outlined'>Shop&nbsp;Now</Button>
                </Typography>
            </Grid >

            <Grid className={classes.collections} container direction='column' justify='center' alignItems='center'>
                <Grid item container direction='row' justify='center' alignItems='center'>
                    {collectionImgs.map((img) => {
                        return (
                            <Grid item sm={4} align='center'>
                                <Card raised='true' className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia component="img" image={img} height="350" />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

            <Grid className={classes.featuredClothing} container direction='column' justify='center' alignItems='center'>
                <Grid item xs={12}>
                    <Typography variant={window.innerHeight > 500 ? 'h3' : ''}>Featured Clothing</Typography>
                </Grid>
                <FeaturedClothing />
            </Grid>

            <Grid className={classes.featuredAccessories} container direction='column' justify='center' alignItems='center'>
                <Grid item xs={12}>
                    <Typography variant={window.innerHeight > 500 ? 'h3' : ''}>Featured Accessories</Typography>
                </Grid>
                <FeaturedAccessories />
            </Grid>

            {/* <Grid item xs={12} align='center'>
                <FeedbackSection />
            </Grid> */}

            {/* <Grid item xs={12} align='center'>
                <Footer />
            </Grid> */}

        </Grid >
    );
}

export default Content;
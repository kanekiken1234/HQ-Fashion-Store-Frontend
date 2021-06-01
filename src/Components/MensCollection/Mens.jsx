import { Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import DrawerCustom from './../Content/DrawerCustom';
import ProductCard from './../Content/ProductCard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Mens = () => {
    const [shirtsArray, setShirtsArray] = useState([]);
    const [tShirtsArray, setTShirtsArray] = useState([]);
    const [pantsArray, setPantsArray] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    useEffect(() => {
        fetch('https://tranquil-inlet-80790.herokuapp.com/mens/shirts')
            .then((response) => response.json())
            .then((data) => {
                setShirtsArray(data);
                setDisplayData(data)
            })

        fetch('https://tranquil-inlet-80790.herokuapp.com/mens/tshirts')
            .then((response) => response.json())
            .then((data) => {
                setTShirtsArray(data);
            })

        fetch('https://tranquil-inlet-80790.herokuapp.com/mens/pantsAndTrousers')
            .then((response) => response.json())
            .then((data) => {
                setPantsArray(data);
            })
    }, [])

    const iWillHandleMensData = (section) => {
        if (section === 'Shirts')
            setDisplayData(shirtsArray);
        else if (section === 'T-Shirts')
            setDisplayData(tShirtsArray);
        else if (section === 'Pants/Trousers')
            setDisplayData(pantsArray);
    }

    if (shirtsArray.length > 0 && tShirtsArray.length > 0 && pantsArray.length > 0) {
        return (
            <Grid container direction='row' justify='space-between' alignItems='center'>
                <Grid item xs={2} sm={2}>
                    <DrawerCustom mens='true' handleMensSection={(section) => iWillHandleMensData(section)} />
                </Grid>
                <Grid item xs={10} sm={10}>
                    <Grid container direction='column' justify='center' alignItems='center'>
                        <Grid item container direction='row' justify='center' alignItems='center'>
                            {displayData.map((each) => {
                                return (
                                    <Grid item sm={4} align='center'>
                                        <ProductCard
                                            key={each.key}
                                            id={each.id}
                                            name={each.n}
                                            price={each.p}
                                            imgLink={each.imgFront["180X240"]}
                                            mainImgLink={each.imgFront["360X480"]}
                                            cartImg={each.imgFront["150X200"]}
                                            description={each.prodDescription}
                                        />
                                    </Grid>)
                            })}
                        </Grid>
                    </Grid >
                </Grid>
            </Grid>

        )
    }
    else {
        return (
            <Backdrop open={true}>
                <CircularProgress />
                <Typography variant='h4' color='primary'>&nbsp;&nbsp;Loading...</Typography>
            </Backdrop>
        )
    }
}


export default Mens;
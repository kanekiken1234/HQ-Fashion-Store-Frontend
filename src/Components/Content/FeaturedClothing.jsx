import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';

const FeaturedClothing = () => {
    const [dataArray, setArray] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000')
            .then((response) => response.json())
            .then((data) => {
                setArray(() => Object.values(data.fc))
            })
    }, [])
    if (dataArray.length === 0) {
        return null
    }
    else {
        return (
            <Grid container direction='column' justify='center' alignItems='center'>
                <Grid item container direction='row' justify='center' alignItems='center'>
                    {dataArray.map((each) => {
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
            </Grid>
        );
    }
}

export default FeaturedClothing;
import React, { useState, useContext, useEffect } from 'react';
import { CurrentUser } from '../context';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import { Divider, Grid, Paper, Typography, Link, TextField, List, ListItem } from '@material-ui/core';


const Profile = () => {

    const { userEmail, userName } = useContext(CurrentUser);
    const [profile, setProfile] = useState(null);

    useEffect(async () => {
        const profile = await axios.post('/profile', {
            email: userEmail
        })
        setProfile(profile.data);
    })

    return (
        <Grid style={{ marginTop: '5rem' }} container justify='center' alignItems='center'>
            <Paper elevation={10} style={{
                padding: '2rem',
                width: '50%',
                height: 'auto'
            }}>
                <div style={{ margin: '1rem', height: 'auto' }}>
                    <AccountCircleIcon fontSize='large' style={{ margin: '0.5rem' }} />
                    <Typography variant='h3'>Hi, {userName}</Typography>
                    <br />
                    <Divider />
                </div>
                <div style={{ marginLeft: '1rem', textAlign: 'left' }}>
                    <Typography>Name&nbsp;:-&nbsp;&nbsp;{userName}</Typography>
                    <br />
                    <Typography>Email&nbsp;:-&nbsp;&nbsp;{userEmail}</Typography>
                    <br />
                    <Typography>Order&nbsp;History :</Typography>
                    {profile && profile.map(({ cart, total, datetime }) => {
                        let i = 1
                        return (
                            <React.Fragment>
                                <Divider />
                                <List>
                                    <ListItem>
                                        {i}.&nbsp;Order Dated : {datetime}
                                    </ListItem>
                                    {cart.map(({ name, price, qty }) => {
                                        return (
                                            <ListItem>
                                                	&bull;&nbsp;{name}&nbsp;each&nbsp;&#x20B9;{price}&nbsp;quantity&nbsp;x{qty}
                                            </ListItem>
                                        )
                                    })}
                                    <ListItem>Total Price:&nbsp;&#x20B9;{total}</ListItem>
                                </List>
                                <Divider />
                            </React.Fragment>
                        )
                        i = i + 1
                    })}


                </div>
            </Paper>
        </Grid>
    );
}

export default Profile;
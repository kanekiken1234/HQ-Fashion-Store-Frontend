import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    gutter: {
        height: '4.5rem',
        width: '100%'
    }
}))



const DrawerCustom = ({ mens, womens, handleMensSection, handleWomensSection }) => {

    const classes = useStyles();
    const handleCollection = (text) => {
        if (mens)
            handleMensSection(text);
        else if (womens)
            handleWomensSection(text);
    }

    return (
        <Drawer
            variant='permanent'
            anchor='left'
            className={classes.position}
        >
            <div className={classes.gutter} />
            <List>
                {['Shirts', 'T-Shirts', 'Pants/Trousers'].map((text, index) => (
                    <ListItem button onClick={() => handleCollection(text)} key={text}>
                        <ListItemText key={index} primary={text} />
                    </ListItem>
                ))}
            </List>

        </Drawer>
    );
}

export default DrawerCustom;
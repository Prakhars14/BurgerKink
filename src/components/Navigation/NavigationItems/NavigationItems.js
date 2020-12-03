import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { checkPropTypes } from 'prop-types';
const navigationItems =(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem Link="/" exact>BurgerKink</NavigationItem>
        {props.isAuthenticated?<NavigationItem Link="/orders" >Orders</NavigationItem>:null}
        {!props.isAuthenticated? 
        <NavigationItem Link="/auth" >Login</NavigationItem>:
        <NavigationItem Link="/logout" >Logout</NavigationItem>}
    </ul>
);

export default navigationItems;
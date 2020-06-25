import React from 'react';
import classes from './SideDrawer.module.css';

import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/BackDrop/Backdrop';

function SideDrawer(props) {
    let attachedClasses =[classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses =[classes.SideDrawer, classes.Open];
    }
    return (
        <>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </>
    )
}

export default SideDrawer

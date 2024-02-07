import React, { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import avatarPng from '@/assets/avatar.png';
import avatarJpg from '@/assets/avatar.jpg';
import Calendar from '@/assets/calendar.svg';
import AppImage from '@/assets/app-image.svg';

// TREE SHAKING
// если код не используется - в итоговую сборку он не попадет
function TODO() {
    TODO2()
}

function TODO2() {
    throw new Error()
}

export const App = () => {

    const [count, setCount] = useState(0);

    const increment = () => {
        // TODO()
        setCount(prev => prev + 1)
    }

    // TODO('23823')

    // if (__PLATFORM__ === 'desktop') {
    //     return <div>ISDESKTOPPLATFORM</div>
    // }

    // if (__PLATFORM__ === 'mobile') {
    //     return <div>ISMOBILEPLATFORM</div>
    // }
    return (
        <div data-testid={'App.DataTestId'}>
            <h1>PLATFORM={__PLATFORM__}</h1>
            <div>
                <img width={100} height={100} src={avatarPng} alt="" />
                <img width={100} height={100} src={avatarJpg} alt="" />
            </div>
            <div>
                <Calendar width={150} height={150} style={{ color: 'green' }} />
                <AppImage width={150} height={150} style={{ color: 'green' }} />
            </div>
            <Link to={`/about`}>About</Link>
            <br />
            <Link to={`/shop`}>Shop</Link>
            <h1 className={classes.value}>{count}</h1>
            <button className={classes.button} onClick={increment}>Increment
                <span>Hey</span></button>
            <Outlet />
        </div>
    )
};



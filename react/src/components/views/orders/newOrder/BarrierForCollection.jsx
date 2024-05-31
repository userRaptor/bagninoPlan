import React from 'react'
import { useEffect, useState } from 'react';


function BarrierForCollection() {
    const [actualDate, setActualDate] = useState(new Date());
    const [reloadPage, setReloadPage] = useState(false);

    const barrierDate = 5;      // Sunday - Saturday : 0 - 6
    const barrierHour = 16;
    const barrierMinute = 8;    // ATTENTION at barrierMinute=0 =>(barrierMinute-1) = -1 and not 59


    const calculateTimer = () => {
        const nextWednesday = new Date(actualDate);
        nextWednesday.setDate(actualDate.getDate() + ((barrierDate + 7 - actualDate.getDay()) % 7));
        nextWednesday.setHours(barrierHour, barrierMinute, 0, 0);

        let diff = nextWednesday - actualDate;

        if (diff <= 0) {
            // Timer has expired, calculate the next Wednesday
            nextWednesday.setDate(nextWednesday.getDate() + 7);
            diff = nextWednesday - actualDate;
        }
    
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
    
        return { days, hours, minutes, seconds };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setActualDate(new Date());
        }, 1000);
    
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);
    
    
    useEffect(() => {
        if (reloadPage && actualDate.getDay() === barrierDate && actualDate.getHours() === barrierHour && actualDate.getMinutes() === barrierMinute) {
            window.location.reload();
        }

        if (actualDate.getDay() === barrierDate && actualDate.getHours() === barrierHour && actualDate.getMinutes() === barrierMinute-1) {
            setReloadPage(true);
        }
    }, [actualDate]);
    
    const timeForTimer = calculateTimer();

    return (
        <div>
            <p>Current time: {actualDate.toString()}</p>
            <p>Time until Wednesday 9:00: {timeForTimer.days} days, {timeForTimer.hours} hours, {timeForTimer.minutes} minutes, {timeForTimer.seconds} seconds</p>
        </div>
    )
}

export default BarrierForCollection;
"use client";

import React from 'react'
import './LightsOutBtn.css'

export default function LightsOutBtn({ onClick, children }: { onClick?: () => void, children: React.ReactNode }){
  
    const defaultClickHandler = () => {
        console.log('Lights out!');
        console.log(
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'k', metaKey: true }))
        );
    };
  
    return (
    <button className="lights-out shadow-neon" onClick={onClick || defaultClickHandler}>
        <span>{children}</span>
        <div className="lights">
            {[0,1,2,3,4].map((i) => (
                <i key={i} className="light" style={{ '--light-number': i+1 } as React.CSSProperties }></i>
            ))}
        </div>
    </button>
  )
}

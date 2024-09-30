import { color } from "d3";
import React from "react";

const Header: React.FC = () => {

    const headerStyle: React.CSSProperties = {
        borderRadius: 8,
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        color: '#fff',
        background: 'green',
    };
    const h1Style: React.CSSProperties = {
        textAlign: 'center',
    };

    return (
        <div style={headerStyle}>
            <h1 style={h1Style}>Personal Finance Manager</h1>           
        </div>
    )
}

export default Header;
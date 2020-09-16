import React from 'react'
// separate components because of the color changes

function IndexHeader({ themeColors, color }) {
    const h1Color = (color) => {
        switch (color) {
            case 'primary':
                return themeColors.primary
            case 'info':
                return themeColors.info
            case 'dark':
                return themeColors.dark
            default:
                return 'primary'
        }
    }
    return (
        <header className="header">
            <h1 className="header__title" style={{ color: h1Color(color) }}>Welcome to bitInfo</h1>
            <p className="header__subtitle">Here you can check current crypto-currency exchange rates:</p>
        </header>
    )
}

export default IndexHeader;
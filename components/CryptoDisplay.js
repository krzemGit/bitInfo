import React from 'react';
import ExchangeRates from './ExchangeRates';
import Graph from './Graph';

const CryptoDisplay = ({ prices, data, currency, regexp, color, themeColors }) => {
    const colorSelect = (crypto) => {
        switch (crypto) {
            case 'primary':
                return themeColors.primary
            case 'info':
                return themeColors.info
            case 'dark':
                return themeColors.dark
        }
    }
    const displayElements = (option) => {
        switch (option) {
            case 'BTC':
                return {
                    cryptoName: "Bitcoin",
                    exchange: prices.bitPrices,
                    data: data.bitData
                }
            case 'LTC':
                return {
                    cryptoName: "Litecoin",
                    exchange: prices.ltcPrices,
                    data: data.ltcData
                }
            case 'ETH':
                return {
                    cryptoName: "Ethereum",
                    exchange: prices.ethPrices,
                    data: data.ethData
                }
            default:
                return (<h3>Choose cryptocurrency for display</h3>)
        }
    };

    const dataVars = displayElements(currency)

    return (
        <div className="container-fluid display">

            <ExchangeRates
                className="col-12 col-lg-6 d-flex"
                cryptoName={dataVars.cryptoName}
                exchange={dataVars.exchange}
                regexp={regexp}
                color={color}
            />
            <hr className="display__hr" />
            <div className="col-12 col-lg-6 display__graph-container">
                <div className="display__graph-wrapper">
                    <Graph
                        className="col-12 col-md-6"
                        currency={currency}
                        data={dataVars.data}
                        color={colorSelect(color)}
                    />
                </div>
            </div>


        </div>
    )
}
export default CryptoDisplay;
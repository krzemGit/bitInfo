import React from 'react';
// function for displaying exchange rates in table

function ExchangeRates({ cryptoName, exchange, regexp, color }) {

    let display;

    if (exchange.length > 0) {
        const curPrice = exchange.filter(obj => regexp.test(obj.name.toLowerCase()) || regexp.test(obj.abbr.toLowerCase()));
        if (curPrice.length > 0) {
            let num = 0;
            display = (curPrice.map(el => {
                num++;

                // Capitalizing currencies for display
                const capitalizedCurrencyName = () => {
                    return el.name.split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                }

                let change = <span className="badge badge-secondary">No changes so far...</span>;
                switch (el.change) {
                    case 1:
                        change = <span className="badge badge-success">&#8638;</span>;
                        break;
                    case 2:
                        change = <span className="badge badge-warning">&#8642;</span>;
                        break;
                    default:
                        change = <span className="badge badge-secondary">&#8651;</span>;
                        break;
                }
                return (
                    <li key={num} className="list-group-item">{cryptoName} rate for {capitalizedCurrencyName()} :&nbsp;
                        <span className={`badge badge-${color}`}>{el.abbr.toUpperCase()}</span>&nbsp;
                        <strong>{el.rate}</strong> | {change}
                    </li>)
            }));
        } else {
            // in case phrase from input does not pass regex
            display = (<li className="list-group-item" style={{ height: 'auto' }}>No currencies under the given name</li>)
        };
    } else {
        // in case there is a problem with API
        display = <li className="list-group-item">Please wait, fetching data from coindesk.com</li>
    }

    return (
        <ul className="list-group col-12 col-lg-6 display__rates-table">
            {display}
        </ul>
    )

}

export default ExchangeRates;
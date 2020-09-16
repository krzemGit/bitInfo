import React from 'react';
// buttons and input for the home site

function FormPanel({ changeCurrency, changeCrypto, currentCrypto, changeColor }) {
    return (
        <div className="panel container-fluid">
            <div className="panel__buttons col-12 col-md-6">
                <p className="panel__buttons--wrapper">
                    <span className="panel__label d-block mb-3">Select your crypto-currency: </span>
                    <button
                        className={`btn btn${currentCrypto === 'BTC' ? '' : '-outline'}-primary ml-1 mr-3`}
                        onClick={() => { changeCrypto('BTC'); changeColor('primary') }}
                    >BTC</button>
                    <button
                        className={`btn btn${currentCrypto === 'LTC' ? '' : '-outline'}-info mr-3`}
                        onClick={() => { changeCrypto('LTC'); changeColor('info') }}
                    >LTC</button>
                    <button
                        className={`btn btn${currentCrypto === 'ETH' ? '' : '-outline'}-dark mr-1`}
                        onClick={() => { changeCrypto('ETH'); changeColor('dark') }}
                    >ETH</button>
                </p>
            </div>
            <div className="panel__input d-inline-block col-12 col-md-6">
                <span className="panel__label mb-3">Filter national currencies: </span>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                    </div>
                    <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="filter national currencies" onChange={changeCurrency} />
                </div>
            </div>
        </div>
    )
}

export default FormPanel;
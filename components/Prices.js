import Fetch from 'isomorphic-unfetch'
import CryptoDisplay from './CryptoDisplay'
import FormPanel from './FormPanel';
import IndexHeader from './IndexHeader'
import 'next/config'

// main element and source of truth for cryptocurrency exchange rates and the graph

class Prices extends React.Component {
    state = {
        currency: '',
        allCurrencies: [
            'united states dollars',
            'british pounds',
            'euro',
            'polish zloty',
            'japanese yen',
            'renminbi',
            'swedish crown',
            'hungarian forint',
            'czech crown',
            'mexican peso',
            'russian ruble'
        ],
        displayedCurrency: 'BTC',
        bitPrices: [],
        ltcPrices: [],
        ethPrices: [],
        intervalIndex: 0,

        // data for graphs
        bitData: [],
        ltcData: [],
        ethData: [],

        // elements for color scheme
        color: 'primary',
        themeColors: {
            primary: '#2fa4e7',
            info: '#033c73',
            dark: '#343a40'
        }
    }

    changeColor = (color) => {
        // method for changing color with crypto-currency change
        this.setState({
            color
        })
    }

    changeCurrencyInput = (e) => {
        this.setState({
            currency: e.target.value
        })
    }

    changeDisplayedCrypto = (displayedCurrency) => {
        this.setState({
            displayedCurrency
        })
    }

    checkIncrease = (abbr, rate) => {
        // check if the price increaed / decreased / remained
        let element = this.state.bitPrices.find(el => el.abbr === abbr)
        if (rate > element.rate) {
            return 1
        }
        else if (rate < element.rate) {
            return -1
        }
        else {
            return 0
        }
    }

    getCurrentTime = (date) => {
        // used for creating labels for graph
        const hours = date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return `${hours}:${minutes}:${seconds}`
    }

    loadDatatoState = (bitPrices, ltcPrices, ethPrices) => {
        let { bitData, ltcData, ethData } = this.state;
        const priceArray = [bitPrices, ltcPrices, ethPrices]
        const usdArray = [bitData, ltcData, ethData].map((list, index) => {
            if (list.length) {
                return priceArray[index][0].rate != list[list.length - 1].rate ? priceArray[index][0].rate : 0
            } else {
                return priceArray[index][0].rate
            }
        })
        this.setState(prevState => {
            return ({
                bitPrices,
                ltcPrices,
                ethPrices,
                bitData: usdArray[0] ? [...prevState.bitData, { rate: usdArray[0], label: this.getCurrentTime(new Date()) }] : prevState.bitData,
                ltcData: usdArray[1] ? [...prevState.ltcData, { rate: usdArray[1], label: this.getCurrentTime(new Date()) }] : prevState.ltcData,
                ethData: usdArray[2] ? [...prevState.ethData, { rate: usdArray[2], label: this.getCurrentTime(new Date()) }] : prevState.ethData,
            })
        })
    };

    convertDataToArray = (obj) => {
        // data frm API is in a form of an object, it needed to be transformed into an array
        const objArray = [obj.bitcoin, obj.litecoin, obj.ethereum]
        let bitPrices = [];
        let litePrices = [];
        let etherPrices = [];

        objArray.forEach((cryptObj, index) => {
            const tempArr = Object.entries(cryptObj)
            const cryptoListLengths = [this.state.bitPrices.length, this.state.ltcPrices.length, this.state.ethPrices.length]

            tempArr.forEach(([abbr, rate], nameIndex) => {
                let cryptoObj = {
                    name: this.state.allCurrencies[nameIndex],
                    abbr,
                    rate,
                    change: cryptoListLengths[index] > 0 ? this.checkIncrease(abbr, rate) : 0
                };
                switch (index) {
                    case 0:
                        bitPrices.push(cryptoObj)
                        break
                    case 1:
                        litePrices.push(cryptoObj)
                        break
                    case 2:
                        etherPrices.push(cryptoObj)
                        break
                    default:
                        break
                };

            });
        });
        this.loadDatatoState(bitPrices, litePrices, etherPrices)
    };

    updateCurrencies = () => {
        Fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Clitecoin&vs_currencies=USD%2CGBP%2CEUR%2CPLN%2CJPY%2CCNY%2CSEK%2CHUF%2CCZK%2CMXN%2CRUB')
            .then(res => res.json())
            .then(data => this.convertDataToArray(data))
            .catch(err => console.log(err))
    }

    componentDidMount() {

        this.updateCurrencies()
        // updating exchange rates every 20 seconds
        this.state.intervalIndex = setInterval(() => this.updateCurrencies(), 20000)
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalIndex)
    }


    render() {
        const { currency, displayedCurrency, bitData, ltcData, ethData, bitPrices, ltcPrices, ethPrices, color, themeColors } = this.state;
        const regexp = new RegExp(currency.toLowerCase().trim(), 'g')

        return (
            <div className="main-wrapper">
                <IndexHeader color={color} themeColors={themeColors} />
                <FormPanel
                    changeCurrency={this.changeCurrencyInput}
                    changeCrypto={this.changeDisplayedCrypto}
                    changeColor={this.changeColor}
                    currentCrypto={displayedCurrency}
                />
                <hr />
                <CryptoDisplay
                    prices={{ bitPrices, ltcPrices, ethPrices }}
                    data={{ bitData, ltcData, ethData }}
                    currency={displayedCurrency}
                    regexp={regexp}
                    color={color}
                    themeColors={themeColors}
                />
            </div>
        )
    }
}

export default Prices;
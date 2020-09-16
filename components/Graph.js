import React from 'react';
import { Bar } from 'react-chartjs-2'


function Graph({ currency, data, color }) { // data = list of objects: {rate: num, date: str} <- incoming data format

    // transforming data from objects to arrays - appropriate format for chart.js 
    const rateArray = data.map(el => el.rate);
    const labelArray = data.map(el => el.label)

    return (
        <Bar
            data={{
                labels: labelArray,
                datasets: [
                    {
                        label: currency,
                        data: rateArray,
                        backgroundColor: color,
                        borderColor: 'black',
                    },
                ]
            }}
            width={100}
            height={100}
            options={{
                title: { display: true, text: `USD / ${currency} exchange rates`, fontSize: 20 },
                legend: { display: false, position: 'right' }
            }}
        />
    )
}


export default Graph;
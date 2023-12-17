import Card from "../../designs/components/Card";
import { useEffect, useState } from 'react';
import { getDataFromTimeRange } from '../../adapters/earthquake';
import { PieChart } from '@mui/x-charts/PieChart';

const Top3StateCard = (): JSX.Element => {

    const [top3, setTop3] = useState([['','']])
    const [totalofRest, setTotalofRest] = useState(0)

    const getYesterdayTime = () => {
        const yesterday = new Date(Date.now() - 86400000).getDate();

        let start = new Date(Date.now()).setDate(yesterday);
        start = new Date(start).setMilliseconds(0);
        start = new Date(start).setSeconds(0);
        start = new Date(start).setMinutes(0);
        start = new Date(start).setHours(0);
        start = new Date(start).toISOString();

        let end = new Date(Date.now()).setDate(yesterday);
        end = new Date(end).setMilliseconds(999);
        end = new Date(end).setSeconds(59);
        end = new Date(end).setMinutes(59);
        end = new Date(end).setHours(23);
        end = new Date(end).toISOString();

        return { yesterdayStart: start, yesterdayEnd: end }
    }


    useEffect(() => {
        const getData = async () => {
            const { yesterdayStart, yesterdayEnd } = getYesterdayTime();
            const response = await getDataFromTimeRange(yesterdayStart.toString(), yesterdayEnd.toString());
            const yesterdayData = response['features'];
            console.log(yesterdayData);
            const yesterdayDataStateOnly = yesterdayData.map(data => data.properties.place.split(',')[1]);
            console.log(yesterdayDataStateOnly);

            const dataPerState = {}
            for (const state of yesterdayDataStateOnly) {
                dataPerState[state] = (dataPerState[state] || 0) + 1;
            }

            let sorted = Object.entries(dataPerState).sort(([key1, val1], [key2, val2]) => val2 - val1)
            const top3 = sorted.slice(0, 3);
            const rest = sorted.slice(3).reduce((res, data) => res + data[1], 0)

            setTop3(top3)
            setTotalofRest(rest)
        }
        getData();
    }, [])

    const chart = (
        <PieChart
            series={[
                {
                    data: [
                        ...top3.map( (val, i) => {
                            return {id : i, value: val[1], label: val[0]}
                        }),
                        {id : 3, value: totalofRest, label: "Other states"}
                    ],
                },
            ]}
            width={400}
            height={200}
            colors={['#FF7629', '#9A9A9A', '#E7E7E7', '#000000']}
        />
    )

    return (
        <Card
            picture={chart}
            title="Top 3 States with Highest Amount of Recorded Earthquake"
            desc="This graph shows the top 3 states with highest amount of recorded earthquake at the time of yesterday."
            extraText={`The graph suggests that ${top3[0][0] || ''} state lead at the top with ${top3[0][1] || ''} recorded earthquakes.`}
            vertical
        />
    )
};

export default Top3StateCard;
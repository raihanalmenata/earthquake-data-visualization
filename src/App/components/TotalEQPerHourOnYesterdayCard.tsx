import Card from "../../designs/components/Card";
import { useEffect, useState } from 'react';
import { getDataFromTimeRange } from '../../adapters/earthquake';
import { LineChart } from '@mui/x-charts/LineChart';

const TotalEQPerHourOnYesterdayCard = (): JSX.Element => {

    const [data, setData] = useState({});
    const [peak, setPeak] = useState('');

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
            const yesterdayDataHoursOnly = yesterdayData.map(data => new Date(data.properties.time).getHours());

            const dataPerHour = {}
            for (const hour of yesterdayDataHoursOnly) {
                dataPerHour[hour.toString()] = (dataPerHour[hour.toString()] || 0) + 1;
            }
            
            let sorted = Object.entries(dataPerHour).sort(([key1, val1],[key2, val2]) => val2 - val1)
            const peakHour = sorted[0][0]
            const peakAmount = sorted[0][1]
            const peakHourLabel = peakHour.padStart(2, '0') + ':00' + ' - ' + peakHour.padStart(2, '0') + ':59 with the amount of ' + peakAmount + ' recorded earthquakes.'
            
            setData(dataPerHour)
            setPeak(peakHourLabel)
        }
        getData();
    }, [])

    const chart = (
        <LineChart
            series={[
                {
                    data: Object.values(data),
                    color: '#FF7629'
                },
            ]}
            width={600}
            height={300}
        />
    )

    return (
        <Card
            picture={chart}
            title="Amount of Earthquake Recorded Per-hour Yesterday"
            desc="This graph shows the number of earthquake recorded per hour at the time of yesterday."
            extraText={`The graph suggests that the number of recorded earthquake per hour reached its peak at the time of ${peak} (24-hour format)`}
            vertical
        />
    )
};

export default TotalEQPerHourOnYesterdayCard;
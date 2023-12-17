const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/';

export const getDataFromTimeRange = async (startTime:string, endTime : string) => {

    const methodQuery = 'query'
    const parameterQuery = '?' + new URLSearchParams({format: 'geojson', starttime: startTime, endtime: endTime}).toString();
    const reqUrl = baseUrl + methodQuery + parameterQuery
    
    const response  = await fetch(reqUrl);
    const json = await response.json();

    return json
}
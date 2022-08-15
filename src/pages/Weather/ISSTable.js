import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Table } from 'reactstrap'
import ReactApexChart from "react-apexcharts";


const ISSTable = ({velocityUnit, altitudeUnit, data, dataColors}) => {
    
    
    const time = data[1]
    const date = data[0]
    const lat = data[3]
    const long = data[4]
    const velocity = data[5];
    const altitude = data[6];

    const [timeArr, setTimeArr] = useState([])
    const [dateArr, setDateArr] = useState([])
    const [latArr, setLatArr] = useState([])
    const [longArr, setLongArr] = useState([])
    const [velocityArr, setVelocityArr] = useState([])
    const [altitudeArr, setAltitudeArr] = useState([])
    
    const allDataArr =  [dateArr, velocityArr, altitudeArr, latArr, longArr]

   
    const rows = [];
   
    for(let i = 0; i < allDataArr.length; i++ ) {
        let cells = []
        for(let j = 0; j < allDataArr[0].length; j++ ) {
        cells.push(React.createElement('td', null, allDataArr[i][j]))
        }
        rows.push(React.createElement('tr', null, cells))
    }
   
    
   
    
    useEffect(() => {
        const prepareArr = () => {
            const valid = !isNaN(lat || long || velocity || altitude)
            if (!valid) {
                return;
            }
            setTimeArr((prevArr) => [...prevArr, time]);
            if (timeArr.length > 4) 
            timeArr.shift();
            setDateArr((prevArr) => [...prevArr, date]);
            if (dateArr.length > 4) 
            dateArr.shift();
            setLatArr((prevArr) => [...prevArr, parseFloat(lat)]);
            if (latArr.length > 4) 
            latArr.shift();
            setLongArr((prevArr) => [...prevArr, parseFloat(long)]);
            if (longArr.length > 4) 
            longArr.shift();
            setVelocityArr((prevArr) => [...prevArr, parseFloat(velocity)]);
            if (velocityArr.length > 4) 
            velocityArr.shift();
            setAltitudeArr((prevArr) => [...prevArr, parseFloat(altitude)]);
            if (altitudeArr.length > 4) 
            altitudeArr.shift();

           
           
       
        }
        prepareArr()
        
       
    }, [altitude])


    const altitudeConverter = (altitudeUnit) => {
        switch(altitudeUnit) {
            case 'Mile':
                
                return {data: altitudeArr?.map((altitude) => 
                    altitude * 0.621371
                    
                ), suffix:' mi'};
            case 'Meter':
                return {data: altitudeArr?.map((altitude) => 
                    altitude * 1000
                    
                ), suffix:' m'};
                
                
            case 'Kilometer':
                return {data: altitudeArr?.map((altitude) => 
                    altitude 
                    
                ), suffix:' km'};
                default:
                    return {data: altitudeArr?.map((altitude) => 
                        altitude 
                        
                    ), suffix:' km'};
        }
    }
      
    const speedConverter = (velocityUnit) => {
        switch(velocityUnit) {
            case 'Miles per hour':
                
                return {data: velocityArr?.map((velocity) => 
                    velocity / 1.609344
                    
                ), suffix:' mph'};
            case 'Meter per second':
                return {data: velocityArr?.map((velocity) => 
                    velocity * 0.277778
                    
                ), suffix:' ms⁻¹'};
                
                
            case 'Kilometer per hour':
                return {data: velocityArr?.map((velocity) => 
                    velocity 
                    
                ), suffix:' kmh⁻¹'};
                default:
                    return {data: velocityArr?.map((velocity) => 
                        velocity 
                        
                    ), suffix:' kmh⁻¹'};
        }
    }
  
  return (
    <React.Fragment>
     
    <Col xl={12} >
                        <Card>
                          <CardHeader>
               
                            Dynamic table of ISS values 
                         
                            
                            </CardHeader>
                        
                            <CardBody>
                                
                                <div className="ISS Data">
                                    <div className="table-responsive">
                                        <Table className="align-middle mb-0">
                                        <thead>
                                                        <tr>
                                                            <th scope="row">GMT time</th>
                                                            <th scope="row">Orbital Velocity</th>
                                                            <th scope="row">Altitude</th>
                                                            <th scope="row">Latitude</th>
                                                            <th scope="row">Longitude</th>
                                                        </tr>
                                                    </thead>
                                               <tbody>
                                               
                                                 
                                             <tr>
                                                <td>{dateArr[0]}</td>
                                                <td>{speedConverter(velocityUnit).data[0]} {speedConverter(velocityUnit).suffix}</td>
                                                <td>{altitudeConverter(altitudeUnit).data[0]} {altitudeConverter(altitudeUnit).suffix}</td>
                                                <td>{latArr[0]}</td>
                                                <td>{longArr[0]}</td>
                                             </tr>
                                             {dateArr.length > 1 && <tr>
                                                <td>{dateArr[1]}</td>
                                                <td>{speedConverter(velocityUnit).data[1]} {speedConverter(velocityUnit).suffix}</td>
                                                <td>{altitudeConverter(altitudeUnit).data[1]} {altitudeConverter(altitudeUnit).suffix}</td>
                                                <td>{latArr[1]}</td>
                                                <td>{longArr[1]}</td>
                                             </tr>}
                                             {dateArr.length > 2 && <tr>
                                                <td>{dateArr[2]}</td>
                                                <td>{speedConverter(velocityUnit).data[2]} {speedConverter(velocityUnit).suffix}</td>
                                                <td>{altitudeConverter(altitudeUnit).data[2]} {altitudeConverter(altitudeUnit).suffix}</td>
                                                <td>{latArr[2]}</td>
                                                <td>{longArr[2]}</td>
                                             </tr>}
                                             {dateArr.length > 3 && <tr>
                                                <td>{dateArr[3]}</td>
                                                <td>{speedConverter(velocityUnit).data[3]} {speedConverter(velocityUnit).suffix}</td>
                                                <td>{altitudeConverter(altitudeUnit).data[3]} {altitudeConverter(altitudeUnit).suffix}</td>
                                                <td>{latArr[3]}</td>
                                                <td>{longArr[3]}</td>
                                             </tr>}
                                             {dateArr.length > 4 && <tr>
                                                <td>{dateArr[4]}</td>
                                                <td>{speedConverter(velocityUnit).data[4]} {speedConverter(velocityUnit).suffix}</td>
                                                <td>{altitudeConverter(altitudeUnit).data[4]} {altitudeConverter(altitudeUnit).suffix}</td>
                                                <td>{latArr[4]}</td>
                                                <td>{longArr[4]}</td>
                                             </tr>}
                                                
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                               
                            </CardBody>
                        </Card>
                       
                    </Col>                

{/* <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="224"
        className="apex-charts"
      /> */}

</React.Fragment>
  )
}

export default ISSTable
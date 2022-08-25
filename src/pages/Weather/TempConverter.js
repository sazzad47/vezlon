import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Form, Input, Label, Row } from 'reactstrap';
import Quantities from './Quantities';
const TempConverter = ({tempUnit, setTempUnit, speedUnit, setSpeedUnit, pressureUnit, setPressureUnit}) => {
   
    const [parameter, setParameter] = useState()


    const quantities = Quantities.map((quantity, index) => (
        <option key={index} defaultValue={quantity.quantity}>{quantity.quantity}</option>
    ))
    const units = Quantities.find((quantity) => quantity.quantity===parameter)?.units.map((unit, index) => (
        <option key={index} defaultValue={unit}>{unit}</option>
    ))
    
    const handleChange = (e) => {
        if (parameter==='Temperature')
         return setTempUnit(e.target.value);
        if (parameter==='Wind Speed') 
         return setSpeedUnit(e.target.value);
        if (parameter==='Pressure')
         return setPressureUnit(e.target.value);
    }
  
  return (
    <> 
    
    <Card>
        <CardHeader>Unit Converter </CardHeader>
        <CardBody>

      
        <Form>
            <Row className="row-cols-lg-auto g-3 align-items-center">
               <Col xs={12} md={3} lg={3}>
                    <Label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</Label>
                    <select onChange={(e) => setParameter(e.target.value)} className="form-select" data-choices data-choices-sorting="true" id="inlineFormSelectPref">
                        <option >Choose parameter...</option>
                       {quantities}
                    </select>
                </Col>
                {/* <Col xs={12} md={3} lg={3}>
                    <Label className="visually-hidden" htmlFor="inlineFormInputGroupInput">Input</Label>
                    <div className="input-group">
                        <Input type="text" onChange={(e) => setInput(parseFloat(e.target.value))} className="form-control" id="inlineFormInputGroupInput" placeholder="Enter input" />
                    </div>
                </Col> */}
                <Col xs={12} md={3} lg={3}>
                    <Label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</Label>
                    <select disabled = {!parameter} onChange={handleChange} className="form-select" data-choices data-choices-sorting="true" id="inlineFormSelectPref">
                        <option >Convert to...</option>
                        {units}
                    </select>
                </Col>
                {/* <Col xs={12} md={3} lg={3}>
                    <Label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</Label>
                    <select onChange={convertTo} className="form-select" data-choices data-choices-sorting="true" id="inlineFormSelectPref">
                        <option >to...</option>
                        {units}
                    </select>
                </Col> */}
                {/* <Col xs={12} md={12} lg={12} style={{height:'5rem'}} className='border-top d-flex align-items-center justify-content-center'>
                    
                    <Col xs={12} md={3} lg={3} className='bg-light d-flex align-items-center justify-content-center mx-3'>
                    {to==='Celsius'? 
                  <h5 className='my-2'>
                    {output.toFixed(2)} °C
                  </h5>: to ==='Fahrenheit'?
                  <h5 className='my-2'>
                     {output.toFixed(2)} °F
                  </h5>: 
                  <h5 className='my-2'>
                     0.00
                  </h5>
                 }
                    </Col>
                 
                
                     
                    
                </Col> */}
            </Row>
        </Form>
        </CardBody>
    </Card>
    {/* //  <div className="App">
    //   <form onSubmit={convertTo}>
    //     <div>
    //       <label>temperature in celsius</label>
    //       <input value={celsius} onChange={(e) => setCelsius(e.target.value)} />
    //     </div>
    //     <button type="submit">convertTo</button>
    //   </form>
    //   <div>
    //     {celsius}c is {fahrenheit}f
    //   </div>
    // </div> */}
    </>
  )
}

export default TempConverter
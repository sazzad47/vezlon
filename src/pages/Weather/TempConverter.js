import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Form, Input, Label, Row } from 'reactstrap';
const TempConverter = () => {
    const [input, setInput] = useState(0);
    const [output, setOutput] = useState(0);

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const convertTo = (e) => {
        setTo(e.target.value)
        const formValid = !isNaN(+input);
        if (!formValid) {
          return;
        }
        if (!from || !to) {
            return;
        }
        (from === to)? (
            to==='Fahrenheit'?
            setOutput((+input - 32) * (5/9)):
            setOutput(+input * (9 / 5) + 32) 
            
           
        ) : (
            setOutput(input)
            
        )

      };
    const convertFrom = (e) => {
        setFrom(e.target.value)
        const formValid = !isNaN(+input);
        if (!formValid) {
          return;
        }
        if (!from || !to) {
            return;
        }
        (from === to)? (
            to==='Fahrenheit'?
            setOutput((+input - 32) * (5/9)):
            setOutput(+input * (9 / 5) + 32) 
            
           
        ) : (
            setOutput(input)
            
        )

      };
      console.log('from', from)

  return (
    <> 
    
    <Card>
        <CardHeader> Temperature Unit Converter </CardHeader>
        <CardBody>

      
        <Form onSubmit={convertTo}>
            <Row className="row-cols-lg-auto g-3 align-items-center">
                <Col xs={12} md={4} lg={4}>
                    <Label className="visually-hidden" htmlFor="inlineFormInputGroupInput">Input</Label>
                    <div className="input-group">
                        <Input type="text" onChange={(e) => setInput(parseFloat(e.target.value))} className="form-control" id="inlineFormInputGroupInput" placeholder="Enter temperature" />
                    </div>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</Label>
                    <select onChange={convertFrom} className="form-select" data-choices data-choices-sorting="true" id="inlineFormSelectPref">
                        <option >from...</option>
                        <option  defaultValue="Celsius">Celsius</option>
                        <option defaultValue="Fahrenheit">Fahrenheit</option>
                    </select>
                </Col>
                <Col xs={12} md={4} lg={4}>
                    <Label className="visually-hidden" htmlFor="inlineFormSelectPref">Preference</Label>
                    <select onChange={convertTo} className="form-select" data-choices data-choices-sorting="true" id="inlineFormSelectPref">
                        <option >to...</option>
                        <option  defaultValue="Celsius">Celsius</option>
                        <option defaultValue="Fahrenheit">Fahrenheit</option>
                    </select>
                </Col>
                <Col xs={12} md={12} lg={12} style={{height:'5rem'}} className='border-top d-flex align-items-center justify-content-center'>
                    
                    <Col xs={12} md={4} lg={4} className='bg-light d-flex align-items-center justify-content-center mx-3'>
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
                 
                
                     
                    
                </Col>
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
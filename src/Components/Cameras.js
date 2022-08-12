import Carousel from 'react-elastic-carousel';
import ISSStream from './ISSStream';

const breakpoints = [
    {width: 1, itemstoShwo: 3},
    {width: 550, itemstoShwo: 3},
    {width: 768, itemstoShwo: 3},
    {width: 1200, itemstoShwo: 4},
  ]
const Cameras = () => {
  return (
    
         <div
            >
              <Carousel style={{paddingTop:'3rem'}} breakPoints={breakpoints}>
                 <div style={{minHeight:'16rem'}}>
                 <ISSStream width="100%" height="100%" />
                 </div>
                 <div style={{minHeight:'16rem'}}>
                 <ISSStream width="100%" height="100%" />
                 </div>
                 <div style={{minHeight:'16rem'}}>
                 <ISSStream width="100%" height="100%" />
                 </div>
                 <div style={{minHeight:'16rem'}}>
                 <ISSStream width="100%" height="100%" />
                 </div>
                 <div style={{minHeight:'16rem'}}>
                 <ISSStream width="100%" height="100%" />
                 </div>
                 <div style={{minHeight:'16rem'}}>
                 <ISSStream width="100%" height="100%" />
                 </div>
                 <div style={{minHeight:'16rem'}}>
                 <ISSStream width="100%" height="100%" />
                 </div>
                 
              </Carousel>
            </div>
  
  )
}

export default Cameras
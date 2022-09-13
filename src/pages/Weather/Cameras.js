import Carousel from 'react-elastic-carousel';
import ISSStream from './ISSStream';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 3, itemsToScroll: 3 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 }
];
const Cameras = () => {
  return (
          <div style={{display:'flex', flexDirection:'column'}}>
         <div 
            >
              <Carousel itemPadding={[0, 10]} outerSpacing={0} style={{ minHeight:'15rem', position:'relative'}}  breakPoints={breakPoints} >
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
         <div 
            >
              <Carousel itemPadding={[0, 10]} outerSpacing={0} style={{ minHeight:'15rem', position:'relative', marginTop:'10px'}}  breakPoints={breakPoints} >
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
            </div>
  
  )
}

export default Cameras
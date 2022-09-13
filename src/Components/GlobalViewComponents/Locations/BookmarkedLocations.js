import React, { useContext } from 'react'
import { StateContext } from '../../../pages/Pages/GlobalViewPage/StateProvider';
import yellow_icon from '../asset/images/yellow_icon.png';
import red_icon from '../asset/images/red_icon.jpg';
import green_icon from '../asset/images/green_icon.png';
import { BillboardGraphics, Entity, EntityDescription } from 'resium';
import { DescriptionTable } from '../Common';
import { HeightReference, Cartesian3 } from 'cesium';
import * as Cesium from "cesium";

const BookmarkedLocations = () => {
  const { bookmarked } = useContext(StateContext);
  const icons = [yellow_icon, red_icon, green_icon];

  return (
    <>
      {bookmarked?.map((item, index) => (
        (
          <Entity
            key={`${item?.name}-${index}`}
            position={item?.pos}
            name={item?.name}
          >
            <EntityDescription>
              <DescriptionTable longitude={item?.longitude} latitude={item?.latitude} date={item?.date} desc={item?.desc} />
            </EntityDescription>
            {item?.icon === "Yellow" && (
              <BillboardGraphics 
              heightReference={HeightReference.CLAMP_TO_GROUND} 
              image={icons[0]} 
              scale={0.08}  
              eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
             
              verticalOrigin = {Cesium.VerticalOrigin.CENTER}
              horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
              disableDepthTestDistance= {1.2742018*10**7} 
              />
            )}
            {item?.icon === "Red" && (
              <BillboardGraphics 
              heightReference={HeightReference.CLAMP_TO_GROUND} 
              image={icons[1]} 
              scale={0.05} 
              eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
             
              verticalOrigin = {Cesium.VerticalOrigin.CENTER}
              horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
              disableDepthTestDistance= {1.2742018*10**7} 
              />
            )}
            {item?.icon === "Green" && (
              <BillboardGraphics 
              heightReference={HeightReference.CLAMP_TO_GROUND} 
              image={icons[2]} 
              scale={0.05} 
              eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
              
              verticalOrigin = {Cesium.VerticalOrigin.CENTER}
              horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
              disableDepthTestDistance= {1.2742018*10**7} 
              />
            )}
          </Entity>
        )
      ))
      }
    </>
  )
}

export default BookmarkedLocations;
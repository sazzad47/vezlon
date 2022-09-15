import { Cartesian3, HeightReference } from 'cesium'
import React, { useContext } from 'react'
import { BillboardGraphics, Entity, EntityDescription } from 'resium'
import { StateContext } from '../../../pages/Pages/GlobalViewPage/StateProvider'
import { DescriptionTable } from '../Common';
import yellow_icon from '../asset/images/yellow_icon.png';
import red_icon from '../asset/images/red_icon.jpg';
import green_icon from '../asset/images/green_icon.png';
import * as Cesium from "cesium";

const BookmarkingLocation = () => {
    const { bookmarking } = useContext(StateContext);
    const icons = [yellow_icon, red_icon, green_icon];
    if (!bookmarking?.long) return // Doesn't render if user hasn't clicked a location

    return (
        <Entity
            position={Cartesian3.fromDegrees(bookmarking?.long, bookmarking?.lat, 100)}
            name={bookmarking?.name}
            show={bookmarking?.long}
        >
            <EntityDescription>
                <DescriptionTable longitude={bookmarking?.longitude} latitude={bookmarking?.latitude} date={bookmarking?.date} desc={bookmarking?.desc} />
            </EntityDescription>
            {bookmarking?.icon === "Yellow" && (
                <BillboardGraphics 
                heightReference={HeightReference.CLAMP_TO_GROUND} 
                image={icons[0]} 
                scale={0.08}
                eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
                
                verticalOrigin = {Cesium.VerticalOrigin.BOTTOM}
                horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
                disableDepthTestDistance= {1.2742018*10**7} 
                />
            )}
            {bookmarking?.icon === "Red" && (
                <BillboardGraphics 
                heightReference={HeightReference.CLAMP_TO_GROUND} 
                image={icons[1]} 
                scale={0.05}
                eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
                
                verticalOrigin = {Cesium.VerticalOrigin.BOTTOM}
                horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
                disableDepthTestDistance= {1.2742018*10**7} 
                 />
            )}
            {bookmarking?.icon === "Green" && (
                <BillboardGraphics 
                heightReference={HeightReference.CLAMP_TO_GROUND} 
                image={icons[2]} 
                scale={0.05}
                eyeOffset = {new Cartesian3(0.0, 0.0, -10.0)}
               
                verticalOrigin = {Cesium.VerticalOrigin.BOTTOM}
                horizontalOrigin = {Cesium.HorizontalOrigin.CENTER}
                disableDepthTestDistance= {1.2742018*10**7} 
                />
            )}
        </Entity>
    )
}

export default BookmarkingLocation;
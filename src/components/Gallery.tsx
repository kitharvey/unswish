import React, { useEffect, useState } from 'react'
import { ImageProps } from '../types/globalTypes';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import LightBox from './LightBox';

interface GalleryProps {
    imagesArray: ImageProps[]
}

const Gallery: React.FC<GalleryProps> = ({imagesArray}) => {
    const [showModal, setshowModal] = useState<boolean>(false);
    const [initialPage, setInitialPage] = useState<number>(0);


    useEffect(() => {
        if(showModal) disableBodyScroll(document.body)
        else enableBodyScroll(document.body)
        return () => {
            clearAllBodyScrollLocks()
        }
    }, [showModal])

        return (
            <div className="gallery">
                    {imagesArray && imagesArray.map( (image, index) => {
                        return (
                            <div 
                                key={index} 
                                className={ image.height > image.width ? "portrait" : ""} 
                                onClick={() => {
                                    setshowModal(true)
                                    setInitialPage(index)
                                }}
                            >
                                <LazyLoadImage
                                    alt={image.alt_description}
                                    effect="blur"
                                    src={image.urls.thumb}
                                    draggable="false" 
                                    onDragStart={ (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
                                />
                            </div>
                       
                        )
                    } )}
                    {(showModal) && <LightBox initialPage={initialPage} images={imagesArray} setshowModal={setshowModal}  />}

                </div>
        );
}


export default Gallery
import React, { useState } from 'react'
import { wrap } from "popmotion";
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ImageProps } from '../types/globalTypes';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface LightBoxProps {
    images: ImageProps[]
    initialPage: number
    setshowModal: (showModal: boolean) => void
}

const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

const LightBox: React.FC<LightBoxProps> = ({images, initialPage, setshowModal}) => {
    const [[page, direction], setPage] = useState([initialPage, 0]);
    const imageIndex = wrap(0, images.length, page);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
      };
        return (
            <div className='modal'>
                <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    className='slide-wrapper'
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
        
                    if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                    }
                    }}
                >
                    <div className='slide-image-wrapper' >
                        <LazyLoadImage
                                alt={images[imageIndex].alt_description}
                                effect="blur"
                                src={images[imageIndex].urls.full}
                                draggable="false" 
                                onDragStart={ (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
                            />
                        <p className='name' >{images[imageIndex].user?.name}</p>
                        <p className='date' >{images[imageIndex].created_at.split('T')[0]}</p>
                        <p className='likes' ><FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp;{images[imageIndex].likes}</p>
                    </div>

                </motion.div>
                </AnimatePresence>
                <div className="next" onClick={() => paginate(1)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </div>
                <div className="prev" onClick={() => paginate(-1)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </div>
                <div className="close" onClick={() => setshowModal(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        );
}


export default LightBox
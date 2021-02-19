import React from 'react'
import { ScaleLoader } from 'react-spinners';
import { Waypoint } from 'react-waypoint';
import { useSWRInfinite } from 'swr';
import { fetchUnplashImages } from '../api/axios';
import Gallery from '../components/Gallery';

const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `photos?page=${pageIndex + 1}`                    // SWR key
  }

const MainPage: React.FC = () => {
    const { data, size, setSize } = useSWRInfinite(getKey, fetchUnplashImages)

    if(!data) return <div className="loader"><ScaleLoader height={20} width={4} radius={2} margin={2} /></div>

    return (
            <div className='main-page-wrapper' >
                <div className='gallery-wrapper container' >
                    <Gallery imagesArray={data.flat()} />
                </div>
                <div className="loader">
                    <Waypoint
                        onEnter={() => {
                            setSize(size + 1)
                        }}
                    />
                    <ScaleLoader height={20} width={4} radius={2} margin={2} />
                </div>
            </div>
    );
}


export default MainPage
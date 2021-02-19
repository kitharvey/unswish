import axios from "axios";
import {  ImageProps } from "../types/globalTypes";

export const fetchUnplashImages = async (link: string) => {
    const key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
    const {data} = await axios.get(`https://api.unsplash.com/${link}&client_id=${key}`)
    const typedDate: ImageProps[] = data
    return typedDate
}
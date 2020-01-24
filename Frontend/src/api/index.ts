import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

export const BASE_YOUTUBE_URL='https://www.googleapis.com/youtube/v3/search?';
export const API_KEY_YOUTUBE = 'AIzaSyCIzXzQhHvXBavdMfUDum9au8oXYgJwYNM key'; // test key
export const CHANEL_ID = 'UCBSJrFxTYAbu1sAGdeRg8cA';
const maxResults = 10;
// GET youtube 
// https://www.googleapis.com/youtube/v3/search?key={your_key_here}&channelId={channel_id_here}&part=snippet,id&order=date&maxResults=20
export default axios.create({
    baseURL: BASE_URL
});

export const API_YOTUBE = axios.create({
    baseURL: BASE_YOUTUBE_URL,
    params:{
        part:'snippet',
        channelId:'[CHANEL_ID]',
        key:'[API_KEY_YOUTUBE]',
        maxResults: maxResults,
    }
})

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';

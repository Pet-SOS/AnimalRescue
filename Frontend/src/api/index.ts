import axios from 'axios';
const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI2NDQ2MTczNC0wMWUwLTQxMmMtODdlYS1hNmJlYjQ5ZGIzZDEiLCJlbWFpbCI6ImFkbWluQGFuaW1hbHJlc2N1ZS5jb20iLCJ1bmlxdWVfbmFtZSI6ImFkbWluQGFuaW1hbHJlc2N1ZS5jb20iLCJqdGkiOiJlZTNlOGRmNy00YTA5LTRiNDQtYmQwYS05NzljZmZkOWU0NDUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU3VwZXIgVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6IlN1cGVyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTU4MzkzMzA0OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzODQvIiwiYXVkIjoiYXVkIn0.be2l8JCyPR-wPydm8fsULsJTzdMwlbY_B26FFCYsYkI"
export const BASE_URL = process.env.REACT_APP_API_URL;
//export const BASE_URL = 'https://localhost:5001/api/';
export const BASE_YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/';

export const API_YOTUBE = axios.create({
  baseURL: BASE_YOUTUBE_URL
})

export default axios.create({
    baseURL: BASE_URL,
    headers:{Authorization: `Bearer ${token}`}
});

export * from './requestState/defaultRequestState';
export * from './requestState/enumRequestState';
export * from './requestState/genericReducerRequestState';

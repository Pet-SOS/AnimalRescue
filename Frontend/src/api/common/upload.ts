import {API} from '../index';

export async function uploadFile(file: any): Promise<any> {
    console.log('API.post', API.post);
    const formdata = new FormData();
    formdata.append('files', file)
    return (await API.post(`Documents`, formdata));
}

import axios from 'axios';

export default axios.create({
    baseURL: `https://animalrescueapi.azurewebsites.net/api/`
});

import {  APIResponseTheDogAPI } from '@/interfaces/api.interface';
import axios from 'axios'

export const getBreedsAction = async()=>{
    try {
        const { data } = await axios.get<APIResponseTheDogAPI[]>(`${process.env.EXPO_PUBLIC_API_URL}`, {
          headers:{
            'x-api-key': process.env.EXPO_PUBLIC_API_KEY
          }
        });
        //console.log(data.length);
        return data;
        
    } catch (error) {   
      console.log(error);
      throw new Error('Error loading data.');
    }
}
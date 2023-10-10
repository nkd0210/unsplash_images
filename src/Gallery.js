import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useGlobalContext } from './context';

const url = 'https://api.unsplash.com/search/photos?client_id=v4_ieBLaTxYWBeTdBJHXWq4g44u-3KG4K3FwT3KTU-g';


function Gallery() {

    const { searchTerm, setSearchTerm } = useGlobalContext();

    const response = useQuery({
        queryKey: ['images', searchTerm],
        queryFn: async () => {
            const result = await axios.get(`${url}&query=${searchTerm}`);

            return result.data
        }
    });
    // console.log(response)
    // console.log(response.data)

    if (response.isLoading) {
        return (
            <section className='image-container'>
                <h4> Loading ... </h4>
            </section>
        )
    }

    if (response.isError) {
        return (
            <section className='image-container'>
                <h4> There was an error ... </h4>
            </section>
        )
    }

    const result = response.data.results;
    if (result.length < 1) {
        return (
            <section className='image-container'>
                <h4> No match result found ... </h4>
            </section>
        )
    }

    return (
        <section className='image-container'>
            {result.map((item) => {
                const url = item?.urls?.regular;
                return (
                    <img
                        src={url}
                        className='img'
                        key={item.id}
                        alt={item.alt_description}
                    />
                )
            })}
        </section>
    )
}

export default Gallery

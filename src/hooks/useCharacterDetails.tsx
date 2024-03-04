import { useState } from 'react';
import { CharacterType } from '../types/types';

interface UseCharacterDetailsProps {
    characterDetails: CharacterType[];
    totalPages: number;
    getCharacterDetails: (url: string) => Promise<void>;
}

const useCharacterDetails = (): UseCharacterDetailsProps => {
    const [totalPages, setTotalPages] = useState(0);
    const [characterDetails, setCharacterDetails] = useState<CharacterType[]>([]);

    const getCharacterDetails = async (url: string) => {
        try {
            const response = await fetch(url);
            const result = await response.json();

            // Assuming the structure of the response is { results: CharacterType[], info: { pages: number } }
            setCharacterDetails(result.results);
            setTotalPages(result.info.pages);
        } catch (error) {
            console.error(`Error fetching character details:`, error);
            throw new Error(`Error fetching character details: ${error}`);
        }
    };

    return { characterDetails, totalPages, getCharacterDetails };
};

export default useCharacterDetails;

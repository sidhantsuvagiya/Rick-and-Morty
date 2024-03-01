import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterType } from "../types/types";

const CharacterDetails = () => {

    const navigate = useNavigate();
    const [character, setCharacter] = useState<CharacterType | null>(null);

    const { characterId } = useParams<{ characterId: string }>();

    useEffect(() => {
        // If characterId is not a valid number, navigate to not found page
        if (isNaN(parseInt(characterId || "", 10))) {
            navigate("/not-found");
            return;
        }
        // Fetch character details based on characterId
        getCharacterDetails();
    }, [characterId]);

    const getCharacterDetails = async () => {
        try {
            const characterAPI = `https://rickandmortyapi.com/api/character/${characterId}`;
            const response = await fetch(characterAPI);
            const result = await response.json();
            console.log(result);
            setCharacter(result);
        } catch (error) {
            console.error(`Error fetching character details in ${CharacterDetails}.tsx:`, error);
        }
    };

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-8">
                <div className="flex items-center justify-center">
                    <img className="rounded-full w-32 h-32" src={character?.image} alt={character?.name} loading="lazy" />
                </div>
                <div className="mt-8">
                    <h2 className="text-center text-3xl font-semibold mb-8">{character?.name}</h2>
                    <p className="mb-4 text-xl font-bold text-gray-900">Status: {character?.status}</p>
                    <p className="mb-4 text-xl font-bold text-gray-900">Species: {character?.species}</p>
                    <p className="mb-4 text-xl font-bold text-gray-900">Type: {character?.type || "unknown"}</p>
                    <p className="mb-4 text-xl font-bold text-gray-900">Gender: {character?.gender}</p>
                    <p className="mb-4 text-xl font-bold text-gray-900">Location: {character?.location.name}</p>
                    <p className="mb-4 text-xl font-bold text-gray-900">Origin: {character?.origin.name}</p>
                    <p className="mb-4 text-xl font-bold text-gray-900">Episodes: {character?.episode.length}</p>
                </div>
            </div>
        </div>
    )
}

export default CharacterDetails
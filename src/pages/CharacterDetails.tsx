import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharacterType } from "../types/types";
import { API_BASE_URL, extractIdsFromUrls } from "../utils/utils";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorDisplay from "../components/common/ErrorDisplay";

const CharacterDetails = () => {

    const { characterId } = useParams<{ characterId: string }>();

    const [character, setCharacter] = useState<CharacterType | null>(null);
    const [episodeDetails, setEpisodeDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        getCharacterDetails();
    }, [characterId]);

    const getCharacterDetails = async () => {
        try {
            setError("");
            setLoading(true);

            const characterAPI = `${API_BASE_URL}/character/${characterId}`;
            const response = await fetch(characterAPI);

            if (!response.ok) {
                throw new Error(`Error: Fetching character details.`);
            }

            const result = await response.json();
            setCharacter(result);

            const episodeIdsString = extractIdsFromUrls(result.episode);
            const apiUrl = `${API_BASE_URL}/episode/${episodeIdsString}`;
            const episodeResponse = await fetch(apiUrl);

            if (!episodeResponse.ok) {
                throw new Error(`Error: Fetching episode details`);
            }

            const episodeDetailsResult = await episodeResponse.json();
            // Ensure characterResult is always an array
            const detailsArray = Array.isArray(episodeDetailsResult) ? episodeDetailsResult : [episodeDetailsResult];
            setEpisodeDetails(detailsArray);
        } catch (error) {
            setError(`Error: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) { return <LoadingSpinner /> }

    return (
        <div className="py-4 px-4 sm:py-8">
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-8">
                {error ? <ErrorDisplay error={error} /> : (
                    <>
                        <div className="flex items-center justify-center">
                            <img className="rounded-full w-32 h-32" src={character?.image} alt={character?.name} loading="lazy" />
                        </div>
                        <div>
                            <h2 className="text-center text-2xl font-semibold my-4 sm:text-3xl">{character?.name}</h2>
                            <p className="mb-4 text-xl text-gray-800"><b className="text-black">Status:</b> {character?.status}</p>
                            <p className="mb-4 text-xl text-gray-800"><b className="text-black">Species:</b> {character?.species}</p>
                            <p className="mb-4 text-xl text-gray-800"><b className="text-black">Origin:</b> {character?.origin.name}</p>
                            <p className="mb-4 text-xl text-gray-800"><b className="text-black">Type:</b> {character?.type || "unknown"}</p>
                            <p className="mb-4 text-xl text-gray-800"><b className="text-black">Gender:</b> {character?.gender}</p>
                            <p className="mb-4 text-xl text-gray-800"><b className="text-black">Location:</b> {character?.location.name}</p>
                            <p className="mb-4 text-xl text-gray-800"><b className="text-black">Total Episodes:</b> {character?.episode.length}</p>
                            <ul>
                                {episodeDetails.map((episode) => (
                                    <li key={episode.id} className="py-2 border-b border-gray-300">
                                        {episode.episode + " " + episode.name + " - " + episode.air_date}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CharacterDetails

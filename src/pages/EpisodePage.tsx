import React, { useEffect, useState } from "react";
import Selector from "../components/Selector";
import CharacterCard from "../components/CharacterCard";
import { extractIdsFromUrls } from "../utils/utils";
import ErrorDisplay from "../components/common/ErrorDisplay";
import LoadingSpinner from "../components/common/LoadingSpinner";

type EpisodeType = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
}

export const EpisodePage: React.FC = () => {
    const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
    const [characterDetails, setCharacterDetails] = useState<any[]>([]);
    const [selectedEpisode, setSelectedEpisode] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const getEpisodeDetails = async () => {
        try {
            setError("");
            setLoading(true);

            let apiUrl = "https://rickandmortyapi.com/api/episode";
            let allEpisodes: EpisodeType[] = [];

            do {
                const response = await fetch(apiUrl);
                const result = await response.json();

                // Append the current page's episodes to the array
                allEpisodes = allEpisodes.concat(result.results);

                // Update the apiUrl for the next page
                apiUrl = result.info.next;

            } while (apiUrl); // Continue fetching as long as there is a next page

            setEpisodes(allEpisodes);

            // Call getCharacterDetails for the first time
            if (allEpisodes.length > 0) {
                await getCharacterDetails(allEpisodes[0]);
            }
        } catch (error) {
            setError(`No episodes found. Please try a different search.`);
            console.log(`Error fetching episode details in EpisodePage.tsx:`, error);
        } finally {
            setLoading(false);
        }
    };

    const getCharacterDetails = async (selectedEpisodeDetails: EpisodeType) => {
        try {
            setError("");
            setLoading(true);

            if (selectedEpisodeDetails.characters.length === 0) {
                setCharacterDetails([]); // or handle it as needed
                setError(`No characters found for the selected episode.`);
                return;
            }

            const characterIdsString = extractIdsFromUrls(selectedEpisodeDetails.characters);
            const apiUrl = `https://rickandmortyapi.com/api/character/${characterIdsString}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.log(`Error fetching character details. Status: ${response.status}`);
                setError(`Error fetching character details. Status: ${response.status}`);
                return;
            }

            const characterResult = await response.json();
            // Ensure characterResult is always an array
            const detailsArray = Array.isArray(characterResult) ? characterResult : [characterResult];
            setCharacterDetails(detailsArray);
        } catch (error) {
            setError(`Error fetching character details: ${error}`);
            console.log("Error fetching character details:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleSelectEpisode = async (selectedEpisode: string) => {
        setSelectedEpisode(selectedEpisode);
        // Find the details of the selected episode using the name
        const selectedEpisodeDetails = episodes.find((episode) => episode.name === selectedEpisode);
        if (selectedEpisodeDetails) {
            await getCharacterDetails(selectedEpisodeDetails);
        }
    }

    useEffect(() => {
        getEpisodeDetails();
    }, []);

    if (loading) { return <LoadingSpinner /> }

    return (
        <div>
            <Selector
                options={episodes.map((episode) => episode.name)}
                selectedOption={selectedEpisode ? selectedEpisode : ""}
                onSelectOption={handleSelectEpisode}
            />
            {error ? (<ErrorDisplay error={error} />) : (
                <>
                    <div className="p-4 max-w-screen-xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {/* Display CharacterCard components if needed */}
                        {characterDetails.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
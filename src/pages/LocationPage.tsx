import { useEffect, useState } from "react";
import Selector from "../components/Selector";
import CharacterCard from "../components/CharacterCard";
import { API_BASE_URL, extractIdsFromUrls } from "../utils/utils";
import ErrorDisplay from "../components/common/ErrorDisplay";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { LocationType } from "../types/types";

const LocationPage = () => {

    const [locations, setLocations] = useState<LocationType[]>([]);
    const [characterDetails, setCharacterDetails] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string | number>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const getLocationDetails = async () => {
        try {
            setError("");
            setLoading(true);

            let apiUrl = `${API_BASE_URL}/location`;
            let allLocations: LocationType[] = [];

            do {
                const response = await fetch(apiUrl);
                const result = await response.json();
                allLocations = allLocations.concat(result.results);
                apiUrl = result.info.next;
            } while (apiUrl); // Continue fetching as long as there is a next page

            setLocations(allLocations);
            await getCharacterDetails(allLocations[0]);
        } catch (error) {
            setError(`No locations found. Please try a different search.`);
            console.log(`Error fetching location details in ${LocationPage}.tsx:`, error);
        } finally {
            setLoading(false);
        }
    };


    const getCharacterDetails = async (selectedLocationDetails: LocationType) => {
        try {
            setError("");
            setLoading(true);

            if (selectedLocationDetails.residents.length === 0) {
                setCharacterDetails([]);
                setError(`No residents found for the selected location.`);
                return;
            }

            const characterIdsString = extractIdsFromUrls(selectedLocationDetails.residents)
            const apiUrl = `${API_BASE_URL}/character/${characterIdsString}`;
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
    };

    const handleSelectLocation = async (selectedLocation: string | number) => {
        setSelectedLocation(selectedLocation);
        // Find the details of the selected location using the name
        const selectedLocationDetails = locations.find((location) => location.name === selectedLocation);
        if (selectedLocationDetails) {
            await getCharacterDetails(selectedLocationDetails);
        }
    };

    useEffect(() => {
        getLocationDetails();
    }, []);

    if (loading) { return <LoadingSpinner /> }

    return (
        <div>
            <Selector
                options={locations.map((location) => location.name)}
                selectedOption={selectedLocation ? selectedLocation : ""}
                onSelectOption={handleSelectLocation}
            />
            {error ? <ErrorDisplay error={error} /> : (
                <>
                    <div className="p-4 max-w-screen-xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {/* Here you can display the CharacterCard components if needed */}
                        {characterDetails.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default LocationPage;

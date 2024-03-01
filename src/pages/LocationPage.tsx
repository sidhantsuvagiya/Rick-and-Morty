import { useEffect, useState } from "react";
import Selector from "../components/Selector";
import CharacterCard from "../components/CharacterCard";

type LocationType = {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
}

export const LocationPage = () => {

    const [locations, setLocations] = useState<LocationType[]>([]);
    const [characterDetails, setCharacterDetails] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const getLocationDetails = async () => {
        try {
            setError("");
            setLoading(true);

            let apiUrl = "https://rickandmortyapi.com/api/location";
            let allLocations: LocationType[] = [];

            do {
                const response = await fetch(apiUrl);
                const result = await response.json();
                console.log("Locations:", result);

                // Append the current page's locations to the array
                allLocations = allLocations.concat(result.results);

                // Update the apiUrl for the next page
                apiUrl = result.info.next;

            } while (apiUrl); // Continue fetching as long as there is a next page

            setLocations(allLocations);

            // Call getCharacterDetails for the first time
            if (allLocations.length > 0) {
                await getCharacterDetails(allLocations[0]);
            }
        } catch (error) {
            setError(`No locations found. Please try a different search.`);
            console.error(`Error fetching location details in ${LocationPage}.tsx:`, error);
        } finally {
            setLoading(false);
        }
    };


    const getCharacterDetails = async (selectedLocationDetails: LocationType) => {
        try {
            setError("");
            setLoading(true);

            if (selectedLocationDetails.residents.length === 0) {
                setCharacterDetails([]); // or handle it as needed
                setError(`No residents found for the selected location.`);
                return;
            }

            const characterIds = selectedLocationDetails.residents
                .map(url => url.split("/").pop())  // Extract character IDs from URLs
                .filter(id => id !== undefined)   // Filter out undefined values
                .map(id => parseInt(id!));        // Convert to numbers


            const characterIdsString = characterIds.join(",");
            const apiUrl = `https://rickandmortyapi.com/api/character/${characterIdsString}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.error(`Error fetching character details. Status: ${response.status}`);
                setError(`Error fetching character details. Status: ${response.status}`);
                return;
            }

            const characterDetails2 = await response.json();
            console.log("Character Details:", characterDetails2);

            // Ensure characterDetails2 is always an array
            const detailsArray = Array.isArray(characterDetails2) ? characterDetails2 : [characterDetails2];
            setCharacterDetails(detailsArray);
        } catch (error) {
            setError(`Error fetching character details: ${error}`);
            console.error("Error fetching character details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectLocation = async (selectedLocation: string) => {
        setSelectedLocation(selectedLocation);
        console.log("Selected Location:", selectedLocation);

        // Find the details of the selected location using the name
        const selectedLocationDetails = locations.find((location) => location.name === selectedLocation);

        console.log("sid", selectedLocationDetails);

        if (selectedLocationDetails) {
            await getCharacterDetails(selectedLocationDetails);
        }
    };

    useEffect(() => {
        getLocationDetails();
    }, []);

    if (loading) { return <div className="flex items-center justify-center p-8"><i className="fas fa-spinner fa-spin text-4xl"></i></div>; }

    return (
        <div>
            <Selector
                options={locations.map((location) => location.name)}
                selectedOption={selectedLocation ? selectedLocation : ""}
                onSelectOption={handleSelectLocation}
            />
            {error ? (<div className="flex items-center justify-center p-8"> <p className="text-red-500 font-medium">{error}</p> </div>) : (
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

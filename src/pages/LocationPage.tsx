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
            const response = await fetch(apiUrl);
            const result = await response.json();
            console.log("Locations:", result);
            setLocations(result.results);
            // Call getCharacterDetails for the first time
            if (result.results.length > 0) {
                await getCharacterDetails(result.results[0]);
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
            setCharacterDetails(characterDetails2.filter(Boolean));
        } catch (error) {
            // setError(`Error fetching character details: ${error.message}`);
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
                selectedOption={selectedLocation ? selectedLocation.name : ""}
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

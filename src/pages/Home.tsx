import { useEffect, useState } from "react";
import { CharacterType } from "../types/types";
import Pagination from "../components/Pagination";
import CharacterCard from "../components/CharacterCard";
import Search from "../components/Search";
import ErrorDisplay from "../components/common/ErrorDisplay";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Selector from "../components/Selector";
import { API_BASE_URL } from "../utils/utils";

const Home = () => {

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [allCharacterDetails, setAllCharacterDetails] = useState<CharacterType[]>([]);
    const [characterDetails, setCharacterDetails] = useState<CharacterType[]>([]);
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [charactersPerPage, setCharactersPerPage] = useState<number>(8);


    const getCharacterDetails = async () => {
        try {
            setLoading(true);
            setError(null);


            let apiUrl = `${API_BASE_URL}/character?page=${currentPage}`;

            if (searchQuery) {
                apiUrl += `&name=${searchQuery}`;
            }

            let allcharacter: CharacterType[] = [];

            do {
                const response = await fetch(apiUrl);
                const result = await response.json();
                allcharacter = allcharacter.concat(result.results);
                apiUrl = result.info.next;
            } while (apiUrl); // Continue fetching as long as there is a next page

            setAllCharacterDetails(allcharacter);
            setTotalPages(allcharacter.length);
        } catch (error) {
            console.log(`Error fetching character details:`, error);
            setError(`No characters found for "${searchQuery}". Please try a different search.`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setCurrentPage(1);
        setSearchQuery(query);
    };

    const handlePerPageChange = (perPage: number | string) => {
        // Update total pages based on the number of characters and characters per page
        setCurrentPage(1);
        setCharactersPerPage(Number(perPage));
    };

    useEffect(() => {
        getCharacterDetails();
    }, [searchQuery]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * charactersPerPage;
        const endIndex = startIndex + charactersPerPage;
        // Calculate total pages based on the new perPage value
        const calculatedTotalPages = Math.ceil(allCharacterDetails.length / charactersPerPage);
        setTotalPages(calculatedTotalPages);

        const characterDetailsSlice = allCharacterDetails.slice(startIndex, endIndex);
        setCharacterDetails(characterDetailsSlice);
    }, [currentPage, charactersPerPage, allCharacterDetails]);

    if (loading) { return <LoadingSpinner /> }

    return (
        <div>
            <Search onSearch={handleSearch} />
            {error ? (<ErrorDisplay error={error} />) : (
                <>
                    <div className="p-4 max-w-screen-xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {characterDetails.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                    </div>
                    <div className="flex justify-center flex-wrap items-center my-6">
                        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
                        <Selector options={[8, 16, 32, 64]} selectedOption={charactersPerPage} onSelectOption={handlePerPageChange} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Home

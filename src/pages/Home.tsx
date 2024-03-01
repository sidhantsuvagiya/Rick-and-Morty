import { useEffect, useState } from "react"
import { CharacterType } from "../types/types";
import Pagination from "../components/Pagination";
import CharacterCard from "../components/CharacterCard"
import Search from "../components/Search";

export const Home = () => {

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [characterDetails, setCharacterDetails] = useState<CharacterType[]>([])
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const getCharacterDetails = async (searchQuery: string = "") => {
        try {
            setLoading(true);
            setError(null);

            let apiUrl = `https://rickandmortyapi.com/api/character?page=${currentPage}`;

            if (searchQuery) {
                apiUrl += `&name=${searchQuery}`;
            }

            const response = await fetch(apiUrl);
            const result = await response.json();
            console.log(result);

            setCharacterDetails(result.results);
            setTotalPages(result.info.pages);
        } catch (error) {
            console.error(`Error fetching character details in ${Home}.tsx:`, error);
            setError(`No characters found for "${searchQuery}". Please try a different search.`);
        } finally {
            setLoading(false);
        }
    }

    const handleSearch = (query: string) => {
        setCurrentPage(1); // Reset to the first page when a new search is initiated
        setSearchQuery(query);
    };

    useEffect(() => {
        getCharacterDetails(searchQuery || "")
    }, [currentPage, searchQuery])

    if (loading) { return <div className="flex items-center justify-center p-8"><i className="fas fa-spinner fa-spin text-4xl"></i></div> }

    return (
        <div>
            <Search onSearch={handleSearch} />
            {error ? <div className="flex items-center justify-center p-8"><p className="text-red-500 font-medium">{error}</p></div> : (
                <>
                    <div className="p-4 max-w-screen-xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {characterDetails.map((character) => <CharacterCard key={character.id} character={character} />)}
                    </div>
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
                </>)}
        </div>
    )
}
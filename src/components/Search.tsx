import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center mt-6 mb-4 mx-4">
            <div className="flex items-center mx-auto">
                <div className='relative w-full'>
                    <input type="text" id="search" placeholder="Enter character name" value={query} onChange={handleChange} className="block w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none" />
                </div>
                <button type="submit" className="bg-blue-500 text-white border-r border-t border-b border-gray-300 px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none" >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </form>
    )
}

export default Search
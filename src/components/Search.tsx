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
        <form onSubmit={handleSubmit} className="mt-8 mb-4 flex justify-center">
            <div className="flex items-center">
                <input type="text" id="search" placeholder="Enter character name" value={query} onChange={handleChange} className="border border-gray-300 p-2 rounded-l focus:outline-none" />
                <button type="submit" className="bg-blue-500 text-white border-r border-t border-b border-gray-300 px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none">Search</button>
            </div>
        </form>
    );
};

export default Search;

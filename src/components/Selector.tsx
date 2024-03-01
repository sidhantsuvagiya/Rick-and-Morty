import React from "react";

interface SelectorProps {
    options: string[];
    onSelectOption: (location: string) => void;
    selectedOption: string;
}

const Selector: React.FC<SelectorProps> = ({ options, onSelectOption, selectedOption }) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onSelectOption(selectedValue);
    };

    return (
        <form className="flex justify-center">
            <select
                id="locations"
                className="max-w-sm m-4 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleSelectChange}
                value={selectedOption}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default Selector;

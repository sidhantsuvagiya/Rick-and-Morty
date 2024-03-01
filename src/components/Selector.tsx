import React from "react";

interface SelectorProps {
    options: (string | number)[];
    onSelectOption: (value: string | number) => void;
    selectedOption: string | number;
}

const Selector: React.FC<SelectorProps> = ({ options, onSelectOption, selectedOption }) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onSelectOption(selectedValue);
    };

    return (
        <form className="flex justify-center mt-6 mx-4 my-6">
            <select
                id="locations"
                className="max-w-sm bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

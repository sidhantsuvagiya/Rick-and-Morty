import { useNavigate } from "react-router-dom";
import { CharacterType } from "../types/types"

const CharacterCard: React.FC<{ character: CharacterType }> = ({ character }) => {

    const navigate = useNavigate();

    const handleCharacterClick = () => {
        // Navigate to CharacterDetails page with the character ID
        navigate(`/character/${character.id}`);
    };

    return (
        <div onClick={handleCharacterClick} className="max-w-72 mx-auto border bg-gray-50 border-gray-200 rounded-lg cursor-pointer transition-transform transform hover:scale-95">
            <img className="rounded-t-lg w-72" src={character.image} alt={character.name} />
            <div className="p-5">
                <p className="block mb-2 text-xl font-bold tracking-tight text-gray-900">{character.name}</p>
                <p className="mb-1 font-normal text-gray-700"> <i className="fa-solid fa-circle-play"></i> <b>Total Episodes:</b> {character.episode.length}</p>
                <p className="mb-1 font-normal text-gray-700"> <i className="fa-solid fa-user"></i> <b>Type:</b> {character.type || 'unknown'}</p>
                <p className="font-normal text-gray-700"> <i className="fa-solid fa-location-dot"></i> <b>Location:</b> {character.location.name}</p>
            </div>
        </div>
    )
}

export default CharacterCard


import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="p-6 bg-gray-50 border border-gray-200">
      <NavLink to="/" className="flex justify-center text-4xl text-center font-semibold text-blue-500 transition-transform transform hover:scale-95">Rick & Morty</NavLink>
      <div className="flex mt-4 justify-center flex-wrap">
        <NavLink to="/" className="px-2  text-lg text-gray-600 hover:text-blue-500 transition duration-300 aria-[current=page]:text-blue-400"> Characters </NavLink>
        <NavLink to="/location" className="px-2 text-lg text-gray-600 hover:text-blue-500 transition duration-300 aria-[current=page]:text-blue-400"> Locations </NavLink>
        <NavLink to="/episode" className="px-2 text-lg text-gray-600 hover:text-blue-500 transition duration-300 aria-[current=page]:text-blue-400"> Episodes </NavLink>
      </div>
    </div>
  );
}

export default Header;

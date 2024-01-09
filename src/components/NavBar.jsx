import React from "react";

const Navbar = ({ onSearch }) => {
    return (
        <nav className="bg-gray-900 p-4 ml-10">
            <div className="max-w-6xl mx-auto">
                <input
                    type="text"
                    placeholder={"Cauta tag..."}
                    onChange={(e) => onSearch(e.target.value)}
                    className="px-4 py-2 rounded-md focus:outline-none bg-gray-700 text-white"
                />
            </div>
        </nav>
    );
};

export default Navbar;

import React from "react";

const Navbar = ({ onSearch, onAddNewProfile }) => {
    return (
        <nav className="bg-gray-900 p-4 ml-2 sm:ml-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <img src="images\logo.png" className="rounded-full h-8 w-8 object-cover ml-2 sm:ml-4 mr-4" />

                <input
                    type="text"
                    placeholder={"Cauta tag..."}
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-2 py-1 sm:px-4 sm:py-2 rounded-md focus:outline-none bg-gray-700 text-white mr-4"
                />


                <button
                    className="bg-blue-500 text-white p-2 rounded text-xs sm:text-sm"
                    onClick={() => {
                        const folderName = prompt("Nume Folder:");
                        if (folderName) {
                            onAddNewProfile(folderName);
                        }
                    }}
                >
                    Document Nou +
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

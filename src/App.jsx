import React, { useRef, useState } from "react";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import "react-image-crop/dist/ReactCrop.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FolderIcon from '@mui/icons-material/Folder';

function App() {
    const [searchTag, setSearchTag] = useState("");
    const [folders, setFolders] = useState([]);
    const imageURL = useRef(
        "https://dunlite.com.au/wp-content/uploads/2019/04/placeholder.jpg"
    );

    const updateFolder = (folderName, updatedProfile, profileKey) => {
        const prevFolders = [...folders]
        console.log(prevFolders);
        console.log(updatedProfile);
        const folderIndex = prevFolders.findIndex((folder) => folder.name === folderName);
        const beforeFolder = prevFolders.slice(0, folderIndex);
        const updatedFolder = prevFolders[folderIndex];
        const afterFolder = prevFolders.slice(folderIndex + 1);

        const profiles = updatedFolder.profiles;
        const profileIndex = profiles.findIndex((prof) => prof.key === profileKey);
        const beforeProfile = profiles.slice(0, profileIndex);
        const afterProfile = profiles.slice(profileIndex + 1);

        const newProfile =
        {
            key: profileKey,
            avatarUrl: updatedProfile.imageURL,
            title: updatedProfile.title,
            tags: updatedProfile.tags,
            modalOpen: updatedProfile.modalOpen,
        };
        
        const updatedProfiles = [...beforeProfile, newProfile, ...afterProfile]
        updatedFolder.profiles = updatedProfiles;
        const updatedFolders = [...beforeFolder, updatedFolder, ...afterFolder];

        console.log(updatedFolders);
        setFolders(updatedFolders);
    };

    const addNewProfile = (folderName) => {
        const folderIndex = folders.findIndex((folder) => folder.name === folderName);

        if (folderIndex !== -1) {

            // Folder exists, add profile to existing folder
            const updatedFolders = [...folders];
            updatedFolders[folderIndex].profiles.push({
                key: updatedFolders[folderIndex].profiles.length,
                title: "",
                tags: "",
                avatarUrl: imageURL,
            });
            setFolders(updatedFolders);
        } else {
            // Folder doesn't exist, create a new folder and add profile to it
            const newFolder = {
                name: folderName,
                isFolderVisible: true,
                profiles: [
                    {
                        key: 0,
                        title: "",
                        tags: "",
                        avatarUrl: imageURL,
                    },
                ],
            };
            setFolders([...folders, newFolder]);
        }
    };

    const toggleFolderVisibility = (folderIndex) => {
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].isFolderVisible = !updatedFolders[folderIndex].isFolderVisible;
        setFolders(updatedFolders);
    };

    return (
        <div className="bg-gray-900 text-gray-400 min-h-screen p-4">
            <div className="mb-4 flex items-center justify-between">         
                <Navbar onSearch={(tag) => setSearchTag(tag)} />
                <img src="images\logo.png" className="rounded-full h-12 w-12 object-cover mr-20"/>
                <button
                className="bg-blue-500 text-white p-2 rounded mr-10"
                onClick={() => {
                    const folderName = prompt("Nume Folder:");
                    if (folderName) {
                        addNewProfile(folderName);
                    }
                }}
            >
                Document Nou +
            </button>
            </div>
            <hr className="line-with-shadow" />
            <div className="mt-4">
                {folders.map((folder, folderIndex) => (
                    <div key={folderIndex} className="mb-4">
                        <div className="flex justify-between items-center">
                            <button
                                className="bg-green-500 text-white p-2 rounded mb-2"
                                onClick={() => toggleFolderVisibility(folderIndex)}
                                >
                                 <FolderIcon/>{folder.name}
                                {folder.isFolderVisible ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </button>
                                <br/>
                        </div>
                        {folder.isFolderVisible && (
                            <div className="grid grid-cols-3 gap-4">
                                {folder.profiles.map((profile) => (
                                    <div key={profile.key} className="flex justify-center">
                                        <Profile
                                            title = {profile.title}
                                            tags = {profile.tags}
                                            avatarUrl = {profile.avatarUrl}
                                            searchTags={searchTag !== "" ? [searchTag] : []}
                                            onProfileUpdate={(updatedProfile) =>
                                                updateFolder(folder.name, updatedProfile, profile.key)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {folderIndex < folders.length - 1 && (
                            <hr className="border-t border-gray-600 mt-4" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
import React, { useRef, useState } from "react";
import Profile from "./components/Profile";
import HideButton from "./components/HideButton";
import NavBar from "./components/NavBar";
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
            hasPicture: updatedProfile.hasPicture,
            modalOpen: updatedProfile.modalOpen,
        };

        const updatedProfiles = [...beforeProfile, newProfile, ...afterProfile]
        updatedFolder.profiles = updatedProfiles;
        const updatedFolders = [...beforeFolder, updatedFolder, ...afterFolder];
        console.log(updatedFolders)
        setFolders(updatedFolders);
    };

    const addNewProfile = (folderName) => {
        const folderIndex = folders.findIndex((folder) => folder.name === folderName);

        if (folderIndex !== -1) {
            const updatedFolders = [...folders];
            const newProfiles = Array.from({ length: 1 }, (_, index) => ({
                key: updatedFolders[folderIndex].profiles.length + index,
                title: "",
                tags: "",
                hasPicture: false,
                avatarUrl: imageURL,
            }));
            updatedFolders[folderIndex].profiles.push(...newProfiles);
            setFolders(updatedFolders);
        } else {
            const newFolder = {
                name: folderName,
                isFolderVisible: true,
                profiles: Array.from({ length: 1 }, (_, index) => ({
                    key: index,
                    title: "",
                    tags: "",
                    hasPicture: false,
                    avatarUrl: imageURL,
                })),
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
            <div className="max-w-6xl mx-auto">
                <NavBar onSearch={(tag) => setSearchTag(tag)} onAddNewProfile={addNewProfile} />
            </div>

            <hr className="line-with-shadow" />
            <div className="mt-4">
                <HideButton/>
                {folders.map((folder, folderIndex) => (
                    <div key={folderIndex} className="mb-4">
                        <div className="flex justify-between items-center">
                            <button
                                className="bg-green-500 text-white p-2 rounded mb-2"
                                onClick={() => toggleFolderVisibility(folderIndex)}
                            >
                                <FolderIcon />{folder.name}
                                {folder.isFolderVisible ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </button>
                            <br />
                        </div>
                        {folder.isFolderVisible && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {folder.profiles.map((profile) => (
                                    <div key={profile.key} className="flex justify-center mb-4 sm:mb-0">
                                        <Profile
                                            title={profile.title}
                                            tags={profile.tags}
                                            avatarUrl={profile.avatarUrl}
                                            hasPicture={profile.hasPicture}
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
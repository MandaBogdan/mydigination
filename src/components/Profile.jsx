// Profile.js
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import Modal from "./Modal";
import Zoom from "./Zoom";
import { ZoomImage } from "react-image-zoom-on-hover";

const Profile = ({hasPicture1, title, tags, avatarUrl, searchTags, onProfileUpdate }) => {
    const [myAvatarUrl, setAvatarUrl] = useState(avatarUrl);
    const [modalOpen, setModalOpen] = useState(false);
    const [myTitle, setMyTitle] = useState(title);
    const [myTags, setMyTags] = useState(tags);
    const [hasPicture, setPicture] = useState(hasPicture1);

    const imageURL = useRef(
        "https://dunlite.com.au/wp-content/uploads/2019/04/placeholder.jpg"
    );

    const updateAvatar = ({imgSrc, title, tags }) => {
        imageURL.current = imgSrc;
        setAvatarUrl(imageURL);
        setMyTitle(title);
        setMyTags(tags);
        setPicture(true);
        onProfileUpdate({hasPicture, title, tags, imageURL});
    };

    const shouldDisplayProfile =
        searchTags.length === 0 ||
        (tags && tags.split(",").some((tag) => searchTags.includes(tag.trim())));

    return shouldDisplayProfile ? (
        <div className="flex flex-col items-center mb-4">
            <div className="relative ">
                <ZoomImage imageUrl={myAvatarUrl.current} />
                <button
                    className=" flex items-center absolute mt-4 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                    title="Change photo"
                    onClick={() => setModalOpen(true)}
                >   
                    {!hasPicture && (<div>Adauga</div>)}
                    {!hasPicture && (<AddIcon />)}
                    {hasPicture && (<div>Modifica </div>)}
                    {hasPicture && (<EditIcon />)}
                </button>
            

            <div className="mt-14 text-center flex flex-col items-center">
            <div className="flex items-center mb-2">
            {hasPicture && (<p className="text-lg text-opacity-50 mr-2">titlu:</p>)}
                <p className="text-lg font-semibold text-white">{myTitle}</p>
            </div>
            <div className="flex items-center">
            {hasPicture && (<p className="text-sm text-opacity-50 mr-2">tag:</p>)}
                <p className="text-sm text-white">{myTags}</p>
            </div>
            </div>
            </div>

            {modalOpen && (
                <Modal updateAvatar={updateAvatar} closeModal={() => setModalOpen(false)} />
            )}
        </div>
    ) : null;
};

export default Profile;

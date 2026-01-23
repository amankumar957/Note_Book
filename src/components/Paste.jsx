import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../reduxx/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pas = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSeacrhTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = pas.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Delete function

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // Share Button function

  function handleShare(paste) {
    const link = `${window.location.origin}/paste/${paste._id}`;

    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: link,
        })
        .then(() => toast.success("Ready to share"))
        .catch(() => toast.error("Share canceled"));
    } else {
      navigator.clipboard.writeText(link);
      toast.success("Link copied (Share not supported)");
    }
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 bg-white text-black border border-gray-500"
        type="search"
        placeholder="Search here.."
        value={searchTerm}
        onChange={(e) => setSeacrhTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>

                  <button>
                    <a href={`/paste/${paste?._id}/`}>View</a>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copy completed");
                    }}
                  >
                    Copy
                  </button>

                  <button onClick={() => handleShare(paste)}>Share</button>
                </div>
                <div>
                  {new Date(paste.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;

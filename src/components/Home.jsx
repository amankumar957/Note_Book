import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes } from "../reduxx/pasteSlice";
import { updateToPastes } from "../reduxx/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");

  // For button
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  //For Create Notes Function
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //Update

      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    // After creation or Updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 bg-white text-black border border-gray-500 w-[62%] pl-4"
          type="text"
          placeholder="Enter title here.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste} className="p-2 rounded-2xl mt-2">
          {pasteId ? "Update My Notes" : "Create My Notes"}
        </button>
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl  min-w-[500px] p-4"
          value={value}
          placeholder="Enter Content here.."
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
};

export default Home;

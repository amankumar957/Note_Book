import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);
  if (!paste) return <h1>Note Not Found</h1>;

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-1 rounded-2xl mt-2 bg-white text-black border border-gray-500 w-[62%] pl-4"
          type="text"
          placeholder="Enter title here.."
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl  min-w-[500px] p-4"
          value={paste.content}
          placeholder="Enter Content here.."
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>
    </div>
  );
};

export default ViewPaste;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_PATHS } from "../../routes/paths";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`search/${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="man watches"
        className="w-full py-2 px-4 border-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        style={{ borderColor: "#e6931d" }}
        autoComplete="off"
        maxLength="50"
        id="search-words"
        name="searchWords"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div
        className="absolute right-0 top-0 bottom-0 px-5 py-2 flex items-center justify-center rounded-r border cursor-pointer"
        style={{ background: "#e6931d", borderColor: "#e6931d" }}
        onClick={handleSearch}
      >
        <img
          alt="Search.."
          width="20"
          height="20"
          src="https://ae01.alicdn.com/kf/Sf683a50b80cc4690a747a857f150abc8p/48x48.png"
          className="opacity-70 hover:opacity-100"
        />
      </div>
    </div>
  );
}

import logo from "../assets/images/logo.png";
import { Download } from "lucide-react";
import { MyInfo } from "./@types";

export default function Header({ info }: { info: MyInfo | null }) {
  return (
    <header className="header">
      <div className="header-content flex justify-between items-center absolute z-10 top-0 left-0 w-full p-2  bg-smoky-black">
        <img
          src={logo}
          alt="logo"
          className="flex border border-[#ffdb70] justify-center items-center w-10 h-10 rounded-full"
        />
        <button
          onClick={() => {
            if (info) {
              window.open(info.resume, "_blank");
            }
          }}
          type="button"
          className="flex justify-between text-black bg-[#ffdb70] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2 mb-2"
        >
          <span className="me-2">Resume</span>
          <Download size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}

type NavbarProps = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

const tabs = ["About", "Projects"];

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <nav className="navbar bg-transparent">
      <ul className="navbar-list">
        {tabs.map((tab) => (
          <li key={tab} className="navbar-item">
            <button
              className={`navbar-link${activeTab === tab ? " active" : ""}`}
              data-nav-link
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

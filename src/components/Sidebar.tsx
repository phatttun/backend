import {
  Home,
  Server,
  FileText,
  Database,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  User,
  Search,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const MENU = [
  {
    label: "Main",
    items: [
      { id: "home", label: "Home", icon: <Home size={20} />, shortcut: "⌘H" },
    ],
  },
  {
    label: "CMDB",
    items: [
      { id: "Master", label: "Master", icon: <Server size={20} />, shortcut: "⌘M" },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "forms", label: "Forms", icon: <FileText size={20} />, shortcut: "⌘F" },
    ],
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [active, setActive] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* Close on outside click (mobile) */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        isMobile &&
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sidebarOpen, isMobile]);

  // Handle click on nav item
  const handleNavClick = (id: string) => {
    setActive(id);

    // Navigate based on id
    const routes: Record<string, string> = {
      home: "/",
      Master: "/master",
      forms: "/request-form",
    };

    if (routes[id]) {
      navigate(routes[id]);
    }

    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Filter menu items based on search
  const filteredMenu = MENU.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <>
      <aside
        ref={sidebarRef}
        className="sidebar"
        data-open={sidebarOpen}
      >
        {/* Header */}
        <header className="sidebar-header">
          <div className="sidebar-logo">
            <Database size={28} />
            <span>CMDB System</span>
          </div>

          {sidebarOpen && !isMobile && (
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </header>

        {/* Search Bar */}
        {sidebarOpen && (
          <div className="sidebar-search">
            <div className="search-input-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        )}

        {/* Menu */}
        <nav className="sidebar-nav">
          {filteredMenu.map(section => (
            <div key={section.label} className="nav-section">
              {sidebarOpen && (
                <div className="nav-label">{section.label}</div>
              )}

              {section.items.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${active === item.id ? "active" : ""}`}
                  onClick={() => handleNavClick(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                  aria-label={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {sidebarOpen && item.shortcut && (
                    <span className="nav-shortcut">{item.shortcut}</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <footer className="sidebar-footer">
          <div className="user">
            <User size={20} />
            <div>
              <strong>John Doe</strong>
              <small>Administrator</small>
            </div>
          </div>

          <div className="footer-actions">
            <button
              className="footer-action-btn"
              title={!sidebarOpen ? "Settings" : undefined}
              aria-label="Settings"
            >
              <Settings size={16} />
              {sidebarOpen && <span>Settings</span>}
            </button>

            <button
              className="footer-action-btn"
              title={!sidebarOpen ? "Help" : undefined}
              aria-label="Help"
            >
              <HelpCircle size={16} />
              {sidebarOpen && <span>Help</span>}
            </button>
          </div>

          <button
            className="logout-btn"
            title={!sidebarOpen ? "Logout" : undefined}
            aria-label="Logout"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </footer>
      </aside>

      {/* Toggle button container - always available */}
      {!sidebarOpen && (
        isMobile ? (
          /* Floating menu button for mobile */
          <button
            className="sidebar-floating-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        ) : (
          /* External toggle button for desktop */
          <button
            className="sidebar-external-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Expand sidebar"
          >
            <ChevronRight size={20} />
          </button>
        )
      )}

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
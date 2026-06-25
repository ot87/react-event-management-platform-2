import { NavLink, Outlet, useNavigation } from "react-router";
import { useTheme } from "../hooks";
import { Loader } from "./Loader";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "font-semibold text-blue-600 dark:text-blue-400"
    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white";

function Layout() {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <nav className="flex gap-4">
            <NavLink to="/" className={navLinkClass}>
              Events
            </NavLink>
            <NavLink to="/create-event" className={navLinkClass}>
              Create Event
            </NavLink>
            <NavLink to="/my-bookings" className={navLinkClass}>
              My Bookings
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4">
        {navigation.state === "loading" && <Loader />}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

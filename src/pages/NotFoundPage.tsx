import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="text-3xl font-bold">404 — Page Not Found</h1>

      <p className="text-gray-600 dark:text-gray-300">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;

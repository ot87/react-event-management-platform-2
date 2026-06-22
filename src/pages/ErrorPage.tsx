import { isRouteErrorResponse, Link, useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  let content = "An unexpected error happened...";

  if (isRouteErrorResponse(error)) {
    content = error.statusText;
  } else if (error instanceof Error) {
    content = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold">Something went wrong</h1>

      <p className="text-gray-600 dark:text-gray-300">{content}</p>

      <Link
        to="/"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;

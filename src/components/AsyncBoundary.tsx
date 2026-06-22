import { Loader } from "./Loader";

interface AsyncBoundaryProps {
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export function AsyncBoundary({
  loading,
  error,
  isEmpty,
  emptyMessage,
  children,
}: AsyncBoundaryProps) {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="py-8 text-center text-red-600 dark:text-red-400">{error}</p>
    );
  }

  if (isEmpty) {
    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
        {emptyMessage}
      </p>
    );
  }

  return <>{children}</>;
}

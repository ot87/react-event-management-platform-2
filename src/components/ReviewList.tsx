import type { Review } from "../types";

type ReviewListProps = {
  reviews: Review[];
};

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No reviews yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded border border-gray-200 p-3 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{review.author}</span>
            <span className="text-sm text-yellow-500">
              {"★".repeat(review.rating)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {review.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}

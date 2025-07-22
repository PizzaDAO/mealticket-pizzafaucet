import { useReimbursement } from "../providers/ReimbursementProvider";

export const TransactionStatus = () => {
  const { isConfirmed, isPending, isConfirming, hash, error } = useReimbursement();

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isPending) {
    return <div className="animate-pulse text-yellow-800">Approve transaction in wallet</div>;
  }

  if (isConfirming) {
    return (
      <a
        href={`https://basescan.org/tx/${hash}`}
        target="_blank"
        className="animate-pulse text-yellow-800"
      >
        Awaiting confirmation
      </a>
    );
  }

  if (isConfirmed) {
    return (
      <a href={`https://basescan.org/tx/${hash}`} target="_blank" className="text-green-600">
        Transaction confirmed 🚀
      </a>
    );
  }

  return null;
};

'use client';

import { useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

const s: Record<string, CSSProperties> = {
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.7rem 1.5rem',
    background: '#17F2A6',
    color: '#121717',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  reviewed: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.7rem 1.5rem',
    background: 'rgba(23,242,166,0.1)',
    color: '#17F2A6',
    border: '1.5px solid rgba(23,242,166,0.3)',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'default',
  },
  error: {
    marginTop: '0.75rem',
    fontSize: '0.82rem',
    color: '#fca5a5',
  },
};

interface ReviewButtonProps {
  submissionId: string;
  isReviewed: boolean;
}

export default function ReviewButton({ submissionId, isReviewed }: ReviewButtonProps) {
  const [reviewed, setReviewed] = useState(isReviewed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (reviewed) {
    return <span style={s.reviewed}>✓ Marked as reviewed</span>;
  }

  const handleReview = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/onboarding/${submissionId}/review`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      setReviewed(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        style={{ ...s.btn, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        onClick={handleReview}
        disabled={loading}
      >
        {loading ? 'Marking…' : 'Mark as reviewed'}
      </button>
      {error && <p style={s.error}>{error}</p>}
    </div>
  );
}

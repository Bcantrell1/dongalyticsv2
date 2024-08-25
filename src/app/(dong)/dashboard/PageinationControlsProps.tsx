'use client';

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  initialPage: number;
  totalPages: number;
}

export function PaginationControls({ initialPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : initialPage;

  const handlePageChange = (newPage: number) => {
    router.push(`/dashboard?page=${newPage}`);
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <Button 
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button 
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
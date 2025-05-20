import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQuery = (): {
  query: string | null;
  setQuery: (query: string) => void;
} => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = searchParams.get('query') ?? null;

  const setQuery = (query: string): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('query', query);
    const newUrl = `${pathname}?${newSearchParams.toString()}`;

    router.push(newUrl);
  };

  return { query, setQuery };
};

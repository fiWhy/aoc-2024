import { api } from '@/api';
import { useEffect, useState, useTransition } from 'react';

export const usePost = <T extends object, R>(url: string) => {
  const [pending, startTransition] = useTransition();
  const [data, setData] = useState<R>();

  useEffect(() => {
    setData(undefined);
  }, [url]);

  return {
    pending,
    data,
    trigger: (data: T) => {
      startTransition(async () => {
        const response = JSON.parse(
          (
            await api.post(url, JSON.stringify(data), {
              headers: {
                'Content-Type': 'application/json',
              },
            })
          ).data
        );

        setData(response);
      });
    },
  };
};

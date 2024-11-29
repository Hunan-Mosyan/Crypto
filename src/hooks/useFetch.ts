import { useState, useEffect, useCallback } from 'react';
import { FetchConfig } from '../ts/types/FetchConfig';
import { FetchState } from '../ts/types/FetchState';

export function useFetch<T>({ method, url, header, body } : FetchConfig):FetchState<T>  {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...header
                },
                body: method !== 'GET' && body ? JSON.stringify(body) : undefined
            })
            const responseData = await response.json();
            setData(responseData);
        } catch(error) {
            setError('Something want wrong');
        }finally {
            setLoading(false);
        }
    }, [url]);

    useEffect( () => {
        fetchData();
    }, [fetchData])

    return {
        data, loading, error, 
    }
}


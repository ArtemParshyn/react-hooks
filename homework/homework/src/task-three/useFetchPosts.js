import { useState, useEffect, useCallback } from 'react';

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const useFetchPosts = (search) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (searchQuery, signal) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?title_like=${searchQuery}`,
                { signal }
            );
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            if (err.name !== 'AbortError') {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!search) {
            setPosts([]);
            return;
        }

        const controller = new AbortController();
        const debouncedFetch = debounce(() => fetchData(search, controller.signal), 500);

        debouncedFetch();

        return () => controller.abort();
    }, [search, fetchData]);

    return { posts, loading, error };
};

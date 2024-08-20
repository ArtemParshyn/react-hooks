import React, { useState } from 'react';
import { useFetchPosts } from './useFetchPosts';
import './TaskThree.css';

export default function TaskThree() {
    const [search, setSearch] = useState('');
    const { posts, loading, error } = useFetchPosts(search);

    return (
        <div className="TaskThree">
            <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search posts"
            />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1>Posts</h1>
            <ul>
                {posts.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

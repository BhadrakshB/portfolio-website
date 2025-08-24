"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";

// The main component that will be rendered after login
const Dashboard = () => {
    const [content, setContent] = useState<any>(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => setContent(data));
    }, []);

    const handleProjectChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target;
        const updatedProjects = [...content.projects];
        updatedProjects[index] = { ...updatedProjects[index], [name]: value };
        setContent({ ...content, projects: updatedProjects });
    };

    // A simplified change handler for the about section
    const handleAboutChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, index: number) => {
        const { name, value } = e.target;
        const updatedSection = [...content.about[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        setContent({ ...content, about: { ...content.about, [section]: updatedSection } });
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('Saving...');
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content, null, 2),
            });
            if (res.ok) {
                setStatus('Content saved successfully!');
            } else {
                const errorData = await res.json();
                setStatus(`Error: ${errorData.message}`);
            }
        } catch (error) {
            setStatus('A network error occurred.');
        }
        setTimeout(() => setStatus(''), 3000);
    };

    if (!content) {
        return <div className="text-center">Loading content...</div>;
    }

    return (
        <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-cyan-300">Admin Dashboard</h1>

            <h2 className="text-3xl font-bold border-b border-cyan-400/50 pb-2">Edit Projects</h2>
            {content.projects.map((project: any, index: number) => (
                <div key={project.id} className="p-4 border border-gray-700 rounded-lg space-y-2 bg-gray-900/50">
                    <label className="block font-semibold">Title: <input type="text" name="title" value={project.title} onChange={(e) => handleProjectChange(e, index)} className="w-full p-2 bg-gray-800 rounded mt-1" /></label>
                    <label className="block font-semibold">Category: <input type="text" name="category" value={project.category} onChange={(e) => handleProjectChange(e, index)} className="w-full p-2 bg-gray-800 rounded mt-1" /></label>
                    <label className="block font-semibold">Description: <textarea name="description" value={project.description} onChange={(e) => handleProjectChange(e, index)} className="w-full p-2 bg-gray-800 rounded mt-1 h-24" /></label>
                </div>
            ))}

            {/* Further editing UI for the 'About' section can be added here */}

            <div className="pt-4">
              <button type="submit" className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-md transition-colors">Save All Changes</button>
              {status && <p className="mt-4 text-cyan-400">{status}</p>}
            </div>
        </form>
    );
};


// The login form component
const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                onLoginSuccess();
            } else {
                setError('Invalid password.');
            }
        } catch (error) {
            setError('A network error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 mb-4 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button type="submit" className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-md transition-colors">Login</button>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
};


// The main page component that handles auth state
const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // This is a simple client-side flag. For more security, a token-based system would be better.
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="bg-black min-h-screen text-white">
            {isLoggedIn ? <div className="p-10"><Dashboard /></div> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
};

export default AdminPage;

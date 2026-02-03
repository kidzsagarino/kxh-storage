"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [message, setMessage] = React.useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) {
           const j = await res.json().catch(() => ({}));
            setMessage(j.message ?? "Login failed");
            return
        }

        router.push("/admin/orders");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
}
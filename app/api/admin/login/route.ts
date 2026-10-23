import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { username, password } = await request.json();
    if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const response = NextResponse.json({ message: 'Login successful' });
        const token = crypto.randomUUID();
        response.cookies.set('kxh_auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return response;
    }
    return NextResponse.json({ message: 'Login failed' }, { status: 401 });
}
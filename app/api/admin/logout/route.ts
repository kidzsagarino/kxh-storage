import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const response = NextResponse.json({ message: 'Logout successful' });
    response.cookies.delete('kxh_auth_token');
    return response;
}

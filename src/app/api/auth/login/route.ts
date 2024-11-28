import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "M41np5dx7";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('admin-token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
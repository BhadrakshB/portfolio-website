import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }

    const isAdminPasswordCorrect = password === process.env.ADMIN_PASSWORD;

    if (isAdminPasswordCorrect) {
      // In a real app, you'd set a cookie or JWT here.
      // For this simple case, we just return success.
      return NextResponse.json({ message: 'Login successful' });
    } else {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}

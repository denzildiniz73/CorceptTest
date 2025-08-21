import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/server/models/user';
import { dbConnect } from '@/server/config/dbConnect';

export async function POST(request) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated. Please contact support.' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }


    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create response with user data and token
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: user.toJSON(),
        token
      },
      { status: 200 }
    );

    // Set HTTP-only cookie with JWT token
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
} 
// WE ARE NOT USING THIS ROUTE FOR NOW

import { NextResponse } from 'next/server';
import User from '@/server/models/user';
import { dbConnect } from '@/lib/dbConnect';

export async function POST(request) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const { username, email, password, firstName, lastName, role } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      role: role || 'user'
    });

    // Save user (password will be hashed automatically)
    await user.save();

    // Return user data (password will be excluded due to toJSON transform)
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: user.toJSON()
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
} 
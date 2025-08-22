import { NextResponse } from 'next/server';
import Story from '@/server/models/story';
import { dbConnect } from '@/server/config/dbConnect';

export async function POST(request) {
  try {
    // Connect to database
    await dbConnect();

    // Get request body
    const {
      name,
      email,
      flower_tags,
      attribution_preference,
      describe_yourself,
      healthcare_confirmation,
      adult_check,
      interested_check,
      audio_story_url,
      flower_url
    } = await request.json();

    // Validate required fields
    const requiredFields = {
      name,
      email,
      flower_tags,
      attribution_preference,
      describe_yourself,
      healthcare_confirmation,
      adult_check,
      interested_check,
      audio_story_url,
      flower_url
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => value === undefined || value === null || value === '')
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          missingFields,
          message: `The following fields are required: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate healthcare_confirmation is a positive number
    if (typeof healthcare_confirmation !== 'number' || healthcare_confirmation < 0) {
      return NextResponse.json(
        { error: 'Healthcare confirmation must be a positive number' },
        { status: 400 }
      );
    }
 
    // Validate URLs
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(audio_story_url)) {
      return NextResponse.json(
        { error: 'Audio story URL must be a valid URL' },
        { status: 400 }
      );
    }

    if (!urlRegex.test(flower_url)) {
      return NextResponse.json(
        { error: 'Flower URL must be a valid URL' },
        { status: 400 }
      );
    }

    // Validate boolean fields
    if (typeof attribution_preference !== 'boolean') {
      return NextResponse.json(
        { error: 'Attribution preference must be a boolean value' },
        { status: 400 }
      );
    }

    if (typeof describe_yourself !== 'boolean') {
      return NextResponse.json(
        { error: 'Describe yourself must be a boolean value' },
        { status: 400 }
      );
    }

    if (typeof adult_check !== 'boolean') {
      return NextResponse.json(
        { error: 'Adult check must be a boolean value' },
        { status: 400 }
      );
    }

    if (typeof interested_check !== 'boolean') {
      return NextResponse.json(
        { error: 'Interested check must be a boolean value' },
        { status: 400 }
      );
    }

    // Create new story
    const story = new Story({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      flower_tags,
      attribution_preference,
      describe_yourself,
      healthcare_confirmation,
      adult_check,
      interested_check,
      audio_story_url: audio_story_url.trim(),
      flower_url: flower_url.trim()
    });

    // Save story to database
    const savedStory = await story.save();

    return NextResponse.json(
      {
        message: 'Story created successfully',
        story: savedStory.toJSON()
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Story creation error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: validationErrors 
        },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A story with this information already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

import { connect } from '@/dbConfig/dbConfig';
import { NextResponse, NextRequest } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;

    // Find the user by token
    const user = await User.findOne({
      verifiedToken: token,
      verifiedTokenExpiry: { $gt: Date.now() },
    });

    // If user not found or token expired
    if (!user) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }

    // If user found, log the user for debugging
    console.log(user);

    // Update the user document
    user.isVerified = true;
    user.verifiedToken = undefined;
    user.verifiedTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

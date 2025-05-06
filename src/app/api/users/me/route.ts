import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
  const tokenData = getDataFromToken(request);
  if (!tokenData) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Check if the token is valid and extract user ID
  const userId = typeof tokenData !== 'string' ? tokenData.id : null;
  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch user data from the database
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

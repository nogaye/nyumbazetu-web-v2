/**
 * API Route: POST /api/auth/login
 * 
 * Admin login endpoint
 */

import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminCredentials,
  createSession,
  setSessionCookie,
} from "@/lib/auth/simple-auth";

// Note: Edge runtime doesn't support bcryptjs, so we use Node.js runtime
// export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Verify credentials
    const user = await verifyAdminCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session
    const sessionId = await createSession(user);
    await setSessionCookie(sessionId);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



/**
 * API Route: GET /api/auth/me
 * 
 * Get current admin user session
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/simple-auth";

// Note: Using Node.js runtime for compatibility
// export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: session.userId,
          email: session.email,
          role: session.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



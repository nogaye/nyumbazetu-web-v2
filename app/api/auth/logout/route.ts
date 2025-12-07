/**
 * API Route: POST /api/auth/logout
 * 
 * Admin logout endpoint
 */

import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/simple-auth";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    await destroySession();

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in logout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



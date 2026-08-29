import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Received:", body);

    if (!process.env.GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        {
          success: false,
          message: "GOOGLE_SCRIPT_URL not found",
        },
        { status: 500 },
      );
    }

    const response = await fetch(process.env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.text();

    console.log("Google Script Response:", result);
    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch {
      parsedResult = null;
    }
    if (!response.ok || parsedResult?.success === false) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Script request failed",
          result: parsedResult || result,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      result: parsedResult || result,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

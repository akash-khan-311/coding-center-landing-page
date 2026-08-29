import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Payment Update Request:", body);

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is missing");

      return NextResponse.json(
        {
          success: false,
          message: "GOOGLE_SCRIPT_URL not configured",
        },
        { status: 500 },
      );
    }

    // Required fields validation
    if (!body.admissionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Admission ID is required",
        },
        { status: 400 },
      );
    }

    if (!body.transactionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction ID is required",
        },
        { status: 400 },
      );
    }

    if (!body.paymentMethod) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment method is required",
        },
        { status: 400 },
      );
    }

    const payload = {
      action: "update",
      admissionId: String(body.admissionId).trim(),
      paymentStatus: body.paymentStatus || "PENDING",
      transactionId: String(body.transactionId).trim(),
      paymentMethod: String(body.paymentMethod).trim(),
    };

    console.log("Sending to Google Script:", payload);

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),

      // Important for server-side fetch
      cache: "no-store",
    });

    const text = await response.text();

    console.log("Google Script HTTP Status:", response.status);
    console.log("Google Script Response:", text);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Script request failed",
          result: text,
        },
        { status: 500 },
      );
    }

    // Google Script response JSON parse
    let result;

    try {
      result = JSON.parse(text);
    } catch (parseError) {
      console.error("Google Script JSON Parse Error:", parseError);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid response from Google Script",
          result: text,
        },
        { status: 500 },
      );
    }

    // Google Script returned success:false
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Payment update failed",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message || "Payment information updated",
      result,
    });
  } catch (error) {
    console.error("Payment Update Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Payment update failed",
      },
      { status: 500 },
    );
  }
}
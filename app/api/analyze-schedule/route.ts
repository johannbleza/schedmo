import { fixedPrompt } from "@/lib/constants";
import { GeminiApiResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { imageData, mimeType } = await request.json();

    if (!imageData || !mimeType) {
      return NextResponse.json(
        { error: "Missing image data or mime type" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const chatHistory = [
      {
        role: "user",
        parts: [
          { text: fixedPrompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: imageData,
            },
          },
        ],
      },
    ];

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "STRING" },
              name: { type: "STRING" },
              course_code: { type: "STRING" },
              instructor: { type: "STRING" },
              location: { type: "STRING" },
              days: { type: "ARRAY", items: { type: "STRING" } },
              start_time: { type: "STRING" },
              end_time: { type: "STRING" },
              schedule_id: { type: "STRING" },
              color: { type: "STRING" },
            },
            propertyOrdering: [
              "id",
              "name",
              "course_code",
              "instructor",
              "location",
              "days",
              "start_time",
              "end_time",
              "schedule_id",
              "color",
            ],
          },
        },
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          error: `API error: ${response.status} - ${errorData.error?.message || "Unknown API error"}`,
        },
        { status: response.status }
      );
    }

    const result: GeminiApiResponse = await response.json();

    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0 &&
      result.candidates[0].content.parts[0].text
    ) {
      const jsonText = result.candidates[0].content.parts[0].text;
      const parsedCourses = JSON.parse(jsonText);
      return NextResponse.json({ courses: parsedCourses });
    }

    return NextResponse.json({ courses: [] });
  } catch (error) {
    console.error("Error in analyze-schedule API:", error);
    return NextResponse.json(
      { error: "Failed to analyze schedule" },
      { status: 500 }
    );
  }
}

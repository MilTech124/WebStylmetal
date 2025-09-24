import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const withCors = (response) => {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};

const resolveTargetEndpoint = () => {
  if (process.env.WORDPRESS_SEND_QUESTION_URL) {
    return process.env.WORDPRESS_SEND_QUESTION_URL;
  }

  const baseUrl = process.env.WORDPRESS_BASE_URL;
  if (!baseUrl) {
    return null;
  }

  try {
    return new URL("/wp-json/stylmetal/v1/send-question", baseUrl).toString();
  } catch (error) {
    console.error("Nie udalo sie zbudowac adresu zapytania do WordPressa:", error);
    return null;
  }
};

const targetEndpoint = resolveTargetEndpoint();

export function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

export async function POST(request) {
  if (!targetEndpoint) {
    return withCors(
      NextResponse.json(
        { success: false, message: "Endpoint WordPress nie jest skonfigurowany." },
        { status: 500 }
      )
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    console.error("Nieudana deserializacja danych formularza:", error);
    return withCors(
      NextResponse.json({ success: false, message: "Nieprawidlowy format danych." }, { status: 400 })
    );
  }

  try {
    const wpResponse = await fetch(targetEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = wpResponse.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await wpResponse.json();
      return withCors(NextResponse.json(data, { status: wpResponse.status }));
    }

    const textBody = await wpResponse.text();
    const response = new NextResponse(textBody, {
      status: wpResponse.status,
      headers: contentType ? { "Content-Type": contentType } : undefined,
    });
    return withCors(response);
  } catch (error) {
    console.error("Nie udalo sie przekazac zapytania do WordPressa:", error);
    return withCors(
      NextResponse.json(
        { success: false, message: "Wyslanie zapytania nie powiodlo sie. Sprobuj ponownie." },
        { status: 502 }
      )
    );
  }
}

import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const response = JSON.parse(payload);
  const sig = req.headers.get("Stripe-Signature");

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.WEBHOOK_SECRET_KEY!
    );

    console.log("STRIPE EVENT: ", event.type);
    return NextResponse.json({
      status: "success",
      event: event.type,
      data: JSON.stringify(response),
    });
  } catch (error) {
    return NextResponse.json({ status: "failed", error });
  }
}

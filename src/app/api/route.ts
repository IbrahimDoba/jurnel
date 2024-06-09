import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { addDoc } from "firebase/firestore";
import { subscriptionCollectionRef } from "@/firebase";
import moment from "moment";

const handleAddSubscription = async (
  type: "pro" | "unlimited",
  email: string,
  paymentStatus: string,
  paymentId: string
) => {
  await addDoc(subscriptionCollectionRef, {
    userEmail: email,
    subscription: type,
    paymentStatus,
    expirationDate:
      type === "pro" ? moment().add(1, "months").format("YYYY-MM-DD") : null,
    dateCreated: moment().format("YYYY-MM-DD"),
    paymentId,
  });
};
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
    await handleAddSubscription(
      response.data.object.amount === 499 ? "pro" : "unlimited",
      response.data.object.billing_details.email,
      response.data.object.paid,
      response.id
    );
    return NextResponse.json({
      status: "success",
      event: event.type,
      data: JSON.stringify(response),
    });
  } catch (error) {
    return NextResponse.json({ status: "failed", error });
  }
}

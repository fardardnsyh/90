import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe-client";
import { useRouter } from "next/navigation";

type Props = {
  userId?: string | null;
  price: string;
};

const SubscribeBtn = ({ userId, price }: Props) => {
  const router = useRouter();
  const handleCheckout = async (price: string) => {
    if (!userId) router.push("/login");
    try {
      const { sessionId } = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, userId }),
      }).then((res) => res.json());
      console.log("sessionId:", sessionId);
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Button onClick={() => handleCheckout(price)}>Upgrade your plan</Button>
  );
};

export default SubscribeBtn;

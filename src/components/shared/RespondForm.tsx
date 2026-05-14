"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RespondForm({ orderId }: { orderId: string }) {
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`/api/orders/${orderId}/respond`, {
        method: "POST",
        body: JSON.stringify({ text, price }),
        headers: { "Content-Type": "application/json" }
      });
      
      const data = await res.json();

      if (res.ok) {
          alert("Отклик отправлен!");
          setText("");
          setPrice("");
          router.refresh(); 
      } else {
          // Если сервер вернул 401, значит ты не залогинен
          alert(data.error || "Ошибка при отправке");
      }
    } catch (err) {
      alert("Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-gray-50 p-6 rounded-2xl">
      <h3 className="font-bold">Предложить свои услуги</h3>
      <input type="number" placeholder="Ваша цена (сум)" value={price} className="w-full p-3 border rounded-xl" onChange={(e) => setPrice(e.target.value)} required />
      <textarea placeholder="Ваше сообщение заказчику" value={text} className="w-full p-3 border rounded-xl" onChange={(e) => setText(e.target.value)} required />
      <button disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full font-bold">
        {loading ? "Отправка..." : "Отправить отклик"}
      </button>
    </form>
  );
}
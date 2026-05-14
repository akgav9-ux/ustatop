"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";

export default function CreateOrderPage() {
  const router = useRouter();
  const locale = useLocale();

  const [categories, setCategories] = useState<any[]>([]); // Инициализируем пустым массивом
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    district: "",
    budget: "",
    categoryId: "",
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        // ✅ Добавили проверку: если пришел массив, сохраняем, если нет — оставляем пустым
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("API вернуло не массив:", data);
          setCategories([]);
        }
      })
      .catch((err) => console.error("Ошибка сети:", err));
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.categoryId) {
      alert("Выберите категорию!");
      return;
    }
    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        budget: Number(form.budget),
      }),
    });

    if (!res.ok) {
      alert("Ошибка при создании");
      setLoading(false);
      return;
    }

    router.replace(`/${locale}/orders`);
    router.refresh();
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Создать заявку</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="title" placeholder="Название" value={form.title} onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" required />
        <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" rows={4} required />
        <input name="district" placeholder="Район" value={form.district} onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" required />
        <input name="budget" type="number" placeholder="Бюджет" value={form.budget} onChange={handleChange} className="w-full border rounded-2xl px-4 py-3" required />
        
        <select 
            name="categoryId" 
            value={form.categoryId} 
            onChange={handleChange}
            className="w-full border rounded-2xl px-4 py-3"
            required
        >
            <option value="">Выберите категорию</option>
            {/* ✅ Добавили безопасную проверку через Array.isArray */}
            {Array.isArray(categories) && categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {locale === "uz" ? cat.nameUz : cat.nameRu}
                </option>
            ))}
        </select>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-2xl font-medium">
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>
    </div>
  );
}
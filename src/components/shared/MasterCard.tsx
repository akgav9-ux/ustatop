interface MasterCardProps {
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  status: string;
  image: string;
}

export default function MasterCard({
  name,
  profession,
  rating,
  reviews,
  status,
  image,
}: MasterCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
      
      <div className="flex gap-4">

        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-2xl object-cover"
        />

        <div className="flex-1">

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">
              {name}
            </h3>

            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
              {status}
            </span>
          </div>

          <p className="text-gray-500 mt-1">
            {profession}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            ⭐ {rating} ({reviews} отзывов)
          </p>

        </div>

      </div>

    </div>
  );
}
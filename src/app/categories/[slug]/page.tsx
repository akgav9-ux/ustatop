interface Props {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { slug } = params;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Kategoriya: {slug}</h1>
      <p>Bu yerda ustalar yoki buyurtmalar chiqadi.</p>
    </div>
  );
}
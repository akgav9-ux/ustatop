type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Kategoriya: {slug}</h1>
      <p>Bu yerda ustalar yoki buyurtmalar chiqadi.</p>
    </div>
  );
}
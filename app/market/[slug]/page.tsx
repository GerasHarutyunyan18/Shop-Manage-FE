import MarketView from "@/components/featured/marketView";

export default function MarketViewPage({
  params,
}: {
  params: { slug: string };
}) {
  return <MarketView id={params.slug} />;
}

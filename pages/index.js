import Layout from "components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div>Welcome Djinni image </div>
      <Link href="/play">
        <a>Play</a>
      </Link>
    </Layout>
  );
}

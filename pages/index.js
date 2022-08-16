import Layout from "components/Layout";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <Box>
        <div>Welcome Djinni image </div>
        <Link href="/play">
          <a>Play</a>
        </Link>
        <br />
        <Link href="/book">
          <a>See all Books</a>
        </Link>
      </Box>
    </Layout>
  );
}

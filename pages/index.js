import Layout from "components/Layout";
import Link from "next/link";
import { Flex, HStack, Box, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Layout>
      <Flex flexWrap="wrap" alignItems="center" justifyContent="center">
        <Link href="/play">
          <Box p={16} m={4} borderWidth={3} rounded="lg">
            PLAY
          </Box>
        </Link>
        {/* <Link href="/book">
          <Box p={16} m={4} borderWidth={3} rounded="lg">
            BROWSE (boring!)
          </Box>
        </Link>
 */}
        {/* <Text fontSize="xl">Play</Text> */}
        {/* <Link as="em" href="/book">
          <Text fontSize="xl">Browse Books</Text>
        </Link> */}
      </Flex>
    </Layout>
  );
}

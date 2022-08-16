import Layout from "components/Layout";
import { Box, Center, Heading, Text } from "@chakra-ui/react";

// component that renders a simple div
const About = () => (
  <Layout>
    <Center>
      <Box textAlign="center">
        <Heading>About</Heading>
        <Text>
          You would like to read something cool, but don't know which book to
          pick? You feel like amazon's recommendations are totally useless? Do
          not despair! You've come to the right place. Just rub the lamp and let
          the djinni help you out....
        </Text>
      </Box>
    </Center>
  </Layout>
);

export default About;

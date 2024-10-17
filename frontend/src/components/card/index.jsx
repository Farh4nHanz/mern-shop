import PropTypes from "prop-types";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

function CardWrapper({ children }) {
  return (
    <Card maxW="md" shadow={"2xl"}>
      {children}
    </Card>
  );
}

function Body({ imageSrc, title, subtitle, text }) {
  return (
    <>
      <CardBody>
        <Image
          src={imageSrc}
          alt="Card Image"
          borderRadius={"lg"}
          w={"full"}
          h={{
            md: "40",
            sm: "48",
          }}
          objectFit={"cover"}
          loading="lazy"
        ></Image>
        <Stack mt={6} spacing={3}>
          <Heading size={"xl"}>{title}</Heading>
          <Text fontSize={"2xl"} color={useColorModeValue("black", "blue.300")}>
            {subtitle}
          </Text>
          <Text>{text}</Text>
        </Stack>
      </CardBody>
      <Divider w={"90%"} m={"auto"} />
    </>
  );
}

function Footer({ children }) {
  return <CardFooter>{children}</CardFooter>;
}

CardWrapper.propTypes = {
  children: PropTypes.node,
};

Body.propTypes = {
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
};

Footer.propTypes = {
  children: PropTypes.node,
};

Card.Body = Body;
Card.Footer = Footer;

export default Card;

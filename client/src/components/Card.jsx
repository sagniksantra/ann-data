import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";

const CardComponent = ({
  name,
  price,
  img,
  category,
  quantity,
  checkoutHandler,
}) => {
  const handleDelete = async (id) => {
    axios
      .delete(`http://localhost:3500/admin/${id}/delete`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <Card maxW="sm" className="shadow-md">
      <CardBody>
        <Image src={img} alt={name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>

          <Text color="blue.600" fontSize="2xl">
            ₹{price} /kg
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={() => {
              checkoutHandler(price);
            }}
            variant="solid"
            colorScheme="blue"
          >
            Buy now
          </Button>
          {/* <Button
            variant="solid"
            colorScheme="red"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
    </>
  );
};

export default CardComponent;

import {
    Box,
    SimpleGrid,
    Button,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
  import Card from "./Card";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
  
  const AddProductModal = ({ isOpen, onClose }) => {
    // State for form inputs
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState("");
  
    const navigate = useNavigate();
  
    // Function to handle form submission
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      axios
        .post("http://localhost:3500/admin/111/products", {
          name: productName,
          price: productPrice,
          image: productImage,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  
      onClose();
    };
  
    return (
        <>
        <Navbar />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleFormSubmit}>
              <FormControl mb={4}>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Product Price</FormLabel>
                <Input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </FormControl>
  
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </form>
          </ModalBody>
  
          {/* Modal Footer - Add any additional controls here if needed */}
          <ModalFooter>{/* Add any controls here if needed */}</ModalFooter>
        </ModalContent>
      </Modal>
      </>
    );
  };
  
  const Buy = () => {
    const [products, setProducts] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const checkoutHandler = async (amount) => {
      const {
        data: { key },
      } = await axios.get("http://www.localhost:4000/api/getkey");
  
      const {
        data: { order },
      } = await axios.post("http://localhost:4000/api/checkout", {
        amount,
      });
  
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Sujal Ranjan",
        description: "RazorPay",
        image: "https://avatars.githubusercontent.com/u/90925047?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: "Sumit Ranjan",
          email: "sumit.ranjan@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    };
  
    useEffect(() => {
      axios
        .get("http://localhost:3500/products")
        .then((res) => {
          setProducts(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    return (
        <section className="bg-[#F5EEC8] text-gray-600 body-font min-h-screen">
      <Box>
        
        {/* <Button
          colorScheme="blue"
          variant="solid"
          size="lg"
          m={4}
          justifyContent="end"
          onClick={onOpen}
        >
          + Add Product
        </Button> */}
        <AddProductModal isOpen={isOpen} onClose={onClose} />
        <SimpleGrid columns={[1, 2, 4]} spacing={4} p={4}>
          {products.map((product) => (
            <Card
              key={product._id}
              name={product.name}
              price={product.price}
              img={product.image}
              checkoutHandler={checkoutHandler}
            />
          ))}
        </SimpleGrid>
      </Box>
      </section>
    );
  };
  
  export default Buy;
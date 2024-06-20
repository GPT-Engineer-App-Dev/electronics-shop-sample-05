import { Box, Container, VStack, Heading, Text, SimpleGrid, Image, Button, Input, InputGroup, InputLeftElement, Select, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with all the newest features.",
    price: 699,
    category: "Electronics",
    rating: 4.5,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Laptop",
    description: "High performance laptop for all your needs.",
    price: 999,
    category: "Electronics",
    rating: 4.7,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Headphones",
    description: "Noise-cancelling over-ear headphones.",
    price: 199,
    category: "Accessories",
    rating: 4.2,
    image: "https://via.placeholder.com/150"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleRatingChange = (value) => {
    setSelectedRatings(value);
  };

  const filterProducts = (product) => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPriceRange = selectedPriceRange ? (
      selectedPriceRange === "under-500" ? product.price < 500 :
      selectedPriceRange === "500-1000" ? product.price >= 500 && product.price <= 1000 :
      selectedPriceRange === "above-1000" ? product.price > 1000 : true
    ) : true;
    const matchesRatings = selectedRatings.length ? selectedRatings.includes(Math.floor(product.rating).toString()) : true;

    return matchesSearchQuery && matchesCategory && matchesPriceRange && matchesRatings;
  };

  const filteredProducts = products.filter(filterProducts);
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Electronics Store</Heading>
        <Text fontSize="lg">Find the best electronics at unbeatable prices.</Text>
        <InputGroup mb={8}>
          <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
          <Input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <Box w="100%" mb={8}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            <Select placeholder="Select category" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
            </Select>
            <Select placeholder="Select price range" value={selectedPriceRange} onChange={handlePriceRangeChange}>
              <option value="under-500">Under $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="above-1000">Above $1000</option>
            </Select>
            <CheckboxGroup value={selectedRatings} onChange={handleRatingChange}>
              <Stack direction="row">
                <Checkbox value="1">1 Star</Checkbox>
                <Checkbox value="2">2 Stars</Checkbox>
                <Checkbox value="3">3 Stars</Checkbox>
                <Checkbox value="4">4 Stars</Checkbox>
                <Checkbox value="5">5 Stars</Checkbox>
              </Stack>
            </CheckboxGroup>
          </SimpleGrid>
        </Box>
          {filteredProducts.map(product => (
            <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <Image src={product.image} alt={product.name} mb={4} />
              <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
              <Text mb={2}>{product.description}</Text>
              <Text fontWeight="bold" mb={4}>${product.price}</Text>
              <Text mb={4}>Rating: {product.rating} Stars</Text>
              <Button colorScheme="teal">Add to Cart</Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;
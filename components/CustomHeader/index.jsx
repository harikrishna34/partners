import { Header, Text, Image, Flex } from '@mantine/core';

import bannerImage from '@/assets/images/Anvayaa.svg';
const CustomHeader = () => {
  return (
    <Header height={{ base: 70 }} p="md">
      <Flex
        mih={50}
        gap="md"
        justify="flex-left"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Image
          src={bannerImage.src}
          alt=""
          width={35}
          height={35}
          fit="contain"
        />

        <Text ta="center" fz="xl" fw={500}>
          Partner Management
        </Text>
      </Flex>
    </Header>
  );
};

export default CustomHeader;

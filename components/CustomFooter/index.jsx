import { Footer, Text } from '@mantine/core';

const CustomFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer height={30}>
      <Text fz="sm" c="dimmed" ta="center">
        ©{year} Anvayaa Kincare Pvt. Ltd. All Rights Reserved
      </Text>
    </Footer>
  );
};

export default CustomFooter;

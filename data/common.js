import { Text } from '@mantine/core';
export const renderDate = (seconds) => {
  if (seconds != null) {
    const date = new Date(seconds * 1000);
    const month = date.getMonth() + 1;
    const businessStartDate =
      date.getDate() + '-' + month + '-' + date.getFullYear();
    if (
      businessStartDate &&
      businessStartDate != null &&
      businessStartDate != undefined
    ) {
      return <Text>{businessStartDate}</Text>;
    } else {
      return <Text>NA</Text>;
    }
  } else {
    return <Text>NA</Text>;
  }
};

export const getMaskedAadhaar = (text, len) => {
  const visibleDigits = len; // Number of visible digits at the beginning and end
  const maskedDigits = text.length - visibleDigits * 2;
  const maskedText =
    text.substring(0, visibleDigits) +
    '*'.repeat(maskedDigits) +
    text.substring(text.length - visibleDigits);
  return maskedText;
};

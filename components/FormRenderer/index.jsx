import {
  Divider,
  Title,
  TextInput,
  Select,
  NumberInput,
  MultiSelect,
  FileInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';

const TitleDivider = ({ label }) => (
  <Divider
    key={label}
    size="md"
    my="xs"
    label={<Title order={5}>{label}</Title>}
    labelPosition="center"
  />
);

const componentMapping = {
  TitleDivider,
  TextInput,
  Select,
  NumberInput,
  MultiSelect,
  DateInput,
  FileInput,
};

export const renderComponent = (
  componentName,
  props,
  form,
  inputData = {},
  isItemViewOnly = false,
) => {
  const Component = componentMapping[componentName];

  if (componentName == 'MultiSelect' || componentName == 'Select') {
    let key = props.name;
    if (Component) {
      const additionalProps =
        componentName != 'TitleDivider' ? form.getInputProps(props.name) : {};
      return (
        <Component
          key={props.label}
          {...props}
          {...additionalProps}
          disabled={isItemViewOnly}
          data={inputData[key]}
        />
      );
    }
  } else {
    if (Component) {
      const additionalProps =
        componentName != 'TitleDivider' ? form.getInputProps(props.name) : {};
      return (
        <Component
          key={props.label}
          {...props}
          {...additionalProps}
          disabled={isItemViewOnly}
        />
      );
    }
  }

  return null;
};

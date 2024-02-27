import { TextInput, ActionIcon, Accordion, Grid, Select } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

const renderServices = (idx, serIdx, form, servicesOffered) => {
  return (
    <Select
      label="Select Service"
      required
      searchable
      nothingFound="No services"
      placeholder="Select Service"
      data={servicesOffered.map((item) => {
        const found = form.values.rateCards[idx].services.find(
          (itemOne) => itemOne.name === item.value,
        );
        if (found) return { ...item, disabled: true };
        return item;
      })}
      name={`rateCards.${idx}.services.${serIdx}.name`}
      {...form.getInputProps(`rateCards.${idx}.services.${serIdx}.name`)}
    />
  );
};

const AddPercentageGrids = ({
  value,
  idx,
  serVal,
  serIdx,
  form,
  servicesOffered,
  onDelete,
}) => {
  return (
    <Accordion
      mt={20}
      variant="separated"
      chevronPosition="left"
      defaultValue="item-0"
    >
      <Grid
        justify="center"
        align="flex-end"
        grow
        key={`${value.id}-${serVal.id}`}
        mt="10px"
      >
        <Grid.Col span={2}>
          {renderServices(idx, serIdx, form, servicesOffered)}
        </Grid.Col>

        <Grid.Col span={1}>
          <TextInput
            label="Monthly"
            placeholder="Monthly"
            type="number"
            required
            onClick={form.clearErrors}
            name={`rateCards.${idx}.services.${serIdx}.partnerRateMontly`}
            {...form.getInputProps(
              `rateCards.${idx}.services.${serIdx}.partnerRateMontly`,
            )}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput
            label="Daily"
            placeholder="Daily"
            type="number"
            required
            onClick={form.clearErrors}
            name={`rateCards.${idx}.services.${serIdx}.partnerRateDaily`}
            {...form.getInputProps(
              `rateCards.${idx}.services.${serIdx}.partnerRateDaily`,
            )}
          />
        </Grid.Col>
        <Grid.Col span={1} mr={25}>
          <TextInput
            label="One Time"
            placeholder="One Time"
            type="number"
            required
            onClick={form.clearErrors}
            name={`rateCards.${idx}.services.${serIdx}.partnerRateOnetime`}
            {...form.getInputProps(
              `rateCards.${idx}.services.${serIdx}.partnerRateOnetime`,
            )}
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <TextInput
            label="Monthly"
            placeholder="Monthly"
            type="number"
            disabled
            value={
              form.values.rateCards[idx].services[serIdx].partnerRateMontly -
              form.values.rateCards[idx].services[serIdx].partnerRateMontly *
                (form.values.referalFee / 100)
            }
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput
            label="Daily"
            placeholder="Daily"
            type="number"
            disabled
            value={
              form.values.rateCards[idx].services[serIdx].partnerRateDaily -
              form.values.rateCards[idx].services[serIdx].partnerRateDaily *
                (form.values.referalFee / 100)
            }
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput
            label="One Time"
            placeholder="One Time"
            type="number"
            disabled
            value={
              form.values.rateCards[idx].services[serIdx].partnerRateOnetime -
              form.values.rateCards[idx].services[serIdx].partnerRateOnetime *
                (form.values.referalFee / 100)
            }
          />
        </Grid.Col>

        {value.services.length != 1 && (
          <Grid.Col span={1}>
            <ActionIcon onClick={() => onDelete(idx, serIdx)} size="lg">
              <IconTrash size="1.5rem" color="red" />
            </ActionIcon>
          </Grid.Col>
        )}
      </Grid>
    </Accordion>
  );
};

export default AddPercentageGrids;

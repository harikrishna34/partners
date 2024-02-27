import { useRouter } from 'next/router';
import {
  ScrollArea,
  Table,
  Button,
  HoverCard,
  Text,
  Group,
  Image,
} from '@mantine/core';
const StaffTable = ({ data }) => {
  const router = useRouter();

  const renderHover = (row) => {
    return (
      <Group position="center">
        <HoverCard width={140} shadow="md" radius="xl">
          <HoverCard.Target>
            <Text c="blue" fw={500}>
              {row.Name}
            </Text>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Image
              src={row.ProfileImage.ProfileImg}
              radius="xl"
              alt="Profile"
              width={100}
              height={100}
              style={{ marginTop: '1rem' }}
            />
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    );
  };

  const ths = (
    <tr>
      <th>ProfileID</th>
      <th>Name</th>
      {/* <th>Service</th> */}
      <th>Language(s) Spoken</th>
      <th>Experience</th>
      <th>Phone</th>
      {/* <th>Address</th> */}
      <th>Status</th>
      <th>Action</th>
      {/* <th>Documents Submitted</th>
      <th>Certifications</th> */}
    </tr>
  );

  const rows = data.map((row) => (
    <tr key={row.ProfileID}>
      <td>{row.ProfileID}</td>
      <td>{renderHover(row)}</td>
      {/* <td>{row.SubcategoryName}</td> */}
      <td>{row.Languages.sort((a, b) => a.localeCompare(b)).join(', ')}</td>
      <td>{row.Experience} years</td>
      <td>{row.MobileNumber}</td>
      {/* <td>{row.Address}</td> */}
      <td>{row.Status}</td>
      <td>
        <Button
          onClick={() => {
            router.push(`/staff/update/${row.ProfileID}`);
          }}
        >
          View
        </Button>
      </td>
      {/* <td>
        <SimpleGrid>
          {row.docsSubmitted
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((doc) => (
              <Badge
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => handleFileDownload(doc.ref)}
                key={doc.name}
              >
                {doc.name}
              </Badge>
            ))}
        </SimpleGrid>
      </td>
      <td>{row.certifications.join(', ') || '-'}</td> */}
    </tr>
  ));

  return (
    <>
      <ScrollArea height={100}>
        <Table verticalSpacing="md" striped withColumnBorders withBorder>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default StaffTable;

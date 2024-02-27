import { ScrollArea, Table, Button, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import * as Common from '@/data/common';

const ContractsTable = ({ data }) => {
  const router = useRouter();
  const ths = (
    <tr>
      <th>Partner ID</th>
      <th>Partner Name</th>
      <th>Contact Name</th>
      <th>Contact No</th>
      <th>MOU Start Date</th>
      <th>MOU End Date</th>
      <th>Status</th>
      {/* <th>Contract Status</th> */}
      <th>Actions</th>
    </tr>
  );

  const rows = data.map((row, index) => (
    <tr
      style={{
        backgroundColor:
          row.ContractStatus == 'Approved'
            ? '#D3F9D8'
            : row.ContractStatus == 'Rejected'
            ? '#FFE3E3'
            : '',
      }}
      key={index}
    >
      <td>{row.PartnerID}</td>
      <td>{row.BusinessInfo.PartnerName}</td>
      <td>{row.BusinessInfo.ContactName}</td>
      <td>{row.BusinessInfo.ContactNo}</td>
      <td>{Common.renderDate(row.MoUStartDate)}</td>
      <td>{Common.renderDate(row.MoUExpiryDate)}</td>
      <td>{row.Status}</td>
      {/* <td>{row.ContractStatus}</td> */}
      <td>
        <Group>
          <Button
            onClick={() => router.push(`partners/${row.PartnerID}`)}
            fullWidth
            color="blue"
            size="xs"
            compact
          >
            View Contract
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table verticalSpacing="md" striped withColumnBorders withBorder>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default ContractsTable;

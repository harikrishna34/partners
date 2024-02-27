import { useState } from 'react';
import { useRouter } from 'next/router';
import { ScrollArea, Table, Button, Flex, Group } from '@mantine/core';
import PartnerApprovalModal from '../PartnerApprovalModal';

const PartnerTable = ({ data }) => {
  const router = useRouter();
  //const [modal, setModal] = useState({ opened: false, data: {} });

  //const onOpen = (rowData) => setModal({ opened: true, data: rowData });

  //const onClose = () => setModal({ opened: false, data: {} });

  const ths = (
    <tr>
      <th>Partner ID</th>
      <th>Company Name</th>
      <th>Company Type</th>
      <th>Contact Person</th>
      <th>Phone</th>
      {/* <th>Email</th> */}
      <th>Partner Status</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  );
  const renderActions = (row) => {
    if (row && row.approval == 'PENDING') {
      return (
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button
            onClick={() => router.push(`partners/${row.id}`)}
            color="blue"
            size="xs"
            compact
          >
            View
          </Button>

          <Button onClick={() => onOpen(row)} color="blue" size="xs" compact>
            Approve
          </Button>
        </Flex>
      );
    } else if (row && row.approval === 'APPROVED') {
      return (
        <Button
          onClick={() => router.push(`partners/${row.id}`)}
          fullWidth
          color="blue"
          size="xs"
          compact
        >
          View
        </Button>
      );
    }
  };

  const rows = data.map((row) => (
    <tr
      key={row.PartnerID}
      style={{
        backgroundColor:
          row.approval == 'Approved'
            ? '#D3F9D8'
            : row.approval == 'Rejected'
            ? '#FFE3E3'
            : '',
      }}
    >
      <td>{row.PartnerID}</td>
      <td>{row.BusinessInfo.PartnerName}</td>
      <td>{row.BusinessInfo.BusinessNature}</td>
      <td>{row.BusinessInfo.ContactName}</td>
      <td>{row.BusinessInfo.ContactNo}</td>
      {/* <td>{row.BusinessInfo.EmailID}</td> */}
      <td>{row.PartnerStatus}</td>
      <td>{row.Status}</td>
      <td>
        <Button
          onClick={() => router.push(`partners/${row.PartnerID}`)}
          fullWidth
          color="blue"
          size="xs"
          compact
        >
          View
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      {/* {modal.opened && (
        <PartnerApprovalModal
          data={modal.data}
          close={onClose}
          onApprove={onApprove}
          onReject={onReject}
        />
      )} */}
      <ScrollArea>
        <Table verticalSpacing="md" striped withColumnBorders withBorder>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default PartnerTable;

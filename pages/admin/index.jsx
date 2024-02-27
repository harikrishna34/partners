import {
  Paper,
  TextInput,
  Container,
  Title,
  SimpleGrid,
  Button,
  PasswordInput,
  Notification,
} from '@mantine/core';
import { useContext, useState } from 'react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { IconX } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import AdminLayout from '@/layouts/AdminLayout';
import { AuthContext } from '@/context/Auth';
import * as Rest from '@/data/restapi';
import axios from 'axios';

const Admin = () => {
  const router = useRouter();
  const { user, loading, setUser, setLoading } = useContext(AuthContext);

  const largeScreen = useMediaQuery('(min-width: 60em)');
  const size = largeScreen ? 'md' : 'sm';

  const form = useForm({
    initialValues: {
      UserID: '',
      Password: '',
      Type: 'employee',
    },

    validate: {
      UserID: (value) => (value.length === 10 ? null : 'Invalid phone number'),
      Password: (value) => (value.length >= 6 ? null : 'Password too short'),
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    axios
      .post(Rest.adminLogin, values)
      .then((res) => {
        const data = res.data;
        if (data.code == 'S001') {
          window.localStorage.setItem('isLogin', true);
          window.localStorage.setItem(
            'partnerID',
            data.data.UserData.Data['EmployeeID'],
          );
          window.localStorage.setItem(
            'x-fiftyaccess-token',
            data.data['x-fiftyaccess-token'],
          );
          setUser({
            isLogin: true,
            partnerID: data.data.UserData.Data['EmployeeID'],
            token: data.data['x-fiftyaccess-token'],
          });
          setLoading(false);
          close();
        } else {
          setLoading(false);
          alert(data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.data) {
          alert(err.response.data.data);
        } else {
          alert('Something went wrong. please try again.');
        }
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        gap: '1rem',
      }}
    >
      <Title ta="center">Admin Sign In</Title>
      <Paper shadow="xs" p="sm">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SimpleGrid cols={1} verticalSpacing="lg">
            <TextInput
              placeholder="Phone No"
              label="Phone No"
              description="Enter the phone number you used to register with us."
              withAsterisk
              size={size}
              {...form.getInputProps('UserID')}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              withAsterisk
              size={size}
              {...form.getInputProps('Password')}
            />
            <Button loading={loading} size={size} type="submit">
              Sign In
            </Button>
            {/* {error && (
              <Notification
                icon={<IconX size="1.1rem" />}
                color="red"
                withCloseButton={false}
              >
                Incorrect PhoneNo or password.
              </Notification>
            )} */}
          </SimpleGrid>
        </form>
      </Paper>
    </Container>
  );
};

Admin.getLayout = function getLayout(page) {
  return <AdminLayout noFooter>{page}</AdminLayout>;
};

export default Admin;

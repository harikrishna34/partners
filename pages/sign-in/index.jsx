import { useContext, useState } from 'react';
import axios from 'axios';
import {
  Paper,
  TextInput,
  Container,
  Title,
  SimpleGrid,
  Button,
  Modal,
  Group,
  Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery, useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';

import { AuthContext } from '@/context/Auth';
import Layout from '@/layouts';
import * as Rest from '@/data/restapi';

const STATUS_ENUM = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const SignIn = () => {
  const router = useRouter();
  const { setUser, setLoading, setIsApproved } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [verCode, setVerCode] = useState('');
  const [status, setStatus] = useState(STATUS_ENUM.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

  const [loginData, setLoginData] = useState({});

  const largeScreen = useMediaQuery('(min-width: 60em)');
  const size = largeScreen ? 'md' : 'sm';

  const form = useForm({
    initialValues: {
      phoneNo: '',
    },

    validate: {
      phoneNo: (value) => (value.length === 10 ? null : 'Invalid phone number'),
    },
  });

  const onVerifyCancel = () => {
    close();
    setStatus(STATUS_ENUM.ERROR);
    setErrorMessage('Verification Cancelled');
  };

  const login = (phoneNo) => {
    axios
      .post(Rest.login, { ContactNo: phoneNo, Type: 'Signin' })
      .then((res) => {
        const data = res.data;
        data.MobileNumber = phoneNo;
        setLoginData(data);
        if (data.code == 'L002') {
          open();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.data) {
          alert(err.response.data.data);
        } else {
          alert('Something went wrong. please try again.');
        }
      });
  };

  const verifyOtp = async () => {
    const bodyParams = {};
    bodyParams.OTPCode = verCode;
    bodyParams.OTPRecID = loginData.OTPRecID;
    bodyParams.PartnerID = loginData.PartnerID;

    axios
      .post(Rest.verifyOtp, bodyParams)
      .then((res) => {
        setLoading(true);
        const data = res.data;
        if (data.code == 'S001') {
          window.localStorage.setItem('isLogin', true);
          window.localStorage.setItem('partnerID', data.data['PartnerID']);
          window.localStorage.setItem(
            'x-fiftyaccess-token',
            data.data['token'],
          );
          if (
            data.data.partnerDetails.InitialOnBoardStatus &&
            data.data.partnerDetails.InitialOnBoardStatus == 'Approved'
          ) {
            window.localStorage.setItem('approved', true);
            setIsApproved(true);
          }
          setUser({
            isLogin: true,
            partnerID: data.data['PartnerID'],
            token: data.data['token'],
          });
          setLoading(false);
          close();
        } else {
          alert(data.data);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.data) {
          alert(err.response.data.data);
        } else {
          alert('Something went wrong. please try again.');
        }
      });
  };

  const handleLogin = async (values) => {
    try {
      setErrorMessage('');
      setStatus(STATUS_ENUM.IDLE);

      login(values.phoneNo);
    } catch (e) {}
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        {status == STATUS_ENUM.LOADING ? (
          <Group position="center" my={20}>
            <Loader size="lg" />
          </Group>
        ) : (
          <>
            <TextInput
              placeholder="OTP"
              label="Enter Verification Code Sent To Your Device"
              withAsterisk
              value={verCode}
              error={errorMessage}
              onChange={(e) => setVerCode(e.currentTarget.value)}
              size={size}
            />
            <Group position="center" mt={20}>
              <Button variant="outline" onClick={onVerifyCancel}>
                Cancel
              </Button>
              <Button disabled={verCode.length != 6} onClick={verifyOtp}>
                Verify
              </Button>
            </Group>
          </>
        )}
      </Modal>
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
        <Title ta="center">Sign In</Title>
        <Paper shadow="xs" p="sm">
          <form onSubmit={form.onSubmit(handleLogin)}>
            <SimpleGrid cols={1} verticalSpacing="lg">
              <TextInput
                placeholder="Phone No"
                label="Phone No"
                description="Enter the phone number you used to register with us. OTP for login would be sent. Standard Rates Apply."
                withAsterisk
                size={size}
                {...form.getInputProps('phoneNo')}
              />
              <Button id="login-button" size={size} type="submit">
                Sign In
              </Button>
              <Button
                onClick={() => router.push('/join-us')}
                variant="outline"
                size={size}
              >
                New User? Join Us
              </Button>
            </SimpleGrid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

SignIn.getLayout = function getLayout(page) {
  return <Layout noFooter>{page}</Layout>;
};

export default SignIn;

import { useContext, useEffect, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  Loader,
  Button,
  NavLink,
  Flex,
  Image,
} from '@mantine/core';
import { useRouter } from 'next/router';
import {
  IconDashboard,
  IconUsers,
  IconWriting,
  IconUserCircle,
} from '@tabler/icons-react';

import { AuthContext } from '@/context/Auth';
import bannerImage from '@/assets/images/Anvayaa.svg';

const data = [
  { icon: IconDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: IconWriting, label: 'Contracts', to: '/contracts' },
  { icon: IconUsers, label: 'Staff Management', to: '/staff' },
  { icon: IconUserCircle, label: 'My Profile', to: '/partner-profile' },
];

const ProtectedLayout = ({ children, noActions }) => {
  const router = useRouter();
  const { loading, user, setUser, isApproved, isStaff } =
    useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!loading && !user && router.isReady)
      router.replace(`/sign-in?next=${encodeURIComponent(router.asPath)}`);
  }, [router, user, loading]);

  if (!user) {
    return null;
  }

  const callSignOut = () => {
    window.localStorage.removeItem('isLogin');
    window.localStorage.removeItem('x-fiftyaccess-token');
    window.localStorage.removeItem('partnerID');
    window.localStorage.removeItem('approved');
    window.localStorage.removeItem('isStaff');
    setUser(null);
  };

  let dataa = [];
  // if (window.localStorage.getItem('approved')) {

  if (isApproved && isStaff) {
    dataa = [
      { icon: IconDashboard, label: 'Dashboard', to: '/dashboard' },
      { icon: IconWriting, label: 'Contracts', to: '/contracts' },
      { icon: IconUsers, label: 'Staff Management', to: '/staff' },
      { icon: IconUserCircle, label: 'My Profile', to: '/partner-profile' },
    ];
  } else if (isApproved) {
    dataa = [
      { icon: IconDashboard, label: 'Dashboard', to: '/dashboard' },
      { icon: IconWriting, label: 'Contracts', to: '/contracts' },
      { icon: IconUserCircle, label: 'My Profile', to: '/partner-profile' },
    ];
  } else {
    dataa = [
      { icon: IconUserCircle, label: 'My Profile', to: '/partner-profile' },
    ];
  }

  const items = dataa.map((item) => (
    <NavLink
      key={item.label}
      active={router.pathname.toLowerCase().includes(item.to)}
      label={item.label}
      rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        router.push(item.to);
        setOpened(false);
      }}
      variant="filled"
    />
  ));

  if (noActions) {
    return (
      <AppShell
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <Text ta="center">Partner Management</Text>
          </Header>
        }
      >
        {children}
      </AppShell>
    );
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          zIndex={200}
          width={{ sm: 200, lg: 300 }}
        >
          {items}
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Image
                src={bannerImage.src}
                alt=""
                height={40}
                onClick={() => router.push('/dashboard')}
              />
            </Flex>
            <Button onClick={callSignOut} variant="subtle" compact>
              Sign Out
            </Button>
          </div>
        </Header>
      }
    >
      {loading ? <Loader size="xl" variant="dots" /> : children}
    </AppShell>
  );
};

export default ProtectedLayout;

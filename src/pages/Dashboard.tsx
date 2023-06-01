import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Skeleton,
  Toolbar,
} from '@mui/material';
import Link from '@mui/material/Link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { useTheme } from '@emotion/react';
import { findAllDogs } from '../api';
import DogCard from '../components/DogCard';
import SearchInput from '../components/SearchComponent';

import MatchCardModal from '../components/MatchCardModal';
import SortFilterSection from '../components/SortFilterSection';
import { useFilter } from '../context/FilterProvider';
import { usePaginate } from '../context/PaginateProvider';
import BackToTop from '../components/common/BackToTop';

const CardSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 9 }, (item: string) => (
        <Grid key={item} item xs={12} sm={1}>
          <Card sx={{ minWidth: '250px' }}>
            <CardActionArea>
              <Skeleton
                variant="rectangular"
                sx={{
                  minHeight: '250px',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />

              <CardContent sx={{ p: 2 }}>
                <Box>
                  <Skeleton width="60%" height="50px" />
                  <Skeleton />
                  <Skeleton />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
};

interface CopyrightProps {
  sx: { pt: number };
}

const Copyright = ({ sx }: CopyrightProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

const Dashboard: React.FC = () => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const paginateValue = usePaginate();
  const filterValue = useFilter();
  const appTheme = useTheme();

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClearSelection = () => setChecked([]);
  const { ref, inView } = useInView();

  const { data, isFetching, fetchNextPage, isInitialLoading } =
    useInfiniteQuery({
      queryKey: ['findAllDogs', filterValue, paginateValue],
      queryFn: ({ pageParam }) => {
        return findAllDogs({
          nextQuery: pageParam,
          filter: filterValue,
          paginate: paginateValue,
        });
      },
      getNextPageParam: (lastPage) => lastPage.next,
    });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );
  const [scrollTrigger, setScrollTrigger] = React.useState<boolean>(false);

  const handleScroll = (event: React.SyntheticEvent) => {
    if (event.currentTarget.scrollTop > document.documentElement.clientHeight) {
      setScrollTrigger(true);
    } else {
      setScrollTrigger(false);
    }
  };

  const handleScrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement)?.ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
      onScroll={handleScroll}
    >
      <Toolbar sx={{ minHeight: '0 !important' }} id="back-to-top-anchor" />
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <MatchCardModal
          cardChecked={checked}
          handleClose={handleClose}
          modalOpen={modalOpen}
          allCards={data?.pages[0]?.response}
        />
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Box
              sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                padding: '0 20px',
                zIndex: 2,
                backgroundColor: appTheme.palette.grey[100],
                border: `1px solid ${appTheme.palette.grey[100]}`,
              }}
            >
              <SearchInput
                handleChange={handleChange}
                searchValue={searchValue}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <SortFilterSection />
                <Box display="flex">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ m: 2 }}
                    onClick={handleClearSelection}
                  >
                    Clear selection
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ m: 2 }}
                    onClick={handleClickOpen}
                  >
                    Find match
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            sx={{
              p: 1,
              mt: 15,
              zIndex: 1,
            }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            rowSpacing={5}
            columnSpacing={5}
            columns={{ sm: 2, md: 4 }}
          >
            {isInitialLoading ? (
              <CardSkeleton />
            ) : (
              data?.pages.map((group, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={i}>
                  {group?.response
                    ?.filter((item) => {
                      const lcSearchValue = searchValue.toLowerCase();
                      return (
                        item.name.toLowerCase().includes(lcSearchValue) ||
                        item.breed.toLowerCase().includes(lcSearchValue) ||
                        item.age
                          .toString()
                          .toLowerCase()
                          .includes(lcSearchValue) ||
                        item.zip_code.toLowerCase().includes(lcSearchValue)
                      );
                    })
                    .map((item, index) => (
                      <Grid
                        ref={group.response.length === index + 1 ? ref : null}
                        key={item.id}
                        item
                      >
                        <DogCard
                          img={item.img}
                          breed={item.breed}
                          name={item.name}
                          zipCode={item.zip_code}
                          checked={checked}
                          value={item.id}
                          age={item.age}
                          handleToggle={handleToggle}
                          searchValue={searchValue}
                        />
                      </Grid>
                    ))}
                  {isFetching && <CardSkeleton />}
                </React.Fragment>
              ))
            )}
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
      <BackToTop
        trigger={scrollTrigger}
        handleScrollToTop={handleScrollToTop}
      />
    </Box>
  );
};

export default Dashboard;

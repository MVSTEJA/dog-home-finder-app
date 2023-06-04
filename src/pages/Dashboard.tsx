import * as React from 'react';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import {
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { findAllDogs } from '../api';

import DogCard from '../components/DogCard';
import MatchCardModal from '../components/MatchCardModal';
import { SearchSection } from '../components/SortFilterSection';
import BackToTop from '../components/common/BackToTop';
import { useFilter, usePaginate } from '../context/hooks';

const CardSkeleton: React.FC = () => {
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <>
      {Array.from({ length: 9 }, (item: string, key) => (
        <Grid key={item + key.toString()}>
          <Card
            sx={{
              width: matches ? 350 : 250,
              margin: '0 auto',
            }}
          >
            <CardActionArea
              sx={{
                display: 'flex',
                flexDirection: matches ? 'row' : 'column',
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  flex: 1,
                  minHeight: '175px',
                }}
              />

              <CardContent sx={{ flex: 1, p: 2 }}>
                <Box>
                  <Skeleton width="75%" height="50px" />
                  <Skeleton width="50%" />
                  <Skeleton width="50%" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
};

const Dashboard: React.FC = () => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const paginateValue = usePaginate();
  const filterValue = useFilter();

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
  const { ref: loadMoreref, inView } = useInView();

  const {
    data,
    isFetching,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isInitialLoading,
  } = useInfiniteQuery({
    queryKey: ['findAllDogs', filterValue, paginateValue.sort],
    queryFn: ({ pageParam }) => {
      return findAllDogs({
        nextQuery: pageParam,
        filter: filterValue,
        paginate: paginateValue,
      });
    },
    getNextPageParam: (currentParam) => currentParam.next,
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

  const [scrollTrigger, setScrollTrigger] = React.useState<boolean>(false);

  const handleScroll = (event: React.SyntheticEvent) => {
    if (event.currentTarget.scrollTop > document.documentElement.clientHeight) {
      setScrollTrigger(true);
    } else {
      setScrollTrigger(false);
    }
  };

  const handleScrollToTop = () => {
    const anchor = document.querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };
  const matches = useMediaQuery('(min-width:600px)');
  const appENV =
    import.meta.env.MODE === 'development' ? 'develop' : 'production';
  const appTheme = useTheme();
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
        zIndex: 0,
        position: 'relative',
      }}
      onScroll={handleScroll}
    >
      <Container
        maxWidth="xl"
        sx={{ mb: 4, display: 'flex', flexFlow: 'column' }}
      >
        <MatchCardModal
          cardChecked={checked}
          handleClose={handleClose}
          modalOpen={modalOpen}
          allCards={data?.pages[0]?.response}
        />
        <Grid container item xs={12}>
          <Box
            sx={{
              px: 2,

              position: 'fixed',
              left: 0,
              right: 0,
              zIndex: 2,
              backgroundColor:
                appTheme.palette.mode === 'light'
                  ? appTheme.palette.grey[100]
                  : appTheme.palette.grey[900],

              border: `1px solid ${
                appTheme.palette.mode === 'light'
                  ? appTheme.palette.grey[100]
                  : appTheme.palette.grey[900]
              }`,
            }}
          >
            <Grid item xs={12} sx={{ p: 1 }}>
              <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
                Find a pet ({appENV})
              </Typography>
            </Grid>
            <SearchSection
              setSearchValue={setSearchValue}
              checked={checked}
              handleClearSelection={handleClearSelection}
              handleClickOpen={handleClickOpen}
            />
          </Box>
          <div id="back-to-top-anchor" />
          <Grid
            container
            sx={{
              p: 1,
              zIndex: 1,
              position: 'absolute',
              top: '15vh',
              left: 0,
              right: 0,
              margin: '0 auto',
            }}
            display="grid"
            gap={5}
            gridTemplateColumns={`repeat(auto-fit, minmax(${
              matches ? '300px' : '250px'
            }, 1fr))`}
          >
            {data?.pages.map((group, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={i}>
                {group?.response.length === 0 && (
                  <Typography>
                    Sorry! No dogs were found that match your search criteria.
                  </Typography>
                )}
                {group?.response.map((item, index) => {
                  const lcSearchValue = searchValue.toLowerCase();
                  const lcMatch =
                    item.name.toLowerCase().includes(lcSearchValue) ||
                    item.breed.toLowerCase().includes(lcSearchValue) ||
                    item.age.toString().toLowerCase().includes(lcSearchValue) ||
                    item.zip_code.toLowerCase().includes(lcSearchValue);

                  return (
                    <Grid
                      key={item.id}
                      item
                      sx={{
                        display: lcMatch ? 'block' : 'none',
                        contentVisibility: lcMatch ? 'visible' : 'hidden',
                      }}
                    >
                      <DogCard
                        index={index}
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
                  );
                })}
              </React.Fragment>
            ))}
            {isFetching && <CardSkeleton />}
            {(isInitialLoading || isFetching || isLoading) && <CardSkeleton />}
          </Grid>
          {hasNextPage && <CircularProgress ref={loadMoreref} />}
        </Grid>
      </Container>
      <BackToTop
        trigger={scrollTrigger}
        handleScrollToTop={handleScrollToTop}
      />
    </Box>
  );
};

export default Dashboard;

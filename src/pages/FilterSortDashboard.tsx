import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { FC, useState, useEffect, SyntheticEvent, Fragment } from 'react';
import { findAllDogs } from 'src/api';

import MatchCardModal from 'src/components/MatchCardModal';
import {
  FindMatchSection,
  SortFilterSection,
} from 'src/components/SortFilterSection';
import BackToTop from 'src/components/common/BackToTop';
import { useFilter, usePaginate } from 'src/context/hooks';
import MemoizedDogCard from 'src/components/PetCard';
import { MOBILE_WIDTH_QUERY } from 'src/constants';
import DashboardCardSkeleton from 'src/components/common/DashboardCardSkeleton';

const FilterSortDashboard: FC = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const paginateValue = usePaginate();
  const filterValue = useFilter();

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

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        fetchNextPage();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const [scrollTrigger, setScrollTrigger] = useState<boolean>(false);

  const handleScroll = (event: SyntheticEvent) => {
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
  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);

  return (
    <Container
      component={Container}
      maxWidth="xl"
      sx={{
        mb: 4,
        left: 0,
        right: 0,
        p: 0,
        position: 'fixed',
        height: '90vh',
      }}
      onScroll={handleScroll}
    >
      <MatchCardModal
        cardChecked={checked}
        handleClose={handleClose}
        modalOpen={modalOpen}
        allCards={data?.pages[0]?.response}
      />
      <Stack direction="row" alignItems="baseline" width="fit-content" mb={1}>
        <Typography variant="h6">Search for pet(s)</Typography>
        <Typography variant="body2" sx={{ ml: 1 }}>
          {' '}
          (choose from filter and sort the results.)
        </Typography>
      </Stack>
      <Stack>
        <Grid container xs={12} mb={4}>
          <Stack
            direction="row"
            sx={{
              flexBasis: '50%',
            }}
          >
            <SortFilterSection handleClearSelection={handleClearSelection} />
          </Stack>
          {checked.length > 0 && (
            <FindMatchSection
              checked={checked}
              handleClickOpen={handleClickOpen}
              handleClearSelection={handleClearSelection}
            />
          )}
        </Grid>

        <div id="back-to-top-anchor" />
        <Stack direction="row" alignItems="baseline" flexBasis="50%">
          <Typography variant="h6">Select from below cards</Typography>
          <Typography variant="body2" sx={{ ml: 1 }}>
            {' '}
            (and click "Find match")
          </Typography>
        </Stack>
        <Grid
          component={Paper}
          container
          sx={{
            py: 2,
            top: matches ? '15vh' : '20vh',
            mx: matches ? 0 : 1,
            width: '100%',
            overflowY: 'scroll',
            maxHeight: matches ? '75vh' : '70vh',
            flexFlow: 'column',
          }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'grid',
              gap: 3,
              gridTemplateColumns: `repeat(auto-fit, minmax(${
                matches ? '350px' : '325px'
              }, 1fr))`,
            }}
          >
            {!(isInitialLoading || isFetching || isLoading) &&
              !data?.pages[0]?.response?.length && (
                <Typography sx={{ p: 2, m: '0 auto' }}>
                  Sorry! No dogs were found matching your search criteria.
                </Typography>
              )}
            {data?.pages.map((group, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={i}>
                {group?.response.map((item) => {
                  return (
                    <Grid
                      key={item.id}
                      item
                      sx={{
                        width: '100%',
                      }}
                    >
                      <MemoizedDogCard
                        img={item.img}
                        breed={item.breed}
                        name={item.name}
                        zipCode={item.zip_code}
                        checked={checked}
                        value={item.id}
                        age={item.age}
                        setChecked={setChecked}
                      />
                    </Grid>
                  );
                })}
              </Fragment>
            ))}

            {(isInitialLoading || isFetching || isLoading) && (
              <DashboardCardSkeleton />
            )}

            {hasNextPage && <DashboardCardSkeleton elemRef={loadMoreref} />}
          </Box>
        </Grid>
      </Stack>

      <BackToTop
        trigger={scrollTrigger}
        handleScrollToTop={handleScrollToTop}
      />
    </Container>
  );
};

export default FilterSortDashboard;

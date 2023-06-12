import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import {
  FC,
  useState,
  useEffect,
  SyntheticEvent,
  Fragment,
  useRef,
} from 'react';
import { findAllDogs } from 'src/api';

import MatchCardModal from 'src/components/MatchCardModal';

import BackToTop from 'src/components/common/BackToTop';
import MemoizedDogCard from 'src/components/PetCard';
import SearchSection from 'src/components/SearchInput';
import DashboardCardSkeleton from 'src/components/common/DashboardCardSkeleton';
import FindMatchSection from 'src/components/SortFilterSection/FindMatchSections';
import SelectCardsLabel from 'src/components/SelectCardsLabel';
import { searchInitialFilter } from 'src/context/FilterProvider';
import { searchInitialPaginate } from 'src/context/PaginateProvider';

const DashboardSearch: FC = () => {
  const [checked, setChecked] = useState<string[]>([]);

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
    queryKey: ['findAllDogs', searchInitialFilter, searchInitialPaginate],
    queryFn: ({ pageParam }) => {
      return findAllDogs({
        nextQuery: pageParam,
        filter: searchInitialFilter,
        paginate: searchInitialPaginate,
      });
    },
    getNextPageParam: (currentParam) => currentParam?.next,
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

  const [searchValue, setSearchValue] = useState<string>('');

  const [scrollTrigger, setScrollTrigger] = useState<boolean>(false);

  const handleScroll = (event: SyntheticEvent) => {
    if (event.currentTarget.scrollTop > document.documentElement.clientHeight) {
      setScrollTrigger(true);
    } else {
      setScrollTrigger(false);
    }
  };

  const scrollIntoViewRef = useRef<HTMLInputElement>(null);

  const handleScrollToTop = () => {
    if (scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  };
  const appTheme = useTheme();
  const matches = appTheme.breakpoints.up('sm');

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
      }}
    >
      <MatchCardModal
        cardChecked={checked}
        handleClose={handleClose}
        modalOpen={modalOpen}
      />
      <Stack direction="row" alignItems="baseline" width="fit-content" mb={1}>
        <Typography variant="h6">Search for pet(s)</Typography>
        <Typography variant="subtitle2" sx={{ ml: 1 }}>
          (Note: This is an experimental search, It is slow. We are working on
          fixing it! )
        </Typography>
      </Stack>
      <Stack>
        <Grid
          container
          xs={12}
          sx={{
            mb: 4,
          }}
        >
          <Stack
            component={Paper}
            direction="row"
            sx={{
              flexBasis: '50%',
            }}
          >
            <SearchSection setSearchValue={setSearchValue} />
          </Stack>
          {checked.length > 0 && (
            <FindMatchSection
              checked={checked}
              handleClickOpen={handleClickOpen}
              handleClearSelection={handleClearSelection}
            />
          )}
        </Grid>

        <SelectCardsLabel />
        <Grid
          component={Paper}
          container
          sx={{
            py: 2,
            top: matches ? '15vh' : '20vh',
            mx: matches ? 0 : 1,
            width: '100%',
            overflowY: 'scroll',
            maxHeight: '70vh',
            flexFlow: 'column',
          }}
          onScroll={handleScroll}
        >
          <div id="back-to-top-anchor" ref={scrollIntoViewRef} />
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
                        searchValue={searchValue}
                      />
                    </Grid>
                  );
                })}
              </Fragment>
            ))}

            {(isInitialLoading || isFetching || isLoading) && (
              <DashboardCardSkeleton />
            )}
            {hasNextPage && (
              <DashboardCardSkeleton elemRef={loadMoreref} loaderSize={16} />
            )}
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

export default DashboardSearch;

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { FC, useState, useEffect, SyntheticEvent, Fragment } from 'react';
import { findAllDogs } from 'src/api';

import MatchCardModal from 'src/components/MatchCardModal';
import { SearchSection } from 'src/components/SortFilterSection';
import BackToTop from 'src/components/common/BackToTop';
import { useFilter, usePaginate } from 'src/context/hooks';
import MemoizedDogCard from 'src/components/DogCard';
import { MOBILE_WIDTH_QUERY } from 'src/constants';

const CardSkeleton: FC<{
  elemRef?: (node?: Element | null | undefined) => void;
}> = ({ elemRef = null }) => {
  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);
  return (
    <>
      {Array.from({ length: 12 }, (item: string, key) => (
        <Grid key={item + key.toString()}>
          <Card
            sx={{
              width: matches ? 350 : 325,
              margin: '0 auto',
            }}
          >
            {key === 1 && <div ref={elemRef || null} />}
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
                  width: '100%',
                  minHeight: '175px',
                }}
              />

              <CardContent sx={{ flex: 1, p: 2, width: '100%' }}>
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

const Dashboard: FC = () => {
  const [checked, setChecked] = useState<string[]>([]);

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
  const appENV =
    import.meta.env.MODE === 'development' ? 'develop' : 'production';

  return (
    <Box
      component={Container}
      fixed
      sx={{
        flexGrow: 1,

        zIndex: 0,
        mb: 4,
        p: 0,
        m: 0,
        display: 'flex',
        flexFlow: 'column',
        position: 'relative',
      }}
      onScroll={handleScroll}
    >
      <MatchCardModal
        cardChecked={checked}
        handleClose={handleClose}
        modalOpen={modalOpen}
        allCards={data?.pages[0]?.response}
      />
      <Grid container item xs={12}>
        <Grid
          container
          item
          component={Paper}
          sx={{
            px: 2,
            mx: matches ? 0 : 1,
            mb: 2,
          }}
        >
          <Grid item xs={12} sx={{ p: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Find a pet ({appENV})
            </Typography>
          </Grid>
          <SearchSection
            setSearchValue={setSearchValue}
            checked={checked}
            handleClearSelection={handleClearSelection}
            handleClickOpen={handleClickOpen}
          />
        </Grid>
        <div id="back-to-top-anchor" />
        <Grid
          component={Paper}
          container
          sx={{
            pt: 2,
            top: matches ? '15vh' : '20vh',
            mx: matches ? 0 : 1,
            width: '100%',
            overflowY: 'scroll',
            maxHeight: matches ? '75vh' : '70vh',
            flexFlow: 'column',
          }}
        >
          <Paper
            sx={{
              height: '100%',
              display: 'grid',
              gap: 3,
              gridTemplateColumns: `repeat(auto-fit, minmax(${
                matches ? '350px' : '325px'
              }, 1fr))`,
            }}
          >
            {data?.pages[0]?.response?.length === 0 && (
              <Typography sx={{ p: 2 }}>
                Sorry! No dogs were found that match your search criteria.
              </Typography>
            )}
            {data?.pages.map((group, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={i}>
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
                        width: '100%',
                      }}
                    >
                      <MemoizedDogCard
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
              </Fragment>
            ))}

            {(isInitialLoading || isFetching || isLoading) && <CardSkeleton />}

            {hasNextPage && <CardSkeleton elemRef={loadMoreref} />}
          </Paper>
        </Grid>
      </Grid>

      <BackToTop
        trigger={scrollTrigger}
        handleScrollToTop={handleScrollToTop}
      />
    </Box>
  );
};

export default Dashboard;

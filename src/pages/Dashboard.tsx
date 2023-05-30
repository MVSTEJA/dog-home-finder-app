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
} from '@mui/material';
import Link from '@mui/material/Link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { findAllDogs } from '../api';
import DogCard from '../components/DogCard';
import SearchInput from '../components/SearchComponent';

import MatchCardModal from '../components/MatchCardModal';
import SortFilterSection from '../components/SortFilterSection';
import { useFilter } from '../context/FilterProvider';
import { usePaginate } from '../context/PaginateProvider';

const CardSkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 9 }, (item: string) => (
        <Grid key={item} item xs={6} sm={4}>
          <Card sx={{ minWidth: 50 }}>
            <CardActionArea>
              <Skeleton
                variant="rectangular"
                sx={{
                  minHeight: '150px',
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
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {isFetching && <CircularProgress />}

          <MatchCardModal
            cardChecked={checked}
            handleClose={handleClose}
            modalOpen={modalOpen}
            allCards={data?.pages}
          />
          <Grid item xs={12}>
            <SearchInput
              handleChange={handleChange}
              searchValue={searchValue}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <SortFilterSection />
              <Box>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ m: 2 }}
                  onClick={handleClearSelection}
                >
                  Clear selection
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ m: 2 }}
                  onClick={handleClickOpen}
                >
                  Find match
                </Button>
              </Box>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                p: 1,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
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
                          xs={6}
                          sm={4}
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
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};

export default Dashboard;

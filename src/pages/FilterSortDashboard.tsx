import {
  Box,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { FC, useState } from 'react';
import { findAllDogs } from 'src/api';

import MatchCardModal from 'src/components/MatchCardModal';
import {
  FindMatchSection,
  SortFilterSection,
} from 'src/components/SortFilterSection';
import { useFilter, usePaginate, usePaginateDispatch } from 'src/context/hooks';
import MemoizedDogCard from 'src/components/PetCard';
import { MOBILE_WIDTH_QUERY } from 'src/constants';

const FilterSortDashboard: FC = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const paginateValue = usePaginate();
  const setPaginateValue = usePaginateDispatch();
  const filterValue = useFilter();

  const handleClearSelection = () => setChecked([]);

  const { isLoading, data, isFetching, isInitialLoading } = useQuery({
    queryKey: ['findAllDogs', filterValue, paginateValue.from],
    queryFn: ({ pageParam }) => {
      return findAllDogs({
        nextQuery: pageParam,
        filter: filterValue,
        paginate: paginateValue,
      });
    },
    keepPreviousData: true,
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
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
      }}
    >
      <MatchCardModal
        cardChecked={checked}
        handleClose={handleClose}
        modalOpen={modalOpen}
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
            overflow: 'hidden',
            maxHeight: matches ? '65vh' : '60vh',
            flexFlow: 'column',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: `repeat(auto-fit, minmax(${
                matches ? '350px' : '325px'
              }, 1fr))`,
            }}
          >
            {!(isInitialLoading || isFetching || isLoading) &&
              !data?.response?.length && (
                <Typography sx={{ p: 2, m: '0 auto' }}>
                  Sorry! No dogs were found matching your search criteria.
                </Typography>
              )}

            {data?.response.map((item) => {
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
          </Box>
        </Grid>
        <Stack
          direction="row"
          sx={{
            mt: 2,
            justifyContent: 'center',
          }}
          spacing={2}
        >
          <Pagination
            count={10}
            variant="outlined"
            color="secondary"
            page={paginateValue?.from || 1}
            onChange={(_, page) => {
              setPaginateValue({
                type: 'next_page',
                from: Number(page),
              });
            }}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default FilterSortDashboard;

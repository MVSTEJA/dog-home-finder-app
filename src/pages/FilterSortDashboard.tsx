import {
  Box,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import { useUrlSearchParams } from 'use-url-search-params';

import { findAllDogs } from 'src/api';
import MatchCardModal from 'src/components/MatchCardModal';
import { SortFilterSection } from 'src/components/SortFilterSection';
import { useFilter, usePaginate, usePaginateDispatch } from 'src/context/hooks';
import MemoizedDogCard from 'src/components/PetCard';
import { PAGE_SIZE } from 'src/constants';
import FindMatchSection from 'src/components/SortFilterSection/FindMatchSections';
import { convertToArray, getURLParams } from 'src/utils/url-params';
import { initialPaginate } from 'src/context/PaginateProvider';

const FilterSortDashboard: FC = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const paginateValue = usePaginate();
  const setPaginateValue = usePaginateDispatch();
  const filterValue = useFilter();
  const [params, setParams] = useUrlSearchParams({
    page: getURLParams('page'),
    breeds: getURLParams('breeds'),
    city: getURLParams('city'),
    state: getURLParams('state'),
    description: getURLParams('description'),
    sortBy: getURLParams('sortBy'),
    sortId: getURLParams('sortId'),
  });

  const complexExpression = [
    JSON.stringify(filterValue?.breeds),
    JSON.stringify(filterValue?.place),
    JSON.stringify(paginateValue.sort),
    JSON.stringify(paginateValue.from),
  ];

  useEffect(() => {
    setParams({
      breeds: filterValue?.breeds.map((x) => x.value).toString(),
      city: filterValue?.place.city,
      description: filterValue?.place.description,
      state: filterValue?.place.state,
      sortBy: paginateValue.sort.by,
      sortId: paginateValue.sort.id,
      page: paginateValue.from,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, complexExpression);
  const handleClearSelection = () => setChecked([]);
  const filterQuery = {
    breeds: params?.breeds
      ? convertToArray(params?.breeds.toString())?.map((x) => ({
          value: x,
          label: x,
        }))
      : [],
    place: {
      city: params?.city?.toString() || '',
      state: params?.state?.toString() || '',
      description: params?.desription?.toString() || '',
    },
  };
  const pageNumber = Number(params.page);
  const paginateQuery = {
    from: pageNumber,
    size: initialPaginate.size,
    sort: {
      by: params.sortBy?.toString() || '',
      id: params.sortId?.toString() || '',
      name: params.sortBy?.toString() || '',
    },
  };
  const { isLoading, data, isFetching, isInitialLoading } = useQuery({
    queryKey: ['findAllDogs', filterQuery, paginateQuery],
    queryFn: ({ pageParam }) => {
      return findAllDogs({
        nextQuery: pageParam,
        filter: filterQuery,
        paginate: paginateQuery,
      });
    },
    keepPreviousData: true,
  });

  const totalPages = data?.totalPages || 0;
  const count = Number(((totalPages - 1 || 0) / PAGE_SIZE - 1).toFixed());

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const appTheme = useTheme();

  const matches = appTheme.breakpoints.up('sm');

  return (
    <Container
      component={Container}
      maxWidth="xl"
      sx={{
        mb: 4,
        p: 0,
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
        <Grid container item xs={12} mb={4}>
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
            overflow: 'visible',
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
            count={count}
            variant="outlined"
            color="secondary"
            page={pageNumber || 1}
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

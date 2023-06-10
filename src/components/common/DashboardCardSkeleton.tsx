import {
  Grid,
  Card,
  CardActionArea,
  Skeleton,
  CardContent,
  Box,
} from '@mui/material';
import { FC } from 'react';
import { MOBILE_WIDTH_QUERY } from 'src/constants';
import { useMediaQuery } from 'usehooks-ts';

const DashboardCardSkeleton: FC<{
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
export default DashboardCardSkeleton;

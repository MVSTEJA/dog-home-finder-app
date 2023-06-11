import {
  Grid,
  Card,
  CardActionArea,
  Skeleton,
  CardContent,
  Box,
  useTheme,
} from '@mui/material';
import { FC } from 'react';

const DashboardCardSkeleton: FC<{
  elemRef?: (node?: Element | null | undefined) => void;
  loaderSize?: number;
}> = ({ elemRef = null, loaderSize = 12 }) => {
  const appTheme = useTheme();
  const matches = appTheme.breakpoints.up('sm');

  return (
    <>
      {Array.from({ length: loaderSize }, (item: string, key) => (
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

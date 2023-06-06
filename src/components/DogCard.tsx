import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { FC, memo } from 'react';
import { Dog } from 'src/types';
import GetHighlightedText from 'src/utils/highlight-text';
import DogIcon from './common/DogIcon';

export interface DogCardProps extends Dog {
  index: number;
  checked?: string[];
  value: string;
  handleToggle?: (value: string) => void;
  searchValue?: string;
}

export const DogCardContent = ({
  img,
  name,
  matches,
  searchValue = '',
  age,
  breed,
  zipCode,
}: Dog) => {
  return (
    <>
      <CardMedia
        component="img"
        sx={{
          height: '175px',
          transition: 'transform 330ms ease-in',
          aspectRatio: 1,
          flex: 1,
        }}
        image={img}
        alt={name}
        loading="lazy"
      />

      <CardContent
        sx={{
          display: 'flex',
          flexFlow: 'column',
          height: matches ? '175px' : '125px',
          flex: 1,
        }}
      >
        <Grid container item flexBasis="100%">
          <Typography gutterBottom variant="body1" component="div">
            <GetHighlightedText highlight={searchValue} text={name} />
            <GetHighlightedText highlight={searchValue} text={age.toString()} />
          </Typography>
        </Grid>
        <Grid container item flexBasis="50%">
          <Grid item xs={3}>
            <DogIcon />
          </Grid>
          <Grid item xs={9} display="flex" justifyContent="flex-end">
            <Typography variant="body1" color="text.primary">
              <GetHighlightedText highlight={searchValue} text={breed} />
            </Typography>
          </Grid>
        </Grid>
        <Grid container item flexBasis="50%">
          <Grid item xs={3}>
            <Typography variant="body1" color="text.secondary">
              <PinDropRoundedIcon />
            </Typography>
          </Grid>
          <Grid item xs={9} display="flex" justifyContent="flex-end">
            <Typography variant="body1" color="text.primary">
              <GetHighlightedText highlight={searchValue} text={zipCode} />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

const DogCard: FC<DogCardProps> = ({
  index = 0,
  img,
  breed = '',
  name = '',
  zipCode = '',
  checked = [''],
  value,
  handleToggle = () => {},
  age = null,
  searchValue = '',
}: DogCardProps) => {
  const cardSelected = checked?.indexOf(value) !== -1;

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Card
      component={Paper}
      variant="outlined"
      sx={{
        width: matches ? 350 : 325,
        mx: 'auto',
        position: 'relative',
        overflow: 'visible',
        '--delay': index,
        animationName: 'animateIn',
        animationDuration: '100ms',
        animationDelay: `calc(var(--delay, 0) * 20ms)`,
        animationFillMode: 'both',
        animationTimingFunction: 'ease-in-out',
      }}
    >
      {cardSelected && (
        <Box
          sx={{
            position: 'absolute',
            right: -15,
            top: -15,
          }}
        >
          <Checkbox
            edge="start"
            checked={cardSelected}
            tabIndex={-1}
            disableRipple
            sx={{
              zIndex: 1,
              padding: 0,
              m: 1,
              borderColor: 'transparent',
            }}
            inputProps={{ 'aria-labelledby': name }}
            icon={<CircleOutlinedIcon />}
            checkedIcon={<CheckCircleSharpIcon />}
          />
        </Box>
      )}
      <CardActionArea
        onClick={() => {
          handleToggle?.(value);
        }}
        className={cardSelected ? 'Mui-selected' : ''}
        sx={{
          display: matches ? 'flex' : 'block',
          '&:hover .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
          justifyContent: 'flex-start',
        }}
      >
        <DogCardContent
          img={img}
          name={name}
          matches={matches}
          searchValue={searchValue}
          age={age}
          breed={breed}
          zipCode={zipCode}
        />
      </CardActionArea>
    </Card>
  );
};
const MemoizedDogCard = memo(DogCard);
export default MemoizedDogCard;

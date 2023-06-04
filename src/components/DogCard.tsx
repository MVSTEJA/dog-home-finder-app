import { useTheme } from '@emotion/react';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import {
  Box,
  CardActionArea,
  Checkbox,
  Grid,
  Paper,
  ThemeOptions,
  useMediaQuery,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Highlighter from 'react-highlight-words';

import { Dog } from '../types';
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
  const theme: ThemeOptions = useTheme();

  const themeLightColor = React.useMemo(
    () => theme?.palette?.primary,
    [theme?.palette?.primary]
  );
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
          width: '100%',
        }}
      >
        <Grid container item flexBasis="100%">
          <Typography gutterBottom variant="body1" component="div">
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[searchValue]}
              autoEscape
              textToHighlight={name}
            />{' '}
            (
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[searchValue]}
              autoEscape
              textToHighlight={age?.toString()}
            />
            )
          </Typography>
        </Grid>
        <Grid container item flexBasis="50%">
          <Grid item xs={3}>
            {/* @ts-expect-error imported inherent lib types issues */}
            <DogIcon color={themeLightColor?.light || ''} />
          </Grid>
          <Grid item xs={9} display="flex" justifyContent="flex-end">
            <Typography variant="body1" color="text.primary">
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={breed}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container item flexBasis="50%">
          <Grid item xs={3}>
            <Typography variant="body1" color="text.secondary">
              <LocalPostOfficeOutlinedIcon color="primary" height={20} />
            </Typography>
          </Grid>
          <Grid item xs={9} display="flex" justifyContent="flex-end">
            <Typography variant="body1" color="text.primary">
              <Highlighter
                highlightClassName="YourHighlightClass"
                searchWords={[searchValue]}
                autoEscape
                textToHighlight={zipCode}
              />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

const DogCard: React.FC<DogCardProps> = ({
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
        width: matches ? 350 : 250,
        m: '0 auto',
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
        sx={{
          backgroundColor: `${cardSelected ? 'rgba(137, 0, 117, 0.24)' : ''}`,
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
const MemoizedDogCard = React.memo(DogCard);
export default MemoizedDogCard;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Box,
  CardActionArea,
  Checkbox,
  Grid,
  Paper,
  useMediaQuery,
} from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Highlighter from 'react-highlight-words';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import { useTheme } from '@emotion/react';

import { Dog } from '../types';
import DogIcon from './common/DogIcon';

export interface DogCardProps extends Dog {
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
  const theme = useTheme();
  return (
    <>
      <CardMedia
        component="img"
        sx={{
          // m: 1,
          width: '175px',
          height: '175px',
          transition: 'transform 330ms ease-in',
          aspectRatio: 1,
        }}
        image={img}
        alt={name}
        loading="lazy"
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexFlow: 'column',
          height: matches ? '175px' : '125px',
          alignSelf: 'flex-start',
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
            <DogIcon color={theme.palette.primary.light} />
          </Grid>
          <Grid item xs={9}>
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
              <LocalPostOfficeOutlinedIcon
                height={20}
                sx={{ color: theme.palette.primary.light }}
              />
            </Typography>
          </Grid>
          <Grid item xs={9}>
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
  img,
  breed = '',
  name = '',
  zipCode = '',
  checked,
  value,
  handleToggle,
  age = null,
  searchValue,
}: DogCardProps) => {
  const cardSelected = checked?.indexOf(value) !== -1;

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Card
      component={Paper}
      variant="outlined"
      sx={{ position: 'relative', overflow: 'visible' }}
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
              borderRadius: '50% !important',
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

// const DogCardHover = () => {
//   return (
//     <Paper
//       // href={ROUTES.showcase}
//       variant="body1"
//       sx={{ p: 2, height: '100%' }}
//     >
//       <Typography variant="body1" fontWeight="bold" sx={{ mb: 0.5 }}>
//         Showcase
//       </Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
//         Check out some great examples of MUI&apos;s products in action.
//       </Typography>
//       <Typography
//         color="primary"
//         variant="body1"
//         fontWeight="bold"
//         sx={{
//           '& > svg': { transition: '0.2s' },
//           '&:hover > svg': { transform: 'translateX(2px)' },
//         }}
//       >
//         Learn more{' '}
//         <KeyboardArrowRightRounded
//           fontSize="small"
//           sx={{ verticalAlign: 'middle' }}
//         />
//       </Typography>
//     </Paper>
//   );
// };
DogCard.defaultProps = {
  checked: [''],
  handleToggle: () => {},
  searchValue: '',
};

export default DogCard;

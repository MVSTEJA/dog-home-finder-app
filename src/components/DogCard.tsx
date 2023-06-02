import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  CardActionArea,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  useMediaQuery,
} from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Highlighter from 'react-highlight-words';

import { Dog } from '../types';

export interface DogCardProps extends Dog {
  checked?: string[];
  value: string;
  handleToggle?: (value: string) => void;
  searchValue?: string;
}

const DogCard: React.FC<DogCardProps> = ({
  img,
  breed,
  name,
  zipCode,
  checked,
  value,
  handleToggle,
  age,
  searchValue,
}: DogCardProps) => {
  const cardSelected = checked?.indexOf(value) !== -1;

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Card component={Paper} variant="elevation">
      <CardActionArea
        onClick={() => {
          handleToggle?.(value);
        }}
        sx={{
          backgroundColor: `${cardSelected ? 'rgba(137, 0, 117, 0.24)' : ''}`,
          display: matches ? 'flex' : 'block',
        }}
      >
        {checked && (
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
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
          </IconButton>
        )}
        <CardMedia
          component="img"
          sx={{
            m: 1,
            width: '250px',
            height: '250px',
            transition: 'transform 330ms ease-in',
            aspectRatio: 1,
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
          image={img}
          alt={name}
          loading="lazy"
        />

        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'flex-start',
            marginTop: matches ? '30px' : 0,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[searchValue]}
              autoEscape
              textToHighlight={name}
            />
            (age:
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[searchValue]}
              autoEscape
              textToHighlight={age?.toString()}
            />
            )
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Breed name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
                <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[searchValue]}
                  autoEscape
                  textToHighlight={breed}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Zip:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.primary">
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
      </CardActionArea>
    </Card>
  );
};

// const DogCardHover = () => {
//   return (
//     <Paper
//       // href={ROUTES.showcase}
//       variant="outlined"
//       sx={{ p: 2, height: '100%' }}
//     >
//       <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
//         Showcase
//       </Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//         Check out some great examples of MUI&apos;s products in action.
//       </Typography>
//       <Typography
//         color="primary"
//         variant="body2"
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

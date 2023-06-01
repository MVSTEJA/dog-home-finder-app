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
  Skeleton,
} from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
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
  const [imageLoaded, setimageLoaded] = React.useState<boolean>(false);
  const [imageHoverState, setImageHoverState] = React.useState(false);

  const cardSelected = checked?.indexOf(value) !== -1;

  return (
    <Card
      component={Paper}
      variant="outlined"
      onMouseEnter={() => setImageHoverState(true)}
      onMouseLeave={() => setImageHoverState(false)}
    >
      <CardActionArea
        onClick={() => {
          handleToggle?.(value);
        }}
        sx={{
          backgroundColor: `${cardSelected ? 'rgba(137, 0, 117, 0.24)' : ''}`,
        }}
      >
        {checked && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
            }}
          >
            <Checkbox
              edge="start"
              checked={cardSelected}
              tabIndex={-1}
              disableRipple
              sx={{
                zIndex: 1,
              }}
              inputProps={{ 'aria-labelledby': name }}
              icon={<CheckCircleOutlineSharpIcon />}
              checkedIcon={<CheckCircleSharpIcon />}
            />
          </Box>
        )}
        <CardMedia
          component="img"
          sx={{
            width: '250px',
            height: '250px',
            display: imageLoaded ? 'block' : 'none',
            transform:
              imageHoverState && !cardSelected ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 330ms ease-in',
            aspectRatio: 1,
          }}
          image={img}
          onLoad={() => setimageLoaded(true)}
          alt={name}
          loading="lazy"
        />
        {console.log({ imageLoaded })}
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            sx={{
              minHeight: '250px',
              minWidth: '250px',
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          />
        )}
        <CardContent>
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

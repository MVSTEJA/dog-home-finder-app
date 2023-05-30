import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Checkbox, Grid, Skeleton } from '@mui/material';
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
  return (
    <Card sx={{ minWidth: 50 }}>
      <CardActionArea
        onClick={() => {
          handleToggle?.(value);
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
              checked={checked?.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': name }}
              icon={<CheckCircleOutlineSharpIcon />}
              checkedIcon={<CheckCircleSharpIcon />}
            />
          </Box>
        )}

        <CardMedia
          component="img"
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            visibility: imageLoaded ? 'visible' : 'hidden',
          }}
          image={img}
          onLoad={() => setimageLoaded(true)}
          alt={name}
          loading="lazy"
        />
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            sx={{
              minHeight: '150px',
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
              textToHighlight={age.toString()}
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
DogCard.defaultProps = {
  checked: [''],
  handleToggle: () => {},
  searchValue: '',
};

export default DogCard;

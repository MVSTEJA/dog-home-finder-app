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
  Typography,
  useMediaQuery,
} from '@mui/material';

import { FC, memo } from 'react';
import { Dog } from 'src/types';
import GetHighlightedText from 'src/utils/highlight-text';
import { MOBILE_WIDTH_QUERY } from 'src/constants';
import PetIcon from './common/DogIcon';

interface DogProps extends Omit<Dog, 'id' | 'content' | 'match' | 'zip_code'> {
  searchValue?: string;
  zipCode: string;
}

export const PetCardContent: FC<DogProps> = ({
  img,
  name,
  searchValue = '',
  age,
  breed,
  zipCode,
}) => {
  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);
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
          height: matches ? '145px' : '125px',
          flex: 1,
        }}
      >
        <Grid container item flexBasis="100%">
          <Typography gutterBottom variant="body1" component="div">
            <GetHighlightedText highlight={searchValue} text={name} /> (
            <GetHighlightedText highlight={searchValue} text={age.toString()} />
            )
          </Typography>
        </Grid>
        <Grid container item flexBasis="50%">
          <Grid item xs={3}>
            <PetIcon />
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

export interface PetCardProps extends DogProps {
  checked?: string[];
  value: string;
  setChecked: (value: string[]) => void;
}
const PetCard: FC<PetCardProps> = ({
  img,
  breed = '',
  name = '',
  zipCode = '',
  checked = [''],
  value,
  age,
  searchValue = '',
  setChecked,
}: PetCardProps) => {
  const cardSelected = checked?.indexOf(value) !== -1;

  const matches = useMediaQuery(MOBILE_WIDTH_QUERY);
  const handleToggle = (checkedValue: string) => {
    const currentIndex = checked.indexOf(checkedValue);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(checkedValue);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <Card
      variant="outlined"
      className={cardSelected ? 'Mui-selected' : ''}
      sx={{
        width: matches ? 350 : 325,
        border: 'none',
        mx: 'auto',
        position: 'relative',
        overflow: 'visible',
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
        <PetCardContent
          img={img}
          name={name}
          searchValue={searchValue}
          age={age}
          breed={breed}
          zipCode={zipCode}
        />
      </CardActionArea>
    </Card>
  );
};
const MemoizedPetCard = memo(PetCard);
export default MemoizedPetCard;

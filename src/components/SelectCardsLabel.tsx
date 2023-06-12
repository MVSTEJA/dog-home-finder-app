import { Stack, Typography } from '@mui/material';

const SelectCardsLabel = () => (
  <Stack direction="row" sx={{ mt: 2, mb: 1, alignItems: 'baseline' }}>
    <Stack direction="row" alignItems="baseline" flexBasis="100%">
      <Typography variant="h6">Select from below cards</Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>
        {' '}
        (and click "Find match")
      </Typography>
    </Stack>
  </Stack>
);

export default SelectCardsLabel;

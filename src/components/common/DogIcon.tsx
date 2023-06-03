import { SvgIcon, SvgIconProps } from '@mui/material';

const DogIcon = (props: SvgIconProps) => {
  const { color } = props;
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24"
        width="24"
      >
        <g>
          <path
            d="M10.16,12.93A4.29,4.29,0,0,1,6.5,17v2.54h.83a1,1,0,0,1,1,.77l.32,1.44H4.57L3.55,17l1.36-1.53L4.15,13.2l-.09-.78A3.56,3.56,0,0,1,7.62,8.86h5.09a3.19,3.19,0,0,0,3-2.31"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
          <path
            d="M4.4,10.9A3.88,3.88,0,0,1,.5,7.28,3.58,3.58,0,0,1,.81,5.81"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
          <path
            d="M18.56,4.43l.22,1a1.12,1.12,0,0,1-1,1.42H16.33a1.12,1.12,0,0,1-1-1.42l.51-2.29a1,1,0,0,1,1-.87H18.3a2.81,2.81,0,0,1,3.05,2h1.13a1,1,0,0,1,1,1.34l-.4,1.19a1,1,0,0,1-.72.66l-2.51.63c.18,3.65-.5,6.13-2.32,7.15L17,19.54h.51a1,1,0,0,1,1,.77l.32,1.44H14.5v-6H11.69"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
export default DogIcon;

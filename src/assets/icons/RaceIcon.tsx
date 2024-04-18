import { IconProps } from './IconProps';

const RaceIcon = ({ color }: IconProps) => {
  return (
    <svg width="177" height="211" viewBox="0 0 177 211" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 107.355V199.474C9 201.027 10.6931 201.988 12.0262 201.191L166.168 109.048C167.457 108.277 167.469 106.414 166.189 105.628L9 9" stroke={color} strokeWidth="18" strokeLinecap="round"/>
    </svg>
  );
};
export default RaceIcon;
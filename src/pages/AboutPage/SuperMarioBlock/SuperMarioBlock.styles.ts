import Icon from '../../../components/Icon';
import styled, { keyframes, css } from '../../../custom/styled-components';
import { cursorClickUrl } from '../../../styles/variables';

interface BrickBlockProps {
  bumping: boolean;
}

const bump = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

export const BrickBlock = styled(Icon.BrickBlock)<BrickBlockProps>`
  ${props =>
    props.bumping &&
    css`
      animation: ${bump} 0.25s linear;
    `}
    cursor: url(${cursorClickUrl}), pointer;
`;

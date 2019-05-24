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

const riseAndFall = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-55px); }
  100% { transform: translateY(0); }
`;

export const CoinContainer = styled.div`
  animation: ${riseAndFall} 1.5s linear;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

const rotating = keyframes`
  from { transform: rotate3d(0, 1, 0, 0deg) scale(.75) }
  to   { transform: rotate3d(0, 1, 0, 360deg) scale(.75) }
`;

export const Coin = styled(Icon.Coin)`
  animation: ${rotating} 0.5s linear infinite;
`;

export const Container = styled.div`
  position: relative;
`;

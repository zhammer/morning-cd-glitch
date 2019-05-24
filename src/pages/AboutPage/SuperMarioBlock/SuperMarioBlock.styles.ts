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

const cycleFlower = keyframes`
  0%  { visibility: hidden; }
  25% { visibility: hidden; }
  50% { visibility: hidden; }
  75% { visibility: hidden; }
`;

interface FireFlowerProps {
  activated: boolean;
}

export const FireFlowerContainer = styled.div<FireFlowerProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;

  transition: transform 0.5s linear;
  transform: translateY(${props => (props.activated ? '-100%' : '0')});
  visibility: ${props => (props.activated ? 'visible' : 'hidden')};

  & > *:nth-child(1) {
    animation: ${cycleFlower} 0.4s steps(4, start) 0s infinite both;
  }
  & > *:nth-child(2) {
    transform: translateY(-2em);
    animation: ${cycleFlower} 0.4s steps(4, start) 0.1s infinite both;
  }
  & > *:nth-child(3) {
    transform: translateY(-4em);
    animation: ${cycleFlower} 0.4s steps(4, start) 0.2s infinite both;
  }
  & > *:nth-child(4) {
    transform: translateY(-6em);
    animation: ${cycleFlower} 0.4s steps(4, start) 0.3s infinite both;
  }
`;

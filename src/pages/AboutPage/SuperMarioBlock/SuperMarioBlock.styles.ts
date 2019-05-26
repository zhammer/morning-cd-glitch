import Icon from '../../../components/Icon';
import styled, { keyframes, css } from '../../../custom/styled-components';
import { cursorClickUrl } from '../../../styles/variables';

const zIndexes = {
  block: 75,
  flower: 50,
  coin: 25
};

interface BrickBlockProps {
  bumping: boolean;
}

const bump = keyframes`
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

export const DoneBlock = styled(Icon.DoneBlock)`
  position: absolute;
  z-index: ${zIndexes.block};
`;

export const BrickBlock = styled(Icon.BrickBlock)<BrickBlockProps>`
  position: absolute;
  z-index: ${zIndexes.block};
  ${props =>
    props.bumping &&
    css`
      animation: ${bump} 0.25s linear;
    `}
    cursor: url(${cursorClickUrl}), pointer;
`;

const spriteAnimation = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-400%); }
`;

const riseAndFall = keyframes`
  0%   { transform: translateY(0); visibility: hidden; }
  50%  { transform: translateY(-75px); visibility: visible; }
  100% { transform: translateY(0); visibility: hidden; }
`;

export const CoinContainer = styled.div`
  animation: ${riseAndFall} 1.5s linear both;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 2em;
  overflow: hidden;
  z-index: ${zIndexes.coin};

  & > * {
    animation: ${spriteAnimation} 0.35s steps(4) infinite;
  }
`;

export const Container = styled.div`
  position: relative;
`;

interface FireFlowerProps {
  activated: boolean;
}

export const FireFlowerContainer = styled.div<FireFlowerProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  height: 2em;
  overflow: hidden;
  z-index: ${zIndexes.flower};

  transition: transform 0.5s linear;
  transform: translateY(${props => (props.activated ? '-100%' : '0')});
  visibility: ${props => (props.activated ? 'visible' : 'hidden')};

  & > * {
    animation: ${spriteAnimation} 0.35s steps(4) infinite;
  }
`;

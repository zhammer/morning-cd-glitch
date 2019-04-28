import styled from '../../custom/styled-components';

const Primary = styled.span`
  color: ${props => props.theme.primary.normal};
`;

const Success = styled.span`
  color: ${props => props.theme.success.normal};
`;

const Warning = styled.span`
  color: ${props => props.theme.warning.normal};
`;

const Error = styled.span`
  color: ${props => props.theme.error.normal};
`;

const Disabled = styled.span`
  color: ${props => props.theme.disabled.normal};
`;

export default {
  Primary,
  Success,
  Warning,
  Error,
  Disabled
};

import styled from '../../custom/styled-components';

const Primary = styled.span.attrs({ 'data-test': 'text-primary' })`
  color: ${props => props.theme.primary.normal};
`;

const Success = styled.span.attrs({ 'data-test': 'text-success' })`
  color: ${props => props.theme.success.normal};
`;

const Warning = styled.span.attrs({ 'data-test': 'text-warning' })`
  color: ${props => props.theme.warning.normal};
`;

const Error = styled.span.attrs({ 'data-test': 'text-error' })`
  color: ${props => props.theme.error.normal};
`;

const Disabled = styled.span.attrs({ 'data-test': 'text-disabled' })`
  color: ${props => props.theme.disabled.normal};
`;

export default {
  Primary,
  Success,
  Warning,
  Error,
  Disabled
};

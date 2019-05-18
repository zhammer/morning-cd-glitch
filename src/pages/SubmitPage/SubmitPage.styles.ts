import styled from '../../custom/styled-components';
import Container from '../../components/Container';
import Text from '../../components/Text';

export const InputContainer = styled.div`
  display: flex;
`;

export const FormContainer = styled(Container.Square)`
  & > div {
    margin-top: 1em;
  }
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ErrorNote = styled(Text.Error)`
  display: block;
  text-align: right;
  margin-top: 4px;
`;

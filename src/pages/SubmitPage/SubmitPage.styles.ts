import styled from '../../custom/styled-components';
import Container from '../../components/Container';

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

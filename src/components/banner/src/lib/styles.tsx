import styled from 'styled-components';

export const StyledFunding = styled.div``;

export const StyledArticle = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-size: 20px;
`;

export const StyledImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const StyledDescription = styled.span`
  color: rgba(221, 214, 214);
  @media screen and (max-width: 999px) {
    display: none;
  }
`;

export const StyledTimestamp = styled.span`
  margin-left: auto;
  color: rgba(221, 214, 214);
`;

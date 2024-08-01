import { FC } from 'react';
import { StyledArticle } from './styles';

export const Disclaimer: FC = () => {
  return (
    <StyledArticle>
      All information entered on this website is processed entirely on your
      device. No data is sent to external servers or stored remotely. All
      content generation occurs locally, ensuring your privacy and data
      security.
    </StyledArticle>
  );
};

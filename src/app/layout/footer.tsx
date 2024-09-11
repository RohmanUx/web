import React from 'react';
import { Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const BlurBackground = styled ('div') (({ theme }) => ({
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(80px)',
  padding: theme.spacing(1),
}));

const Footer: React.FC = () => {
  return (
    <BlurBackground>
      <Container maxWidth='xl' className="px-4 sm:px-6 lg:px-24 w-">
        <footer className="flex flex-col sm:flex-row items-center justify-between py-1 ">
          <Typography variant="body2" className="text-gray-100 text-center sm:text-left">
            © 2024 Luno Event, Inc. All rights reserved.
          </Typography>

          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 sm:mt-0">
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="#" variant="body2" underline="hover" className="text-gray-100">
                Terms of Service
              </Link>
              <Link href="#" variant="body2" underline="hover" className="text-gray-100">
                Privacy
              </Link>
            </div>
          </nav>
        </footer>
      </Container>
    </BlurBackground>
  );
};

export default Footer;

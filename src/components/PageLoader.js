// material-ui
import { styled } from '@mui/material/styles';
import { Triangle } from 'react-loader-spinner';

// PageLoader style
const PageLoaderWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh'
}));

// ==============================|| PageLoader ||============================== //

const PageLoader = () => (
  <PageLoaderWrapper>
    <Triangle visible={true} height="80" width="80" color="#1677ff" ariaLabel="triangle-loading" wrapperStyle={{}} wrapperClass="" />
  </PageLoaderWrapper>
);

export default PageLoader;

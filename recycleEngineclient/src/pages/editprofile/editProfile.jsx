import { Header } from 'components/headers/profileHeader';
import tw from 'twin.macro';
import { Side } from 'components/Sidebar';
import Footer from 'components/footers/FiveColumnDark';
import InformationForm from 'components/forms/editInformations';
import AddressForm from 'components/forms/editAddress';
import 'react-phone-number-input/style.css';

import './editprofile.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
// const Container = tw.div`flex flex-row p-4  relative`;
const style = { marginTop: '38px' };
// const SideBar = tw.div`w-1/4 p-4`;
// const FormContainer = tw.div`w-3/4 p-4`;
const Container = tw.div`flex flex-row items-center justify-center p-4 relative`;
const SideBar = tw.div`flex-shrink-0 w-48`;
const FormContainer = tw.div`flex-1 ml-4`;
const styleForm = { marginLeft: '15%' };
const EditProfile = () => {
  return (
    <div>
      <div className="navbar">
        {' '}
        <Header />
      </div>

      <Container style={style}>
        <SideBar>
          <Side />
        </SideBar>
        <FormContainer style={styleForm}>
          {' '}
          <Outlet />
        </FormContainer>
      </Container>

      <Footer />
    </div>
  );
};
export default EditProfile;
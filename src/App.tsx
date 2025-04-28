import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Tools from './pages/tools/Partner';
import AddTool from './pages/tools/AddPartner';
import Category from './pages/category/Category'
import AddCategory from './pages/category/AddCategory';
import UpdateTool from './pages/tools/UpdatePartner';
import UpdateCategory from './pages/category/UpdateCategory';
import Partner from './pages/partners/Partners';
import UpdatePartners from './pages/partners/UpdatePartners';
import AddPartner from './pages/partners/AddPartner';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
            <Toaster richColors position="bottom-right" />

      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | Convex-Ai Admin - Admin Dashboard " />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Convex-Ai Admin | Convex-Ai Admin -  Admin Dashboard " />
              <Tools />
            </>
          }
        />
        <Route
          path="/partners"
          element={
            <>
              <PageTitle title="Convex-Ai Admin | Convex-Ai Admin -  Admin Dashboard " />
              <Partner />
            </>
          }
        />
        <Route
          path="/addTool"
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard " />
              <AddTool />
            </>
          }
        />
        <Route
          path="/addpartner"
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard " />
              <AddPartner />
            </>
          }
        />
        <Route
          path="/category"
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard" />
              <Category />
            </>
          }
        />
        <Route
          path="/addCategory"
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin -Admin Dashboard " />
              <AddCategory />
            </>
          }
        />
        <Route
          path="/category/edit/:id"
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard " />
              <UpdateCategory />
            </>
          }
        />
        <Route
          path="/user/edit/:id"
          element={
            <>
              <PageTitle title="Add User | Convex-Ai Admin -Admin Dashboard " />
              <UpdateTool />
            </>
          }
        />
        <Route
          path="/partner/edit/:id"
          element={
            <>
              <PageTitle title="Add User | Convex-Ai Admin -Admin Dashboard " />
              <UpdatePartners />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Convex-Ai Admin - Admin Dashboard " />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Convex-Ai Admin - Admin Dashboard " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Convex-Ai Admin - Admin Dashboard " />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Convex-Ai Admin - Admin Dashboard " />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Convex-Ai Admin - Admin Dashboard " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Convex-Ai Admin - Admin Dashboard " />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Convex-Ai Admin - Admin Dashboard " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Convex-Ai Admin - Admin Dashboard " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Convex-Ai Admin - vAdmin Dashboard " />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;

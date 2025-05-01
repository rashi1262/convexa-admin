import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
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
import Tools from './pages/tools/User';
import AddTool from './pages/tools/AddUser';
import Category from './pages/category/Category';
import AddCategory from './pages/category/AddCategory';
import UpdateTool from './pages/tools/UpdateUser';
import UpdateCategory from './pages/category/UpdateCategory';
import Partner from './pages/partners/Partners';
import UpdatePartners from './pages/partners/UpdatePartners';
import AddPartner from './pages/partners/AddPartner';
import { AuthProvider, useAuth } from './common/ProtectedRoutes';  // Import the AuthProvider
import RoleBasedRoute from './common/RoleBasedRoute';
import Store from './pages/partnerpages/Store';
import Agents from './pages/partnerpages/Agents';
import AddClientForm from './pages/partnerpages/AddClient';
import CreateAgentPage from './pages/partnerpages/CreateAgentPage';
import EditClientForm from './pages/partnerpages/EditClientForm';
import AgentDetail from './pages/partnerpages/AgentDetail';

function App() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();  // Access authentication state from the context
  const [loading, setLoading] = useState<boolean>(true);
console.log(isAuthenticated,"isAuthenticatedisAuthenticated");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/auth/signin" replace />} />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Convex-Ai Admin - Admin Dashboard" />
              <SignIn />
            </>
          }
        />
      </Routes>
    );
  }

  return (
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
            <RoleBasedRoute
              allowedRoles={['admin']}
              element={
                <>
                  <PageTitle title="Convex-Ai Admin | Users" />
                  <Tools />
                </>
              }
            />
          }
        />
        <Route
          path="/partners"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Convex-Ai Admin | Convex-Ai Admin -  Admin Dashboard " />
              <Partner />
            </>
          }
          />}
        />
        <Route
          path="/addTool"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard " />
              <AddTool />
            </>
          }
          />}
        />
        <Route
          path="/addpartner"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard " />
              <AddPartner />
            </>
          }
          />}
        />
        <Route
          path="/category"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard" />
              <Category />
            </>
          }
          />}
        />
        <Route
          path="/addCategory"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin -Admin Dashboard " />
              <AddCategory />
            </>
          }
          />}
        />
        <Route
          path="/category/edit/:id"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Add Tools | Convex-Ai Admin - Admin Dashboard " />
              <UpdateCategory />
            </>
          }
          />}
        />
        <Route
          path="/user/edit/:id"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Add User | Convex-Ai Admin -Admin Dashboard " />
              <UpdateTool />
            </>
          }
          />}
        />
        <Route
          path="/partner/edit/:id"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Add User | Convex-Ai Admin -Admin Dashboard " />
              <UpdatePartners />
            </>
          }
          />}
        />
        <Route
          path="/profile"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Profile | Convex-Ai Admin - Admin Dashboard " />
              <Profile />
            </>
          }
          />}
        />
        <Route
          path="/forms/form-elements"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Form Elements | Convex-Ai Admin - Admin Dashboard " />
              <FormElements />
            </>
          }
          />}
        />
        <Route
          path="/forms/form-layout"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Form Layout | Convex-Ai Admin - Admin Dashboard " />
              <FormLayout />
            </>
          }
          />}
        />
        <Route
          path="/tables"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Tables | Convex-Ai Admin - Admin Dashboard " />
              <Tables />
            </>
          }
          />}
        />
        <Route
          path="/settings"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Settings | Convex-Ai Admin - Admin Dashboard " />
              <Settings />
            </>
          }
          />}
        />
        <Route
          path="/chart"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Basic Chart | Convex-Ai Admin - Admin Dashboard " />
              <Chart />
            </>
          }
          />}
        />
        <Route
          path="/ui/alerts"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Alerts | Convex-Ai Admin - Admin Dashboard " />
              <Alerts />
            </>
          }
          />}
        />
        <Route
          path="/ui/buttons"
          element={
            <RoleBasedRoute
              allowedRoles={['admin']}
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <Buttons />
            </>
          }
          />}
        />
        <Route
          path="/store"
          element={
            <RoleBasedRoute
              allowedRoles={['partner']}
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <Store />
            </>
          }
          />}
        />
        <Route
          path="/agents"
          element={
            <RoleBasedRoute
              allowedRoles={['partner']}
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <Agents />
            </>
          }
          />}
        />
        <Route
          path="/addclient"
          element={
            <RoleBasedRoute
              allowedRoles={['partner']}
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <AddClientForm />
            </>
          }
          />}
        />
        <Route
          path="/create-agent"
          element={
            <RoleBasedRoute
              allowedRoles={['partner']}
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <CreateAgentPage />
            </>
          }
          />}
        />
        <Route
          path="/edit/:id"
          element={
            <RoleBasedRoute
              allowedRoles={['partner']}
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <EditClientForm />
            </>
          }
          />}
        />
        <Route
          path="/agentdetail/:id"
          element={
            <RoleBasedRoute
              allowedRoles={['partner']}
          element={
            <>
              <PageTitle title="Buttons | Convex-Ai Admin - Admin Dashboard " />
              <AgentDetail />
            </>
          }
          />}
        />
      </Routes>

    </DefaultLayout>
  );
}

const AppWrapper = () => (
  <AuthProvider>  {/* Wrap the whole application with AuthProvider */}
    <App />
  </AuthProvider>
);

export default AppWrapper;

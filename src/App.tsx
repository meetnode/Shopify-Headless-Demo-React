import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { checkoutAction, searchAction } from "./actions/index";
import client from "./config/storefront";
import { GET_HOMEPAGE_BANNER } from "./constants/homepageQuery";
import {
  Cart,
  Checkout,
  HomeLayout,
  Landing,
  Login,
  OrderConfirmation,
  OrderHistory,
  Register,
  Search,
  Shop,
  SingleOrderHistory,
  SingleProduct,
  UserProfile,
} from "./pages";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";
import { loader as orderHistoryLoader } from "./pages/OrderHistory";
import { shopCategoryLoader } from "./pages/Shop";
import { loader as singleOrderLoader } from "./pages/SingleOrderHistory";
import "./utils/i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:category",
        element: <Shop />,
        loader: shopCategoryLoader,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        action: checkoutAction,
      },
      {
        path: "search",
        action: searchAction,
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
        loader: orderHistoryLoader,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "order-history/:id",
        element: <SingleOrderHistory />,
        loader: singleOrderLoader,
      },
      {
        path: "/error-page",
        element: <ErrorPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;

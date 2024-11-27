import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Details from "./pages/ItemDetails";
import Collection from "./pages/Collection";
import ListNFT from "./pages/ListNFT/ListNFT";
import { RouteObject } from "react-router-dom";
import NotFound from "./pages/404";
import { Mint } from "./components/MintNFT";
import { OwnerProfile } from "./pages/OwnerProfile";
import Pool from './pages/Pool/Pool'
import CreatePool from "./pages/CreatePool/CreatePool";
import Step2 from "./pages/CreatePool/Step2";
import Step3 from "./pages/CreatePool/Step3";
import { CreateCollection } from "./pages/CreateCollection/CreateCollection";
import { Launchpad } from "./pages/Launchpad";
import { LaunchpadAdmin } from "./pages/Launchpad/LaunchpadAdmin";
import BatchUpload from "./pages/BatchUpload";
import { WhiteList } from "./pages/WhiteList";
import AllPhotos from "./pages/AllPhotos";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/explore",
        element: <Explore />,
    },
    {
        path: "/details",
        element: <Details />,
    },
    {
        path: "/item-details/:listingId/object/:objectId",
        element: <Details />
    },
    {
        path: "/collection/:id",
        element: <Collection />,
    },
    {
        path: "/create-collection",
        element: <CreateCollection />,
    },
    {
        path: "/listnft",
        element: <ListNFT />,
    },
    {
        path: "/createPool",
        element: <CreatePool />,
    },
    {
        path: "/step2",
        element: <Step2 />,
    },
    {
        path: "/step3",
        element: <Step3 />,
    },
    {
        path: "/Pool",
        element: <Pool />,
    },
    {
        path: "/me",
        element: <OwnerProfile />,
    },
    {
        path: "/mint",
        element: <Mint />,
    },
    {
        path: "/launchpad/:id",
        element: <Launchpad />,
    },
    {
        path: "/launchpad-admin",
        element: <LaunchpadAdmin />,
    },
    {
        path: "/batchUpload",
        element: <BatchUpload />
    },
    {
        path: "whitelist/:id",
        element: <WhiteList />,
    },
    {
        path: "allPhotos",
        element: <AllPhotos />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]

// @ts-ignore
export default routes;
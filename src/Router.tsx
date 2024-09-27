import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Sample from "./pages/Sample";
import JobPostForm from "./components/layouts/JobPostForm";
import JobSearch from "./components/layouts/JobSearch";
import JobSearchForm from "./components/layouts/JobSearchForm";
import VoiceflowWidget from "./components/layouts/VoiceFlow";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
    },
    {
      path: "/jobsearch",
      element: <JobSearch />,
    },
    {
      path: "/jobpostform",
      element: <JobPostForm />,
    },
    {
      path: "/jobsearchform",
      element: <JobSearchForm />,
    },
    {
      path: "/voiceflow",
      element: <VoiceflowWidget />,
    },
  ],
  {
    basename: global.basename,
  }
);

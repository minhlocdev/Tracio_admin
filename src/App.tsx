import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "./components/hoc/ErrorBoundary";
import AppConfigProvider from "./components/hoc/AppConfigProvider";
import { useDarkModeStore } from "./store/useDarkModeStore";
import { useThemeColorStore } from "./store/useThemeColorStore";
import RoutesHolder from "./components/hoc/RoutesHolder";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { isDarkMode } = useDarkModeStore();
  const loadColors = useThemeColorStore((state) => state.loadColors);

  useEffect(() => {
    loadColors();
  }, [loadColors]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router>
        <ErrorBoundary>
          <AppConfigProvider isDarkMode={isDarkMode}>
            <RoutesHolder />
          </AppConfigProvider>
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

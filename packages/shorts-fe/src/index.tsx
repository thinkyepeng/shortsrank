import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import store from './stores';
import Layout from './layouts';
import GlobalLayout from './layouts/global';
import './utils/axios';
import './assets/main.css';

const HomePage = lazy(() => import('./views/index'));
const CategoryPage = lazy(() => import('./views/category'));
const SearchPage = lazy(() => import('./views/search'));
const PlayerPage = lazy(() => import('./views/player'));
const UserCenterPage = lazy(() => import('./views/user-center'));
const PaymentPage = lazy(() => import('./views/payment'));
const loading = <div />;

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalLayout />}>
            <Route path="" element={<Layout />}>
              <Route path="" index element={<Suspense fallback={loading}><HomePage /></Suspense>} />
              <Route path="category" element={<Suspense fallback={loading}><CategoryPage /></Suspense>} />
              <Route path="search" element={<Suspense fallback={loading}><SearchPage /></Suspense>} />
              <Route path="user-center" element={<Suspense fallback={loading}><UserCenterPage /></Suspense>} />
              <Route path="payment" element={<Suspense fallback={loading}><PaymentPage /></Suspense>} />
            </Route>
            <Route path="player" element={<Suspense fallback={loading}><PlayerPage /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
);

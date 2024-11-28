import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { lazy, Suspense } from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import store from './stores';
import Layout from './layouts';
import './utils/axios';
import './assets/main.css';

const HomePage = lazy(() => import('./views/index'));
const LoginPage = lazy(() => import('./views/login'));
const OrderPage = lazy(() => import('./views/order'));
const UserPage = lazy(() => import('./views/user'));
const PlayletPage = lazy(() => import('./views/playlet'));
const CategoryPage = lazy(() => import('./views/category'));
const VideoPage = lazy(() => import('./views/video'));
const ProductPage = lazy(() => import('./views/product'));
const BannerPage = lazy(() => import('./views/banner'));
const LogPage = lazy(() => import('./views/log'));
const loading = <div />;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" index element={<Suspense fallback={loading}><HomePage /></Suspense>} />
            <Route path="user" element={<Suspense fallback={loading}><UserPage /></Suspense>} />
            <Route path="category" element={<Suspense fallback={loading}><CategoryPage /></Suspense>} />
            <Route path="playlet" element={<Suspense fallback={loading}><PlayletPage /></Suspense>} />
            <Route path="video" element={<Suspense fallback={loading}><VideoPage /></Suspense>} />
            <Route path="order" element={<Suspense fallback={loading}><OrderPage /></Suspense>} />
            <Route path="product" element={<Suspense fallback={loading}><ProductPage /></Suspense>} />
            <Route path="banner" element={<Suspense fallback={loading}><BannerPage /></Suspense>} />
            <Route path="log" element={<Suspense fallback={loading}><LogPage /></Suspense>} />
          </Route>
          <Route path="/login" element={<Suspense fallback={loading}><LoginPage /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>,
);

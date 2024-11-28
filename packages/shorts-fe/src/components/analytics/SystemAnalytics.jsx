import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { init } from '@/plugins/analytics';

export default function SystemAnalytics() {
  const initRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const { referrer } = document;
    const url = window.location.href;
    if (!initRef.current) {
      (function (i, s, r) {
        i.RunJSAnalyticsObject = r;
        i[r] = i[r] || function (...args) {
          (i[r].q = i[r].q || []).push(args);
        };
        i[r].l = 1 * new Date();
      }(window, document, 'ra'));
      init(window, 'ra');
      initRef.current = true;
    }
    window.ra('send', 'pageview', url, referrer);
  }, [location]);
  return null;
}

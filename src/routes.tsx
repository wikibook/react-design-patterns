import type { ComponentType } from 'react';
import { createBrowserRouter, Link, Outlet } from 'react-router';

import type { ExampleMeta } from './example-manifest';

type RouteEntry = {
  path: string;
  label: string;
  load: () => Promise<ComponentType | { default: ComponentType }>;
};

function getComponent(
  loaded: ComponentType | { default: ComponentType },
): ComponentType {
  if (typeof loaded === 'function') {
    return loaded;
  }

  return loaded.default;
}

const routes: Array<RouteEntry> = [
  { path: '1/1', label: '1.1', load: () => import('./pages/1/1') },
  { path: '1/2', label: '1.2', load: () => import('./pages/1/2') },
  { path: '1/3', label: '1.3', load: () => import('./pages/1/3') },
  { path: '1/4', label: '1.4', load: () => import('./pages/1/4') },
  { path: '1/7', label: '1.7', load: () => import('./pages/1/7') },
  { path: '1/11', label: '1.11', load: () => import('./pages/1/11') },
  { path: '1/12', label: '1.12', load: () => import('./pages/1/12') },
  { path: '1/13', label: '1.13', load: () => import('./pages/1/13') },
  { path: '1/14', label: '1.14', load: () => import('./pages/1/14') },
  { path: '1/15', label: '1.15', load: () => import('./pages/1/15') },
  { path: '1/18', label: '1.18', load: () => import('./pages/1/18') },
  { path: '1/23', label: '1.23', load: () => import('./pages/1/23') },
  { path: '1/29', label: '1.29', load: () => import('./pages/1/29') },
  { path: '1/30', label: '1.30', load: () => import('./pages/1/30') },
  { path: '1/35', label: '1.35', load: () => import('./pages/1/35') },
  { path: '1/37', label: '1.37', load: () => import('./pages/1/37') },
  {
    path: '2/8',
    label: '2.8',
    load: () => import('./pages/2/8').then(({ SignUpForm }) => SignUpForm),
  },
  {
    path: '2/10',
    label: '2.10',
    load: () => import('./pages/2/10').then(({ SignUpForm }) => SignUpForm),
  },
  {
    path: '2/11',
    label: '2.11',
    load: () => import('./pages/2/11').then(({ SignUpForm }) => SignUpForm),
  },
  { path: '2/13', label: '2.13', load: () => import('./pages/2/13') },
  { path: '2/15', label: '2.15', load: () => import('./pages/2/15') },
  { path: '2/16', label: '2.16', load: () => import('./pages/2/16') },
  { path: '2/17', label: '2.17', load: () => import('./pages/2/17') },
  { path: '2/18', label: '2.18', load: () => import('./pages/2/18') },
  { path: '2/21', label: '2.21', load: () => import('./pages/2/21') },
  { path: '2/22', label: '2.22', load: () => import('./pages/2/22') },
  { path: '2/23', label: '2.23', load: () => import('./pages/2/23') },
  { path: '2/29', label: '2.29', load: () => import('./pages/2/29') },
  { path: '2/31', label: '2.31', load: () => import('./pages/2/31') },
  { path: '3/10', label: '3.10', load: () => import('./pages/3/10') },
  {
    path: '3/11',
    label: '3.11',
    load: () =>
      import('./pages/3/11').then(({ AnchorAsButton }) => AnchorAsButton),
  },
  {
    path: '3/16',
    label: '3.16',
    load: () => import('./pages/3/16').then(({ BasicButton }) => BasicButton),
  },
  {
    path: '3/17',
    label: '3.17',
    load: () =>
      import('./pages/3/17').then(({ AnchorAsButton }) => AnchorAsButton),
  },
  { path: '3/20', label: '3.20', load: () => import('./pages/3/20') },
  { path: '3/22', label: '3.22', load: () => import('./pages/3/22') },
  { path: '3/25', label: '3.25', load: () => import('./pages/3/25') },
  { path: '3/26', label: '3.26', load: () => import('./pages/3/26') },
  { path: '3/27', label: '3.27', load: () => import('./pages/3/27') },
  { path: '3/28', label: '3.28', load: () => import('./pages/3/28') },
  { path: '3/30', label: '3.30', load: () => import('./pages/3/30') },
  {
    path: '3/32',
    label: '3.32',
    load: () => import('./pages/3/32').then(({ DialogModal }) => DialogModal),
  },
  { path: '3/33', label: '3.33', load: () => import('./pages/3/33') },
  { path: '3/34', label: '3.34', load: () => import('./pages/3/34') },
  { path: '3/35', label: '3.35', load: () => import('./pages/3/35') },
  { path: '3/41', label: '3.41', load: () => import('./pages/3/41') },
  { path: '3/42', label: '3.42', load: () => import('./pages/3/42') },
  { path: '3/46', label: '3.46', load: () => import('./pages/3/46') },
  { path: '3/47', label: '3.47', load: () => import('./pages/3/47') },
  {
    path: '3/48',
    label: '3.48',
    load: () => import('./pages/3/48').then(({ UserList }) => UserList),
  },
  { path: '3/59', label: '3.59', load: () => import('./pages/3/59') },
  { path: '4/1', label: '4.1', load: () => import('./pages/4/1') },
  { path: '4/2', label: '4.2', load: () => import('./pages/4/2') },
  { path: '4/3', label: '4.3', load: () => import('./pages/4/3') },
  { path: '4/4', label: '4.4', load: () => import('./pages/4/4') },
  { path: '4/5', label: '4.5', load: () => import('./pages/4/5') },
  { path: '4/35', label: '4.35', load: () => import('./pages/4/35') },
  { path: '4/45', label: '4.45', load: () => import('./pages/4/45') },
  { path: '5/31', label: '5.31', load: () => import('./pages/5/31') },
  { path: '6/3', label: '6.3', load: () => import('./pages/6/3') },
  { path: '6/4', label: '6.4', load: () => import('./pages/6/4') },
  { path: '6/8', label: '6.8', load: () => import('./pages/6/8') },
  { path: '6/9', label: '6.9', load: () => import('./pages/6/9') },
  { path: '6/19', label: '6.19', load: () => import('./pages/6/19') },
  { path: '6/21', label: '6.21', load: () => import('./pages/6/21') },
  { path: '6/22', label: '6.22', load: () => import('./pages/6/22') },
  { path: '6/23', label: '6.23', load: () => import('./pages/6/23') },
  { path: '6/25', label: '6.25', load: () => import('./pages/6/25') },
  { path: '6/31', label: '6.31', load: () => import('./pages/6/31') },
  { path: '6/36', label: '6.36', load: () => import('./pages/6/36') },
  { path: '6/37', label: '6.37', load: () => import('./pages/6/37') },
  { path: '6/38', label: '6.38', load: () => import('./pages/6/38') },
  { path: '6/39', label: '6.39', load: () => import('./pages/6/39') },
  { path: '6/40', label: '6.40', load: () => import('./pages/6/40') },
  { path: '6/41', label: '6.41', load: () => import('./pages/6/41') },
  { path: '6/42', label: '6.42', load: () => import('./pages/6/42') },
  { path: '6/43', label: '6.43', load: () => import('./pages/6/43') },
  { path: '6/44', label: '6.44', load: () => import('./pages/6/44') },
  {
    path: '6/45',
    label: '6.45',
    load: () => import('./pages/6/45'),
  },
  {
    path: '6/46',
    label: '6.46',
    load: () => import('./pages/6/46'),
  },
  { path: '6/48', label: '6.48', load: () => import('./pages/6/48') },
  { path: '6/49', label: '6.49', load: () => import('./pages/6/49') },
  { path: '6/50', label: '6.50', load: () => import('./pages/6/50') },
  { path: '6/51', label: '6.51', load: () => import('./pages/6/51') },
  { path: '6/52', label: '6.52', load: () => import('./pages/6/52') },
  { path: '6/53', label: '6.53', load: () => import('./pages/6/53') },
  { path: '6/54', label: '6.54', load: () => import('./pages/6/54') },
  { path: '6/55', label: '6.55', load: () => import('./pages/6/55') },
  { path: '6/56', label: '6.56', load: () => import('./pages/6/56') },
  {
    path: '6/57',
    label: '6.57',
    load: () => import('./pages/6/57'),
  },
  {
    path: '7/38',
    label: '7.38',
    load: () => import('./pages/7/38'),
  },
  {
    path: '7/39',
    label: '7.39',
    load: () => import('./pages/7/39'),
  },
  {
    path: '7/40',
    label: '7.40',
    load: () => import('./pages/7/40'),
  },
];

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="home-link" to="/">
          Modern React Design Pattern Examples
        </Link>
        <p>책의 예제를 실제 Vite + React 환경에서 검증합니다.</p>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function ExampleFrame({
  Component,
  example,
}: {
  Component: ComponentType;
  example: ExampleMeta;
}) {
  return (
    <section className="example-page">
      <div className="example-page__meta">
        <Link to="/">← 전체 예제</Link>
        <span>
          예제 {example.id} · {example.comparisonLabel}
        </span>
        <h1>{example.title}</h1>
        <p>{example.reason}</p>
        {example.changes.length > 0 && (
          <ul>
            {example.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="example-page__demo">
        <Component />
      </div>
    </section>
  );
}

const pageRoutes = routes.map((route) => ({
  path: route.path,
  lazy: async () => {
    const [loaded, { exampleManifest }] = await Promise.all([
      route.load(),
      import('./example-manifest'),
    ]);
    const Component = getComponent(loaded);
    const example = exampleManifest.find(
      (candidate) => candidate.route === `/${route.path}`,
    );

    if (!example) {
      throw new Error(`예제 메타데이터를 찾을 수 없습니다: ${route.label}`);
    }

    return {
      Component: () => <ExampleFrame Component={Component} example={example} />,
    };
  },
}));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        lazy: async () => {
          const { ExampleCatalog } = await import('./ExampleCatalog');
          return { Component: ExampleCatalog };
        },
      },
      ...pageRoutes,
    ],
  },
]);

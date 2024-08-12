import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, of, withLatestFrom } from 'rxjs';
import { provideUrlConfigResolver } from '../components/data-view';
import { Route } from '@angular/router';
import { HRefType, HeaderLinks, Link } from '../components/header-links';
import { tokenCanAny } from '../login/core';
import { AUTH_SERVICE } from '../login';

/**
 * Creates Application routes using the link configuration
 */
export function createAppRoutes(links: HeaderLinks) {
  const routes: Route[] = [];
  const _hrefToPath = (
    _href: HRefType
  ) => {
    return typeof _href === 'function'
      ? _href
      : _href.startsWith('/')
      ? _href.substring(1)
      : _href;
  };

  const _routes$ = (_links: HeaderLinks, _parentHref: string) => {
    for (const _link of _links) {
      const { routeConfig, href, scopes } = _link;
      let _href = _hrefToPath(href);
      if (routeConfig && typeof _href === 'string') {
        const _routeRef = _href as string;
        const { path, data, resolve } = routeConfig;
        _href = path ?? _hrefToPath(href);

        if (!_routeRef.startsWith('/')) {
          _parentHref = _parentHref.endsWith('/')
            ? _parentHref.substring(0, _parentHref.length - 1)
            : _parentHref;
          _href = `${_parentHref}/${_href}`;
        }

        const _data = data ?? {};
        const _resolve = resolve ?? {};

        routes.push(
          routeConfig.implicit === true
            ? {
                ...routeConfig,
                path: _routeRef.startsWith('/')
                  ? _routeRef.substring(1)
                  : _routeRef,
                data: { ..._data, scopes: scopes },
                loadChildren: () => import('../components/data-view/routes'),
                resolve: { ..._resolve, config: provideUrlConfigResolver() },
              }
            : {
                ...routeConfig,
                path: _routeRef.startsWith('/')
                  ? _routeRef.substring(1)
                  : _routeRef,
                data: { ..._data, scopes: scopes },
              }
        );
      } else if (typeof _href === 'string') {
        if (!_href.startsWith('/')) {
          _parentHref = _parentHref.endsWith('/')
            ? _parentHref.substring(0, _parentHref.length - 1)
            : _parentHref;
          _href = `${_parentHref}/${_href}`;
        }
      }

      if (
        (_link as { links: HeaderLinks })['links'] &&
        typeof _href === 'string'
      ) {
        _routes$((_link as { links: HeaderLinks })['links'], _href);
      }
    }

    return routes;
  };

  const result = Array.from(new Set(_routes$(links, '/')));

  return result;
}

/**
 * Provides the topbar links observable
 */
export function headerLinks(links: HeaderLinks, useAuth: boolean = true) {
  return (injector: Injector) => {
    // First we resolve all link labels to be translated
    const labels: string[] = [];
    const _translations = (_links: HeaderLinks) => {
      for (const _link of _links) {
        labels.push(_link.label);
        if ((_link as { links: HeaderLinks })['links']) {
          _translations((_link as { links: HeaderLinks })['links']);
        }
      }
      return labels;
    };

    const translations$ = injector
      .get(TranslateService)
      .get(Array.from(new Set(_translations(links))));

    // Check if implementation below can be moved to app module
    const tokenCan$ = useAuth
      ? injector.get(AUTH_SERVICE).signInState$.pipe(
          map((state) => state?.scopes),
          map((scopes) => (_scopes: string[]) => {
            return _scopes.length === 0
              ? true
              : tokenCanAny({ scopes: scopes ?? [] }, ..._scopes);
          })
        )
      : of(() => true);

    // Returns the translation value
    return translations$.pipe(
      withLatestFrom(tokenCan$),
      map(([values, _scopeFn]) => {
        // Then we rebuild the link dimension with the translated labels
        const _rewriteLinks = (params: HeaderLinks, _baseHref: string) => {
          const _links: Link[] = [];
          for (const _link of params) {
            // Case user cannot handle a given scope, we proceed to next link in the iteration
            if (!_scopeFn(_link.scopes ?? [])) {
              continue;
            }
            const { scopes, href, ..._l } = _link;
            // memoize href into _href variable
            let _href = href;

            if (typeof href === 'string' && !href.startsWith('/')) {
              _baseHref = _baseHref.endsWith('/')
                ? _baseHref.substring(0, _baseHref.length - 1)
                : _baseHref;
              _href = `${_baseHref}/${href}`;
            }
            // Case _scopeFn returns true, we add the links to the
            if ((_l as { links: HeaderLinks })['links']) {
              _links.push({
                ..._l,
                href: _href,
                label: values[_l.label],
                links:
                  typeof _href === 'string'
                    ? _rewriteLinks(
                        (_l as { links: HeaderLinks })['links'],
                        _href
                      )
                    : (_l as { links: HeaderLinks })['links'],
              });
            } else {
              _links.push({ ..._l, href: _href, label: values[_l.label] });
            }
          }
          return _links;
        };
        const result = _rewriteLinks(links, '/');

        return result;
      })
    );
  };
}

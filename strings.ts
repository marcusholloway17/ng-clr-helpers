import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

/**
 * Provides data component common strings
 */
export function provideCommonStrings(injector: Injector) {
  return injector
    .get(TranslateService)
    .get([
      'app.actions.display',
      'app.actions.download',
      'app.actions.refresh',
      'app.actions.create',
      'app.actions.newRequest',
      'app.actions.update',
      'app.actions._update',
      'app.actions.delete',
      'app.actions.back',
      'app.actions.next',
      'app.actions.previous',
      'app.actions.detail',
      'app.actions.rightHolders',
      'app.actions.handle',
      'app.actions.submit',
      'app.actions.cancel',
      'app.actions.close',
      'app.actions.save',
      'app.actions.add',
      'app.actions.myAccount',
      'app.datagrid.loading',
      'app.datagrid.error',
      'app.datagrid.placeholder',
      'app.actions.logout',
      'app.prompt.logout',
      'app.prompt.delete',
      'app.strings.request-error',
      'app.strings.request-ok',
      'app.pages.membership.employer.insured.title',
      'app.pages.membership.employer.insured.description',
      'app.pages.membership.employer.insuredMembership.title',
      'app.pages.membership.employer.insuredMembership.description',
      'app.pages.membership.employer.insuredMembershipRequest.title',
      'app.pages.membership.employer.insuredMembershipRequest.description',
      'app.pages.membership.employer.insuredMembership.description',
      'app.pages.membership.employer.insuredMembershipRequestEdit.title',
      'app.pages.membership.employer.insuredMembershipRequestEdit.description',
      'app.components.authState.welcomeTitle',
      'app.components.authState.loginActivityHint',
      'app.components.authState.role.employer',
      'app.components.authState.role.insured',
      // TODO: Add modules actions
    ])
    .pipe(
      map((values) => ({
        // TODO: Add modules common strings
        // example: {
        //   name: values['app.modules.examples.title'],
        //   title: values['app.modules.examples.title'],
        //   description: values['app.modules.examples.description'],
        // },
        display: values['app.actions.display'],
        refresh: values['app.actions.refresh'],
        create: values['app.actions.create'],
        newRequest: values['app.actions.newRequest'],
        update: values['app.actions.update'],
        _update: values['app.actions._update'],
        delete: values['app.actions.delete'],
        submit: values['app.actions.submit'],
        cancel: values['app.actions.cancel'],
        close: values['app.actions.close'],
        save: values['app.actions.save'],
        add: values['app.actions.add'],
        back: values['app.actions.back'],
        next: values['app.actions.next'],
        previous: values['app.actions.previous'],
        detail: values['app.actions.detail'],
        myAccount: values['app.actions.myAccount'],
        rightHolders: values['app.actions.rightHolders'],
        handle: values['app.actions.handle'],
        datagrid: {
          loading: values['app.datagrid.loading'],
          error: values['app.datagrid.error'],
          placeholder: values['app.datagrid.placeholder'],
        },
        actions: {
          // TODO: Add extras actions templates
          download: values['app.actions.download'],
        },
        prompt: {
          logout: values['app.prompt.logout'],
          delete: values['app.prompt.delete'],
        },
        request: {
          error: values['app.strings.request-error'],
          success: values['app.strings.request-ok'],
        },
        membership: {
          employer: {
            insured: {
              title: values['app.pages.membership.employer.insured.title'],
              description:
                values['app.pages.membership.employer.insured.description'],
            },
            insuredMembership: {
              title:
                values['app.pages.membership.employer.insuredMembership.title'],
              description:
                values[
                  'app.pages.membership.employer.insuredMembership.description'
                ],
            },
            insuredMembershipRequest: {
              title:
                values[
                  'app.pages.membership.employer.insuredMembershipRequest.title'
                ],
              description:
                values[
                  'app.pages.membership.employer.insuredMembershipRequest.description'
                ],
            },
            insuredMembershipRequestEdit: {
              title:
                values[
                  'app.pages.membership.employer.insuredMembershipRequestEdit.title'
                ],
              description:
                values[
                  'app.pages.membership.employer.insuredMembershipRequestEdit.description'
                ],
            },
          },
        },
        account: {
          authState: {
            welcomeTitle: values['app.components.authState.welcomeTitle'],
            loginActivityHint:
              values['app.components.authState.loginActivityHint'],
            role: {
              employer: values['app.components.authState.role.employer'],
              insured: values['app.components.authState.role.insured'],
            },
          },
        },
      }))
    );
}

/**
 * Provides common strings for login component
 */
export function provideLoginStrings(injector: Injector) {
  return injector
    .get(TranslateService)
    .get([
      'login.username.label',
      'login.username.placeholder',
      'login.password.label',
      'login.password.placeholder',
      'login.remember.placeholder',
      'login.loginBtnText',
      'login.authenticationFailed',
      'login.authenticating',
      'login.loginMaintext',
      'login.loginSubText',
      'login.successful',
      'login.registerBtnText',
      'login.authorizationError',
    ])
    .pipe(
      map((values) => {
        return {
          username: {
            label: values['login.username.label'],
            placeholder: values['login.username.placeholder'],
          },
          password: {
            label: values['login.password.label'],
            placeholder: values['login.password.placeholder'],
          },
          remember: {
            label: values['login.remember.placeholder'],
          },
          loginBtnText: values['login.loginBtnText'],
          authenticationFailed: values['login.authenticationFailed'],
          authorizationError: values['login.authorizationError'], // ''
          authenticating: values['login.authenticating'],
          loginMaintext: values['login.loginMaintext'],
          loginSubText: values['login.loginSubText'],
          successful: values['login.successful'],
          registerBtnText: values['login.registerBtnText'],
        };
      })
    );
}

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Login from '../../../../src/components/user/Login'

describe('Login', () => {
  let subject;

  beforeEach(() => {
    subject = TestUtils.renderIntoDocument(<Login/>);
  });

  it('has elements for login form', () => {
    expect(subject.refs.submitBtn.innerText).toEqual('Login');
    expect(subject.refs.emailTxt.placeholder).toEqual('email');
    expect(subject.refs.passwordTxt.placeholder).toEqual('password');
    expect(subject.refs.passwordTxt.type).toEqual('password');
  });
});


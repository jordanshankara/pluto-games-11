import { render } from '@testing-library/react';
import Profile from '../pages/login';
import '@testing-library/jest-dom';

describe('Profile', () => {
  it('Profile page title should be displayed', () => {
    const { container } = render(<Profile />);
    const profTitle = container.querySelector('#profileTitle')?.textContent;
    expect(profTitle).toEqual('My Profile Page');
  });
});

import { render } from '@testing-library/react';
import Login from '../pages/login';
import '@testing-library/jest-dom';

describe('Login', () => {
  it('Username form should be required ', () => {
    const { container } = render(<Login />);
    const userForm = container.getByPlaceholderText('Username');
    console.log(userForm);
    expect(userForm).toBeRequired();
  });
});

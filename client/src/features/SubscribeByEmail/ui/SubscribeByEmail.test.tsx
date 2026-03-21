import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { subscribeSchema } from '../config/subscribeSchema';

describe('SubscribeByEmail form', () => {
  it('calls handleSubmit with correct email', async () => {
    const handleSubmit = vi.fn();

    render(
      <Formik
        initialValues={{ userMail: '' }}
        onSubmit={handleSubmit}
        validationSchema={subscribeSchema}
      >
        <Form>
          <Field
            name="userMail"
            placeholder="Enter email"
            data-testid="email-input"
          />
          <ErrorMessage name="userMail" component="div" />
          <button type="submit" data-testid="subscribe-button">
            Subscribe
          </button>
        </Form>
      </Formik>,
    );

    const button = screen.getByTestId('subscribe-button');
    const input = screen.getByTestId('email-input');

    await userEvent.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');

    await userEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledTimes(1);

    expect(handleSubmit).toHaveBeenCalledWith(
      { userMail: 'test@example.com' },
      expect.any(Object),
    );
  });

  it('shows error message for invalid email', async () => {
    const handleSubmit = vi.fn();

    render(
      <Formik
        initialValues={{ userMail: '' }}
        onSubmit={handleSubmit}
        validationSchema={subscribeSchema}
      >
        <Form>
          <Field
            name="userMail"
            placeholder="Enter email"
            data-testid="email-input"
          />
          <ErrorMessage name="userMail" component="div" />
          <button type="submit" data-testid="subscribe-button">
            Subscribe
          </button>
        </Form>
      </Formik>,
    );

    const input = screen.getByTestId('email-input');
    const button = screen.getByTestId('subscribe-button');

    await userEvent.type(input, 'not-an-email');
    await userEvent.click(button);

    expect(handleSubmit).not.toHaveBeenCalled();

    expect(await screen.getByText('invalidEmail')).toBeInTheDocument();
  });
});

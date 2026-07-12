function Form({ children, ...props }: React.ComponentPropsWithRef<'form'>) {
  return (
    <form noValidate {...props}>
      {children}
    </form>
  );
}

Form.Label = function Label({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'label'>) {
  return <label {...props}>{children}</label>;
};

Form.Input = function Input(props: React.ComponentPropsWithoutRef<'input'>) {
  return <input {...props} autoComplete="off" />;
};

export default function Page() {
  return (
    <Form>
      <Form.Label htmlFor="email">이메일</Form.Label>
      <Form.Input id="email" type="email" />
    </Form>
  );
}

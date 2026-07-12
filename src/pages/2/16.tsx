function withPrimaryStyle<P extends { className?: string }>(
  Component: React.ComponentType<P>,
) {
  return function StyledComponent(props: P) {
    const className = [
      'bg-blue-500 text-white rounded-lg px-4 py-2',
      props.className,
    ]
      .filter(Boolean)
      .join(' ');

    return <Component {...props} className={className} />;
  };
}

function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <button className={className}>{children}</button>;
}

const PrimaryButton = withPrimaryStyle(Button);

export default function Page() {
  return (
    <div className="space-x-2">
      <PrimaryButton>확인</PrimaryButton>
      <PrimaryButton>취소</PrimaryButton>
    </div>
  );
}

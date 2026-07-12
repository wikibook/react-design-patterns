import { Slottable } from './18';
import { Slot } from './19';

type TitleProps = {
  asChild?: boolean;
  children: React.ReactNode;
};

function CardTitle({ asChild = false, children }: TitleProps) {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp className="mb-3 flex items-center gap-2 text-xl font-bold text-slate-900">
      <span
        aria-hidden
        className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
      >
        title
      </span>

      <Slottable>{children}</Slottable>

      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
        slot
      </span>
    </Comp>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">{children}</div>
  );
}

export default function Page() {
  return (
    <Card>
      <CardTitle asChild>
        <a
          href="#member-detail"
          className="underline decoration-dotted underline-offset-4"
        >
          회원 정보로 이동
        </a>
      </CardTitle>
      <p className="text-sm leading-6 text-slate-600">
        asChild를 켜면 h2 대신 자식 a 태그가 기준 요소가 되고, Slot의 className
        및 부가 요소가 함께 합성됩니다.
      </p>
    </Card>
  );
}

// 필수 폴리필
(Symbol as { metadata: symbol }).metadata ??= Symbol('Symbol.metadata');

export const MSW_HANDLERS_KEY = Symbol('msw:handlers');


export function MSWHandler<This, Args extends Array<any>, Return>(
  _value: (...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (...args: Args) => Return>,
) {
  const metadata = context.metadata;
  if (!metadata) return;

  const prev = metadata[MSW_HANDLERS_KEY];
  const list = Array.isArray(prev) ? prev : [];
  metadata[MSW_HANDLERS_KEY] = [...list, context.name];
}

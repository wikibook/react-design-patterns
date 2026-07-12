import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import {
  exampleManifest,
  type ExampleMeta,
  type ExampleStatus,
} from './example-manifest';

type StatusFilter = 'all' | ExampleStatus;

const statusOptions: Array<{ value: StatusFilter; label: string }> = [
  { value: 'all', label: '전체 상태' },
  { value: 'runnable', label: '실행 가능' },
  { value: 'source-only', label: '소스만 있음' },
  { value: 'missing', label: '프로젝트 파일 없음' },
];

function ExampleCard({ example }: { example: ExampleMeta }) {
  return (
    <article className="example-card">
      <div className="example-card__heading">
        <span className="example-card__number">예제 {example.id}</span>
        <div className="example-card__badges">
          <span className={`badge badge--${example.status}`}>
            {example.statusLabel}
          </span>
          <span className="badge badge--kind">{example.kindLabel}</span>
        </div>
      </div>
      <h3>{example.title}</h3>
      <p>{example.reason}</p>

      {example.comparison === 'adapted' && (
        <div className="example-card__changes">
          <strong>원문 대비 변경</strong>
          <ul>
            {example.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
          <small>
            주 파일 기준 +{example.addedLines}/-{example.removedLines}줄
          </small>
        </div>
      )}

      {example.comparison === 'same' && (
        <p className="example-card__same">
          예제 헤더를 제외하면 원문과 같습니다.
        </p>
      )}

      <div className="example-card__footer">
        {example.route ? (
          <Link className="example-card__link" to={example.route}>
            예제 실행
          </Link>
        ) : (
          <span>{example.sourcePath ?? example.bookPath}</span>
        )}
      </div>
    </article>
  );
}

export function ExampleCatalog() {
  const [query, setQuery] = useState('');
  const [chapter, setChapter] = useState('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const normalizedQuery = query.trim().toLocaleLowerCase('ko');
  const filteredExamples = useMemo(
    () =>
      exampleManifest.filter((example) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          example.id.includes(normalizedQuery) ||
          example.title.toLocaleLowerCase('ko').includes(normalizedQuery);
        const matchesChapter =
          chapter === 'all' || example.chapter === Number(chapter);
        const matchesStatus = status === 'all' || example.status === status;

        return matchesQuery && matchesChapter && matchesStatus;
      }),
    [chapter, normalizedQuery, status],
  );
  const summary = {
    total: exampleManifest.length,
    runnable: exampleManifest.filter((example) => example.status === 'runnable')
      .length,
    sourceOnly: exampleManifest.filter(
      (example) => example.status === 'source-only',
    ).length,
    missing: exampleManifest.filter((example) => example.status === 'missing')
      .length,
  };

  return (
    <section>
      <div className="section-heading">
        <span>Book Traceability</span>
        <h1>책 예제 대응 카탈로그</h1>
        <p>
          책의 전체 예제를 기준으로 프로젝트 구현 상태, 실행 경로, 원문 대비
          변경점을 함께 보여줍니다.
        </p>
      </div>

      <dl className="catalog-summary">
        <div>
          <dt>책 전체</dt>
          <dd>{summary.total}</dd>
        </div>
        <div>
          <dt>실행 가능</dt>
          <dd>{summary.runnable}</dd>
        </div>
        <div>
          <dt>소스만 있음</dt>
          <dd>{summary.sourceOnly}</dd>
        </div>
        <div>
          <dt>파일 없음</dt>
          <dd>{summary.missing}</dd>
        </div>
      </dl>

      <div className="catalog-filters">
        <label>
          <span>예제 검색</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 6.48 또는 Optimistic"
            type="search"
            value={query}
          />
        </label>
        <label>
          <span>장</span>
          <select
            onChange={(event) => setChapter(event.target.value)}
            value={chapter}
          >
            <option value="all">전체 장</option>
            {Array.from({ length: 7 }, (_, index) => index + 1).map(
              (chapterNumber) => (
                <option key={chapterNumber} value={chapterNumber}>
                  {chapterNumber}장
                </option>
              ),
            )}
          </select>
        </label>
        <label>
          <span>프로젝트 상태</span>
          <select
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
            value={status}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="catalog-result">{filteredExamples.length}개 예제</p>
      <div className="example-grid">
        {filteredExamples.map((example) => (
          <ExampleCard example={example} key={example.id} />
        ))}
      </div>
    </section>
  );
}

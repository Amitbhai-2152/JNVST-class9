import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { chapters, allLessons, getSubject, topics } from '../data';
import { getChapterStudyPages } from '../data/lessons/chapterStudy';
import { MathAwareText, MathText } from '../components/MathText';
import type { ContentBlock, ID } from '../types';

const InlineText = ({ text }: { text: string }) => <MathAwareText text={text} />;

const Content = ({ blocks }: { blocks: ContentBlock[] }) => <div className="lesson-content">{blocks.map((b, i) => {
  switch (b.type) {
    case 'heading': { const Tag = b.level === 2 ? 'h2' : b.level === 3 ? 'h3' : 'h4'; return <Tag key={i}><InlineText text={b.text} /></Tag>; }
    case 'paragraph': return <p key={i}><InlineText text={b.text} /></p>;
    case 'list': return b.style === 'number' ? <ol key={i}>{b.items.map((x, j) => <li key={j}><InlineText text={x} /></li>)}</ol> : <ul key={i}>{b.items.map((x, j) => <li key={j}><InlineText text={x} /></li>)}</ul>;
    case 'formula': return <div className="formula-block" key={i}><MathText value={b.expression} display /></div>;
    case 'table': return <div className="table-wrap" key={i}><table><thead><tr>{b.headers.map((x, j) => <th key={j}><InlineText text={x} /></th>)}</tr></thead><tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((x, k) => <td key={k}><InlineText text={x} /></td>)}</tr>)}</tbody></table></div>;
    case 'image': return <figure className="lesson-figure" key={i}><img src={b.src} alt={b.alt} onError={(e) => { e.currentTarget.style.display = 'none'; }} />{b.caption && <figcaption>{b.caption}</figcaption>}</figure>;
    case 'step-by-step': return <div className="steps" key={i}>{b.steps.map((x, j) => <div className="step" key={j}><span>{j + 1}</span><p><InlineText text={x} /></p></div>)}</div>;
    case 'callout': return <aside className={`callout ${b.style}`} key={i}><strong>{b.title || 'जानकारी'}</strong><p><InlineText text={b.text} /></p></aside>;
    default: return null;
  }
})}</div>;

export default function ChapterStudyPage() {
  const { chapterId } = useParams();
  const chapter = chapters.find((x) => x.id === chapterId);
  const subject = chapter ? getSubject(chapter.subjectId) : undefined;
  const pages = useMemo(() => chapter ? getChapterStudyPages(chapter, allLessons, 12) : [], [chapter]);
  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [chapterId]);

  if (!chapter || !subject) return <main className="app-shell"><header className="topbar"><Link to="/" className="brand">JNVST कक्षा 9</Link></header><main className="shell"><section className="card empty"><h1>अध्याय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></section></main></main>;

  const topicLinks = chapter.topicIds.map((id: ID) => topics.find((t) => t.id === id)).filter(Boolean);
  const current = pages[page] || [];

  return <div className="app-shell">
    <header className="topbar"><Link to="/" className="brand">JNVST कक्षा 9</Link><nav><Link to="/">डैशबोर्ड</Link><Link to="/subjects">विषय</Link><Link to="/bookmarks">बुकमार्क</Link><Link to="/mock-tests">मॉक टेस्ट</Link></nav></header>
    <main className="shell">
      <div className="page-head">
        <Link to={`/chapters/${chapter.id}`}>← अध्याय</Link>
        <h1>{chapter.title} — अध्ययन पाठ</h1>
        <p>{subject.title} · {pages.length} अध्ययन पृष्ठ · मौजूदा पाठ-सामग्री से व्यवस्थित</p>
      </div>
      <section className="card lesson-card">
        <div className="study-reader">
          <div className="study-reader-head">
            <div><b>अध्याय अध्ययन</b><span>पृष्ठ {page + 1} / {pages.length}</span></div>
            <div className="study-progress"><span style={{ width: `${((page + 1) / Math.max(1, pages.length)) * 100}%` }} /></div>
          </div>
          <div className="study-page-nav">{pages.map((_, i) => <button key={i} className={i === page ? 'active' : ''} onClick={() => setPage(i)}>{i + 1}</button>)}</div>
        </div>
        <div className="chapter-study-topics"><strong>इस अध्याय के टॉपिक्स:</strong> {topicLinks.map((topic, i) => topic ? <span key={topic.id}>{i ? ' · ' : ''}{topic.title}</span> : null)}</div>
        <Content blocks={current} />
        <div className="study-reader-actions">
          <button className="btn" disabled={page === 0} onClick={() => setPage((x) => x - 1)}>← पिछला पृष्ठ</button>
          {page < pages.length - 1 ? <button className="btn primary" onClick={() => setPage((x) => x + 1)}>अगला पृष्ठ →</button> : <Link className="btn primary" to={`/chapters/${chapter.id}`}>अध्याय के अभ्यास पर जाएँ</Link>}
        </div>
      </section>
    </main>
  </div>;
}

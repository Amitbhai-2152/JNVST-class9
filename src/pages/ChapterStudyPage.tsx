import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { chapters, allLessons, getSubject, topics } from '../data';
import { scienceLessonLens } from '../data/scienceLessonCore';
import { scienceMasteryUnits } from '../data/sciencePrep';
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
  const isScience = chapter?.subjectId === 'sub_sci';

  const scienceTopic = isScience ? topics.find((t) => t.id === chapter?.topicIds[0]) : undefined;
  const scienceLesson = isScience ? allLessons.find((lesson) => lesson.topicId === scienceTopic?.id) : undefined;
  const scienceBlocks = scienceLesson?.content ?? [];
  const sciencePages = useMemo(() => {
    if (!isScience) return [];
    const pages: ContentBlock[][] = [];
    let current: ContentBlock[] = [];
    for (const block of scienceBlocks) {
      const isStageHeading = block.type === 'heading' && block.level === 2;
      if (isStageHeading && current.length) {
        pages.push(current);
        current = [];
      }
      current.push(block);
    }
    if (current.length) pages.push(current);
    return pages.length ? pages : [scienceBlocks];
  }, [isScience, scienceBlocks]);

  const pages = useMemo(
    () => chapter && !isScience ? getChapterStudyPages(chapter, allLessons, 12) : [],
    [chapter, isScience],
  );

  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [chapterId]);

  if (!chapter || !subject) return <main className="app-shell"><header className="topbar"><Link to="/" className="brand">JNVST कक्षा 9</Link></header><main className="shell"><section className="card empty"><h1>अध्याय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></section></main></main>;

  const topicLinks = chapter.topicIds.map((id: ID) => topics.find((t) => t.id === id)).filter(Boolean);
  const current = (isScience ? sciencePages[page] : pages[page]) || [];
  const totalPages = isScience ? sciencePages.length : pages.length;
  const scienceMastery = isScience ? scienceMasteryUnits.find((unit) => unit.topicId === scienceTopic?.id) : undefined;
  const scienceLens = isScience ? (scienceTopic?.id ? scienceLessonLens[scienceTopic.id] : undefined) : undefined;
  const stageLabels = ['समझें', 'जोड़ें', 'समझाएँ', 'देखें', 'परखें', 'दोहराएँ'];

  const scienceStageTitle = (blocks: ContentBlock[], index: number) => {
    const heading = blocks.find((block) => block.type === 'heading' && block.level === 2);
    if (heading?.type === 'heading') return heading.text.replace(/^(?:अध्ययन भाग\\s+\\d+\\s*[—-]\\s*|\\d+\\.\\s*)/, '').trim();
    return stageLabels[index] ?? `अध्याय चरण ${index + 1}`;
  };

  return <div className="app-shell">
    <header className="topbar"><Link to="/" className="brand">JNVST कक्षा 9</Link><nav><Link to="/">डैशबोर्ड</Link><Link to="/subjects">विषय</Link><Link to="/bookmarks">बुकमार्क</Link><Link to="/mock-tests">मॉक टेस्ट</Link></nav></header>
    <main className="shell">
      <div className="page-head">
        <Link to={isScience ? `/chapters/${chapter.id}` : `/chapters/${chapter.id}`}>← अध्याय</Link>
        <span className="eyebrow">{isScience ? 'SCIENCE • CHAPTER STUDY' : subject.title}</span>
        <h1>{chapter.title} — अध्याय अध्ययन</h1>
        <p>{isScience
          ? 'एक ही guided reading path: अवधारणा समझें → उदाहरण देखें → JNVST फोकस करें → तुरंत recall करें।'
          : `${subject.title} · ${totalPages} अध्ययन पृष्ठ · मौजूदा पाठ-सामग्री से व्यवस्थित`}</p>
      </div>

      {isScience && scienceMastery && <section className="science-chapter-study-companion">
        <div className="science-study-intro">
          <div>
            <span className="science-panel-label">एक ही मुख्य पढ़ाई का रास्ता</span>
            <h2>पहले समझें, फिर प्रश्न लगाएँ</h2>
            <p>{scienceLens?.bigQuestion ?? `${chapter.title} के मुख्य concepts को क्रम से समझें और फिर अभ्यास करें।`}</p>
          </div>
          <div className="science-study-stat"><b>{totalPages}</b><span>learning stages</span></div>
        </div>
        <div className="science-study-companion-grid">
          <div><span className="science-panel-label">CORE SKILLS</span><div className="science-skill-chips">{scienceMastery.coreSkills.map((item) => <span key={item}>{item}</span>)}</div></div>
          <div><span className="science-panel-label">MUST KNOW</span><ul>{scienceMastery.mustKnow.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><span className="science-panel-label">EXAM TRAPS</span><ul>{scienceMastery.examTraps.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </div>
      </section>}

      <section className="card lesson-card">
        {isScience && <nav className="science-chapter-study-map" aria-label="अध्याय अध्ययन चरण">
          <div className="science-study-map-head">
            <span className="science-panel-label">CHAPTER STUDY MAP</span>
            <b>{chapter.title}</b>
            <small>किसी भी चरण पर सीधे जा सकते हैं</small>
          </div>
          <div className="science-study-map-list">
            {sciencePages.map((blocks, i) => <button key={i} className={i === page ? 'active' : ''} onClick={() => setPage(i)} aria-current={i === page ? 'step' : undefined}>
              <span>{String(i + 1).padStart(2, '0')} · {stageLabels[i] ?? 'चरण'}</span>
              <b>{scienceStageTitle(blocks, i)}</b>
            </button>)}
          </div>
        </nav>}

        {!isScience && <div className="study-reader">
          <div className="study-reader-head">
            <div><b>अध्याय अध्ययन</b><span>पृष्ठ {page + 1} / {pages.length}</span></div>
            <div className="study-progress"><span style={{ width: `${((page + 1) / Math.max(1, pages.length)) * 100}%` }} /></div>
          </div>
          <div className="study-page-nav">{pages.map((_, i) => <button key={i} className={i === page ? 'active' : ''} onClick={() => setPage(i)}>{i + 1}</button>)}</div>
        </div>}

        {isScience && <div className="science-chapter-study-reader">
          <div className="study-reader-head">
            <div><b>{stageLabels[page] ?? 'अध्याय अध्ययन'}</b><span>चरण {page + 1} / {totalPages}</span></div>
            <div className="study-progress"><span style={{ width: `${((page + 1) / Math.max(1, totalPages)) * 100}%` }} /></div>
          </div>
        </div>}

        <div className="chapter-study-topics"><strong>इस अध्याय के टॉपिक्स:</strong> {topicLinks.map((topic, i) => topic ? <span key={topic.id}>{i ? ' · ' : ''}{topic.title}</span> : null)}</div>
        <Content blocks={current} />

        {isScience && scienceLens && <div className="science-checkpoint">
          <span className="science-panel-label">SELF CHECK</span>
          <b>अभी बिना notes देखे सोचें</b>
          <ul>{scienceLens.checkpoints.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>}

        <div className="study-reader-actions">
          <button className="btn" disabled={page === 0} onClick={() => setPage((x) => x - 1)}>← पिछला</button>
          {page < totalPages - 1
            ? <button className="btn primary" onClick={() => setPage((x) => x + 1)}>अगला {isScience ? 'चरण' : 'पृष्ठ'} →</button>
            : <div className="actions">
                <Link className="btn" to={isScience ? `/practice/${scienceTopic?.id ?? ''}` : `/chapters/${chapter.id}`}>🎯 अभ्यास करें</Link>
                {isScience && <Link className="btn primary" to="/science-smart-practice">स्मार्ट विज्ञान अभ्यास →</Link>}
              </div>}
        </div>
      </section>
    </main>
  </div>;
}
